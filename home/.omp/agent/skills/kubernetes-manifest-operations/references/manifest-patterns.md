# Kubernetes manifest patterns and diagnostic reference

Modified documentation adaptation, 2026-10-18, from akin-ozer/cc-devops-skills (`k8s-yaml-generator/SKILL.md` and selected security reference sections), Apache-2.0. See [NOTICE](../NOTICE) and [LICENSE](../LICENSE). Examples are unexecuted guidance, not deployment instructions.

## Relationship checklist

For a Deployment plus Service, verify:

1. `metadata.name`, namespace and labels follow project policy; `apps/v1` Deployment selector matches template labels and preserves the existing immutable selector.
2. The Service selector picks only intended Pods; `targetPort` resolves to the actual listening container port; the process binds to an address reachable from outside its container, not loopback only.
3. ConfigMap/Secret names and keys exist in the same namespace; refer to names without printing contents. Projected updates do not automatically reload every application or restart Pods.
4. Readiness reflects ability to serve traffic; startup accounts for warmup; liveness detects stuck processes without depending on an unavailable database.
5. Resource requests permit scheduling; memory limits reflect measured peaks; CPU limits can throttle. HPA resource utilization requires relevant requests and an available metrics API.
6. The image is compatible with the assigned nodes and UID/security context, has the exact command and writable paths expected, and uses an approved version/digest.

## Illustrative Deployment plus Service

This deliberately uses an example registry hostname and assumes an API listening on 8080 with `/ready` and `/health` endpoints, a non-root-compatible image, and `/tmp` as its only writable path. Resource values are illustrative, not a production sizing recommendation. Replace the image, namespace, UID and sizing with actual approved inputs; do not apply this example or call it validated.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
  namespace: app-review
spec:
  replicas: 2
  selector:
    matchLabels:
      app.kubernetes.io/name: api
  template:
    metadata:
      labels:
        app.kubernetes.io/name: api
    spec:
      automountServiceAccountToken: false
      securityContext:
        runAsNonRoot: true
        runAsUser: 10001
        seccompProfile:
          type: RuntimeDefault
      containers:
        - name: api
          image: registry.example.com/team/api:1.4.2
          ports:
            - name: http
              containerPort: 8080
          resources:
            requests:
              cpu: 100m
              memory: 128Mi
            limits:
              memory: 256Mi
          securityContext:
            allowPrivilegeEscalation: false
            readOnlyRootFilesystem: true
            capabilities:
              drop: [ALL]
          startupProbe:
            httpGet:
              path: /health
              port: http
            failureThreshold: 30
            periodSeconds: 5
          readinessProbe:
            httpGet:
              path: /ready
              port: http
            periodSeconds: 5
          livenessProbe:
            httpGet:
              path: /health
              port: http
            periodSeconds: 10
          volumeMounts:
            - name: tmp
              mountPath: /tmp
      volumes:
        - name: tmp
          emptyDir: {}
---
apiVersion: v1
kind: Service
metadata:
  name: api
  namespace: app-review
spec:
  type: ClusterIP
  selector:
    app.kubernetes.io/name: api
  ports:
    - name: http
      port: 80
      targetPort: http
