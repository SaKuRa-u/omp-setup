# Container build patterns and diagnostic reference

Modified documentation adaptation, 2026-10-18, from akin-ozer/cc-devops-skills (`dockerfile-generator/SKILL.md`), Apache-2.0; see [NOTICE](../NOTICE) and [LICENSE](../LICENSE). Examples are explanatory and unexecuted, not approval to run a builder.

## Build-context and secret review

Determine the exact context root: `COPY` sources are relative to it, not necessarily to the Dockerfile. Inspect Dockerfile-specific ignore files if present. Check that ignore rules exclude `.git`, `.env` and real secret files, private keys, host dependency directories and unrelated output. Do not inspect secret values. Negation rules and ordering can re-include files; review their effective scope. Do not exclude a prebuilt artifact the runtime stage explicitly copies.

A starting `.dockerignore` for a source-built Node application (adapt to actual filenames):

```text
.git
node_modules
.env
.env.*
*.pem
*.key
npm-debug.log*
coverage
.next
```

This is not exhaustive secret detection. A `.npmrc` may contain credentials or legitimate non-secret registry settings: inspect its purpose without logging secrets; exclude the credential-bearing file and use an approved BuildKit secret if authentication is needed. Do not bake credentials into URLs, ARG or ENV. Deleting a copied secret in a later layer does not remove it from earlier layers.

## Coherent Node build example

Assumptions: repository root has `package.json` and `package-lock.json`; `npm run build` generates `dist/index.js`; the output needs production node_modules but no other runtime assets or native OS packages. Node 22 is illustrative, not a declaration of this project's supported runtime. Pick the real supported image/version and verified digest before producing final project files. This example has not been built.

```dockerfile
FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build && npm prune --omit=dev

FROM node:22-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build --chown=node:node /app/package.json ./package.json
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist
USER node
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

Why: full development dependencies remain available during compilation; only known runtime output crosses the stage boundary; both stages share libc/runtime compatibility. Adapt for monorepo workspaces, runtime assets, generated clients, or native libraries. `npm ci` and lifecycle hooks execute code and fetch dependencies during an authorized build. Do not run them on the host merely because this reference includes them. Do not add a health command for an endpoint that does not exist.

## Other runtime decisions

| Runtime | Evidence to inspect | Reliable pattern | Common trap |
| --- | --- | --- | --- |
| Python | lock/requirements format, interpreter ABI, native wheels, ASGI/WSGI command | Build a venv or wheels in a compatible stage, copy the complete environment and required shared libraries, run a real application server | Copying `/root/.local` can retain root-owned files or shebang paths; venv paths must stay consistent |
| Go | go.mod toolchain, CGO use, TLS/DNS/timezone needs, target platform | Compile in a builder; choose runtime with the libraries/certificates the binary requires | Forcing `CGO_ENABLED=0` changes functionality; scratch has no CA bundle/shell/user database by default |
| Java | Maven/Gradle wrapper and lock settings, exact output artifact, JVM support policy | Build with a compatible JDK and copy one unambiguous runnable artifact into matching JRE/runtime | Wildcard JAR copy can select multiple artifacts; wrapper needs Unix LF/executable permission in a Linux build |
| Framework bundlers | version-specific deployment docs, standalone/static/server output, assets | Copy the framework's documented runtime output and its required assets | Static export is not equivalent to server rendering; copying all source defeats a standalone output design |

Do not blanket-force Alpine, distroless, scratch, multi-stage builds, or a particular package manager. Evaluate compatibility and complexity. A simple interpreted application may benefit from one stage; a compiled application usually benefits from two.

## Cache and reproducibility

- Place manifests/lockfiles before frequently changing source. For workspaces, include all files needed to resolve the lock graph.
- A cache hit is not proof of fresh security updates. Rebuilding with an identical digest intentionally preserves the old base until an approved update.
- If using BuildKit cache mounts, check builder/version support first; avoid sharing credential-bearing cache contents across trust boundaries. Cache exporters can publish data.
- Keep package index update, install and package-list cleanup in one `RUN` where appropriate. Do not indiscriminately combine unrelated steps only to reduce layer count.
- Pin image digests from trusted metadata when reproducibility is required. Never invent a digest or claim a mutable version tag is immutable.
- Multi-platform images require target-compatible dependencies. `BUILDPLATFORM` is the builder architecture; `TARGETPLATFORM` is the output architecture. Do not copy an amd64 native binary into an arm64 runtime stage.
- Build provenance and SBOM generation are builder/exporter-specific; they do not prove vulnerability absence and may disclose metadata. Publishing attestations or cache is a separate approved registry action.

## Runtime and security review

Exec-form CMD/ENTRYPOINT avoids an extra shell but the application still must handle signals. Use the existing shutdown contract; do not add an init dependency by default. Non-root images need permission for application data, temp files and mounted volumes. Rootless Docker and container `USER` are distinct properties. File ownership from `COPY --chown` does not guarantee a future volume has the same permissions.

Distroless has no shell; shell-form health checks and scripts fail. An exec-form health check can work when its executable exists. A cluster's probes may be the intended health mechanism; Kubernetes does not use Dockerfile HEALTHCHECK as its Pod probe configuration.

Installing curl only for an invented health endpoint adds dependencies without proving health. Confirm the actual endpoint, protocol, authentication behavior, timeout and startup grace period. `EXPOSE` is metadata, not port publication or a firewall rule.

## Evidence-driven diagnostic branches

| Observation | First evidence, read-only | Candidate cause to establish | Avoid |
| --- | --- | --- | --- |
| COPY file missing | context root, ignore rules, exact path/case, prior stage output | wrong build context, ignored output, incorrect stage path | expanding to a parent context that contains secrets |
| Build tool missing | package scripts and builder install command | production-only dependencies installed before compile | adding global tool installs without matching the lockfile |
| Shared library / exec-format error | target platform, image libc, binary metadata already supplied | ABI/architecture mismatch or CGO dependency | random runtime packages or platform emulation changes |
| Permission denied | USER, ownership, mount path, supplied runtime error | root-owned output, read-only mount or UID mismatch | `chmod -R 777`, running as root |
| Container exits immediately | exec command, output artifact, supplied exit/log evidence | wrong entrypoint, missing runtime asset/config | restart policies that hide the failure |
| Slow rebuilds | instruction ordering, context size evidence, supplied build logs | dependency cache invalidation or large context | claiming speedups without before/after timings |

For live daemon inspection, logs, run/exec, builds or registry queries, first apply the exact-target approval boundary in SKILL.md. Return evidence plus a targeted next check, not an automatic mutation.

## Authoritative follow-up

Use official version-matched documentation when approved external research is needed:

- https://docs.docker.com/reference/dockerfile/
- https://docs.docker.com/build/building/best-practices/
- https://docs.docker.com/build/building/multi-stage/
- https://docs.docker.com/build/building/secrets/

These links identify further sources, not evidence that their current contents or any runtime have been checked by this installation.
