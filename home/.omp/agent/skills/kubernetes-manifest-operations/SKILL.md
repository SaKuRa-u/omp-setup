---
name: kubernetes-manifest-operations
description: Generate, review, and investigate Kubernetes YAML, Deployments, Services, probes, resource limits, RBAC, storage, NetworkPolicy, and versioned custom resources. Use for manifest-level operations and read-only Kubernetes diagnosis; not Docker image construction, Terraform/Packer, or automatic cluster deployment.
compatibility: Documentation-only OMP skill for Windows PowerShell. kubectl, kubeconform, YAML tooling, local schemas, and an authorized cluster context are separate optional prerequisites. Linux Pod security examples are not Windows Pod settings.
---

# Kubernetes manifest operations

Modified OMP adaptation (2026-10-18) of akin-ozer/cc-devops-skills, Apache-2.0. See [NOTICE](NOTICE) and [LICENSE](LICENSE). No validators, setup scripts, hooks, or executable templates are installed.

## Read-only first and approval boundary

- Inspect requested local manifests/rendered output, supplied events/logs, repository policies, target Kubernetes version, and CRD definitions using OMP `find`, `read`, and `grep`. File review does not require a cluster.
- Ordinary local code edits and public documentation reads already requested by the user need no fresh confirmation. Exact-target approval below concerns operational cluster/network side effects, not routine repository work or public documentation research.
- Do not access a cluster implicitly. Before network reads obtain approval for the exact context/cluster, namespace, resources, time window, and data scope. Even GET/log commands can expose secrets or invoke credential plugins.
- Before apply/patch/delete, rollout/restart/scale, exec/debug/port-forward, job creation, namespace/RBAC changes, controller installation, storage or external-service provisioning, obtain separate explicit approval naming exact objects, manifest paths, namespace, context, intended diff, allowed network/cost, and rollback expectations. A generate/review request does not grant deployment approval.
- Never switch the global current context, install dependencies, run vendor validators/bootstrap, apply remote URLs, or use paid/cloud operations automatically. Pass `--context` and `--namespace` explicitly on approved cluster commands. Never put credentials in tool arguments or logs; do not print raw kubeconfig, Secret resources, or decoded secret content.
- Server dry-run and `kubectl diff` contact the API and may invoke admission webhooks; they need approved network access and are not proof of zero external side effects. Client dry-run can still use discovery/credentials: do not treat it as guaranteed offline.
- Native OMP tools own editing/dispatch. Use native systematic-debugging for unexpected behavior and `context7-docs` for version-specific documentation; do not invoke vendor Skill/Task/MCP tool names.

## Capture the manifest contract

Read [manifest-patterns.md](references/manifest-patterns.md) before drafting or reviewing. Derive inputs from local evidence:

1. Full resource versus snippet, API version/kind, target Kubernetes version; exact namespace and deployment environment.
2. Approved image reference/platform, entrypoint, ports, replicas, actual health endpoints and startup behavior.
3. Resource budget, writable paths, configuration/secret references, service account/API access, ingress exposure, dependencies and storage lifecycle.
4. For custom resources: controller version and the exact CRD schema/docs. Do not guess unsupported fields from another release or treat missing schemas as a validation pass.

No automatic `default` namespace, `hosts: all`-style broad target, public LoadBalancer/Ingress, namespace creation, or hardcoded production replica count. If a required safety-sensitive value is unavailable, finish reachable local work and identify the exact missing input; a conceptual example is not a deployable artifact.

## Generate or review

- Use supported APIs; align Deployment selectors, Pod labels, Service selectors and named target ports. Preserve immutable selectors on existing workloads and flag migrations requiring recreation.
- Set requests and appropriate limits from workload evidence; distinguish CPU throttling, OOMKill, quotas and HPA behavior. Do not fabricate safe resource numbers.
- Use real readiness, liveness and startup checks appropriate to the process. Readiness controls traffic; liveness restarts it; startup probes protect initialization. Do not make liveness depend on a downstream outage.
- For Linux workloads, prefer non-root, RuntimeDefault seccomp, no privilege escalation, dropped capabilities, and a read-only root filesystem only with needed writable volumes. Verify image UID/file permissions; do not paste Linux-only security fields into Windows Pods.
- Keep configuration separate from secret references. Kubernetes base64 is encoding, not encryption. Never include real secret material in generated YAML or evidence.
- Grant least-privilege namespaced RBAC only when needed. Do not create broad ClusterRoles, mount API tokens unnecessarily, grant wildcard secret access, or modify built-in roles.
- NetworkPolicy requires a supporting CNI. Model DNS and required ingress/egress before deny policies; do not blindly apply default-deny and interrupt traffic.
- Distinguish Deployment versus StatefulSet/Job semantics; document PVC/StorageClass ownership, backups and deletion behavior. Do not provision storage or external endpoints without approval.

## Conditional validation and diagnosis

Commands below are guidance, not installation-time actions. Check only local availability first:

```powershell
Get-Command kubectl, kubeconform, yamllint -ErrorAction SilentlyContinue
```

Use already-installed YAML/schema tools only when local validation is requested and tool configuration is understood. Kubeconform's default schemas may download over the network; offline checking requires an existing trusted local schema set. For example, if that set has been provided:

```powershell
kubeconform -strict -summary -kubernetes-version '1.XX.Y' -schema-location 'C:/approved-schemas/{{.ResourceKind}}{{.KindSuffix}}.json' '.\manifests\app.yaml'
```

Replace `1.XX.Y` with the real target version and confirm the local layout/tool templating. Missing CRD or built-in schemas mean **incomplete**, not passed; do not use `-ignore-missing-schemas` to claim full coverage. YAML lint is not API validation.

Only after exact cluster-read approval, examples for a specified object:

```powershell
kubectl --context 'approved-context' --namespace 'approved-namespace' get deployment 'approved-app' -o wide
kubectl --context 'approved-context' --namespace 'approved-namespace' describe deployment 'approved-app'
```

Review and redact output; use narrowly scoped events/Pod logs only if approved. Do not automatically escalate to exec/debug or restarts. For requested server validation, after approval:

```powershell
kubectl --context 'approved-context' --namespace 'approved-namespace' apply --dry-run=server --filename '.\manifests\app.yaml'
```

This is not deployment approval. A later real apply needs explicit mutation approval and review of all namespaces/cluster-scoped objects in the file; CLI namespace flags do not contain every object's scope.

## Delivery and Windows limits

Use Windows paths and PowerShell on the host; manifests usually describe Linux workloads running elsewhere. Do not install kubectl, WSL, a local cluster, Helm, schema tools, plugins, or credentials. Rendering Helm/Kustomize is a separate reviewed prerequisite when relevant: plugins/post-renderers/remote bases may execute code or access the network.

Return complete requested manifests or evidence-ranked findings; resource/namespace/scope list; version and CRD sources; security/storage/network implications; and checks with executed/skipped status and observed evidence. Mark cluster connectivity, admission, runtime health, CNI behavior and CRDs untested when not exercised. Never call text review a successful deployment. Docker image work belongs to `docker-container-builds`; existing Terraform/Packer skills retain provisioning ownership.