```

The namespace and registry credential mechanisms are prerequisites, not silently created resources. A manifest-level check cannot establish whether this image exists or those probes work. `emptyDir` consumes node resources and is ephemeral; size/accounting and application write requirements need actual review.

## Linux security semantics, not blanket promises

`runAsNonRoot` constrains runtime execution; it is not a universal admission guarantee. A numeric nonzero image/user configuration may be necessary for the kubelet to verify it. Admission policy and runtime enforcement are distinct. `readOnlyRootFilesystem` needs explicit writable mounts and compatible image behavior. `fsGroup` can help certain volumes but is not mandatory for all writable mounts and depends on the volume/CSI driver. Avoid recursive ownership changes or special capabilities without a demonstrated need.

Do not apply these Linux settings mechanically to Windows workloads. Confirm node OS, version support, Windows security options and application identity requirements separately.

## RBAC and network policy

- Use a Role/RoleBinding for namespace-scoped privileges; a ClusterRole can be bound with a RoleBinding for reuse without granting all-namespace access. Cluster-scoped resources and ClusterRoleBindings require separate high-impact review.
- Grant exact API groups/resources/verbs needed. `resourceNames` does not constrain every verb/use case the same way; confirm semantics. Avoid wildcard permissions, secret listing, impersonation, escalation and binding permissions.
- Disable service-account token automount where API access is unnecessary. Private image-pull secrets are separate from API credentials; use existing authorized secret references, never a command-line password example.
- NetworkPolicy only works with supporting network enforcement. Multiple peers in a list are OR; namespaceSelector plus podSelector in the same peer is AND.
- A deny policy can cut DNS and external dependencies. Inventory permitted ingress, DNS path, service egress, monitoring and controller behavior before proposing policies. Review the complete policy set before any apply, not an automatic deny-first sequence.
- DNS traffic may use node-local resolvers or nonstandard infrastructure; do not claim a broad UDP/TCP 53 rule is strict DNS isolation. Match the actual deployment and CNI behavior.

## Storage, rollout and CRD review

A StatefulSet preserves identity but does not provide backups. Review headless Service, volumeClaimTemplates, access modes, topology/scheduling, reclaim policy and retention behavior. PVC deletion or namespace deletion may destroy data; no automatic recreation/deletion to fix a mismatch.

Deployment rolling updates need capacity for surge and availability during disruption. PDB governs voluntary evictions, not all failures and not the Deployment strategy itself. Do not add autoscaling, anti-affinity or PDB values that conflict with a single replica or exhausted cluster capacity.

For a CRD, establish group/version/kind and controller/schema version from trusted local CRD YAML or official versioned docs. Kubeconform built-in schemas do not validate arbitrary CRD instances automatically. Schema success does not prove controller semantics, admission behavior or reconciliation. Do not hide missing schemas using ignore flags or invent required fields. `kubectl explain` is a cluster/discovery operation requiring approved access, not an offline fallback.

## Diagnostic map

| Symptom from supplied evidence | First inspection | Distinguish before changing anything |
| --- | --- | --- |
| Pending | Pod scheduling events, requests, affinity, node selectors, PVC state | capacity/taints, affinity mismatch, unbound storage |
| ImagePullBackOff | exact image reference, redacted event reason, pull-secret references | absent tag, registry auth, architecture, networking |
| CrashLoopBackOff | supplied current/previous logs, exit reason, command, mounts | application error, OOMKilled, liveness kill, permissions |
| Service unreachable | selectors, Pod readiness, named ports and supplied EndpointSlice evidence | selector mismatch, application loopback bind, policy/CNI, wrong port |
| Probe failures | endpoint/path/port, startup duration, supplied status | slow startup, inappropriate downstream check, wrong bind address |
| Forbidden | exact caller/resource/verb/namespace and intended RBAC | authentication versus authorization, wrong context, insufficient Role |
| Rollout stalled | replica status/events, resource budget, update strategy | unavailable capacity, image/probe issues, immutable selector change |

No automatic restart, scale, exec, privileged debug Pod or policy relaxation. Ask for the smallest approved read, or use already supplied evidence, under SKILL.md's boundaries. Events/logs may contain tokens and personal data; redact outputs.

## Authoritative follow-up

- https://kubernetes.io/docs/concepts/workloads/controllers/deployment/
- https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/
- https://kubernetes.io/docs/concepts/security/pod-security-standards/
- https://kubernetes.io/docs/concepts/services-networking/network-policies/
- https://kubernetes.io/docs/reference/access-authn-authz/rbac/

Consult target-version documentation when external research is authorized. These links do not imply current documentation, server access or runtime validation was exercised during installation.
