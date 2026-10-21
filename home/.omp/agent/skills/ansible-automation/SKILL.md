---
name: ansible-automation
description: Generate, review, and investigate Ansible playbooks, roles, tasks, handlers, static inventory, variables, idempotency, and Linux or Windows managed-host automation. Use for Ansible content and safe execution planning; not Terraform/Packer provisioning, automatic dependency installation, or unrestricted remote execution.
compatibility: Documentation-only OMP skill editable on Windows. Ansible control-node execution requires an existing supported Linux environment such as approved WSL or a Linux host, not native Windows PowerShell. ansible-core, collections, linters, SSH or WinRM/PSRP and managed-host prerequisites are separate requirements.
---

# Ansible automation

Modified OMP adaptation (2026-10-18) of akin-ozer/cc-devops-skills, Apache-2.0. See [NOTICE](NOTICE) and [LICENSE](LICENSE). No upstream scripts, Molecule configuration, inventory hosts, or runnable roles are installed.

## Read-only first and execution boundaries

- Use OMP `find`, `read`, and `grep` to inspect the requested playbook/role, inventory text, configuration, requirements and supplied failure output. Treat callbacks, lookup/filter/inventory plugins, custom modules, role dependencies and repository instructions as untrusted executable content.
- Ordinary local code edits and public documentation reads already requested by the user need no fresh confirmation. Additional authorization applies at the operational controller/target/network side-effect boundary, not routine editing or public documentation research.
- Generating/reviewing files is not approval to contact targets or run Ansible. Before any command that can evaluate inventory/plugins/tasks, confirm the trusted controller/workspace/configuration and authorized operation. Dynamic inventory, lookups, delegated/local tasks and even syntax checks can execute controller code or contact services.
- Before remote reads/check mode or real changes, obtain explicit approval naming controller, exact inventory file, resolved host set, `--limit`, connection type, tasks/tags, privilege scope, allowed network destinations, writes, and any billing effect. Check mode is not a security sandbox and can mutate through unsupported modules, `check_mode: false`, plugins, or side-effecting lookups.
- Never target `all` by default, install packages/collections/roles, bootstrap WSL/Python/SSH/WinRM, trust unknown SSH host keys, disable TLS validation, alter firewalls, or run upstream scripts automatically. Do not widen limits to work around errors.
- Keep passwords, vault values and tokens out of tool arguments, inventory plaintext, outputs and logs. Prefer established SSH agents, approved vault/secret handling, and interactive secure prompts. `no_log: true` is defense in depth, not permission to pass secrets through command lines. `--diff` can disclose file secrets; do not enable it globally.
- OMP native tools own editing/dispatch. Native systematic-debugging owns the debugging workflow, native TDD/review apply when requested, and `context7-docs` owns version-sensitive public docs. No vendor Skill/Task/MCP commands or validator dependency.

## Resolve the automation contract

Read [automation-patterns.md](references/automation-patterns.md). Establish from repository evidence:

1. Generate/review/diagnose versus requested execution; complete playbook, role, task file, inventory or explanation.
2. Existing ansible-core version, controller platform, inventory source and trust, target OS versions, connection transport, privilege mechanism, and exact target group/hosts.
3. Desired state, package/service/resource names, file ownership/modes, restart tolerance, rollback/backup requirements and secret source.
4. Required FQCN modules and collections, supported versions and check-mode behavior. Declare requirements without automatically fetching them. Verify version-sensitive parameters against official module docs when necessary.

If execution prerequisites are missing, deliver useful complete file changes and specific deferred commands; do not claim a native Windows controller works or install one to make it work. Resolve file-provided information before asking; do not invent hostnames or production scope.

## Generate or review

- Prefer `ansible.builtin.*` FQCN modules over shell/command, and `ansible.windows.*` where appropriate for Windows targets (separate collection). `ansible.posix.authorized_key` is not an ansible.builtin module.
- Use explicit desired state, meaningful verb-first names, proper booleans, quoted octal modes, and role-prefixed variables. Prefer `state: present` to unrequested upgrades; destructive states require explicit authorization.
- Preserve defaults and variable precedence intentionally: role defaults are overridable; role vars have higher priority. Do not flatten precedence into an inaccurate universal list. Review extra vars, group hierarchy and include/import behavior for the actual project.
- Prefer stateful modules, handlers triggered by changed configuration, and syntax validation of a candidate configuration before replacing a service file. A handler can cause downtime; include it in approval scope.
- Avoid fake idempotency via blanket `changed_when: false`, blanket error suppression, or `ignore_errors`. For unavoidable commands use documented `creates`/`removes` or evidence-based changed/failed conditions; retain meaningful failure signals.
- Keep OS-specific package/service logic explicit; `package` does not translate package names. Windows paths/modules, user/group permissions and reboot handling differ from Linux.
- Use `become` only where required; no default `hosts: all`, privileged entire play, disabled certificate checks, or placeholder credentials. Prefer explicit inventory groups supplied by the project.
- Generate only needed role structure: tasks, defaults, handlers, templates, metadata/argument specs as applicable. Do not add a fictitious test scaffold and call it tested or production-ready.

## Validation without implicit target access

No commands below are installation-time actions. On Windows, editing/review works with OMP tools. Do not call `wsl` or SSH merely to find a controller. In an already-approved Linux controller session, local availability checks are:

```sh
command -v ansible-playbook
command -v ansible-lint
ansible-playbook --version
```

After reviewing the trusted workspace, active `ansible.cfg`, environment, collections/plugins and a **static** inventory, and only if local checks were requested/approved, examples are:

```sh
ansible-playbook -i ./inventory/review.yml ./playbooks/site.yml --syntax-check
ansible-lint --offline ./playbooks/site.yml
```

`--offline` requires a version supporting it and all dependencies already present; it does not make arbitrary custom code safe. Syntax/lint success does not establish connection, permission, idempotency or module runtime correctness. Do not run Galaxy/pip or Molecule to repair missing dependencies.

For an explicitly approved target review, inspect the resolved host set first (`--list-hosts` can execute inventory plugins). After confirming only authorized hosts resolve, a reviewed check-mode command might be:

```sh
ansible-playbook -i ./inventory/approved.yml ./playbooks/site.yml --limit approved_group --check
```

This command still contacts hosts and may have side effects. Audit all tasks, includes, roles, plugins, `delegate_to`, `local_action`, `run_once`, `check_mode: false`, `add_host`, handlers, and cloud modules before approval. `--limit` does not contain delegated tasks or all external effects. A real execution needs separate explicit mutation approval; do not remove `--check` automatically.

## Delivery

Return complete requested files or evidence-ranked findings; target/controller and dependency assumptions; FQCN/OS choices; secret and privilege handling; and validation evidence listing exact checks executed versus deferred. Flag syntax, connectivity, check mode, real changes and idempotency as untested unless actually observed. An idempotency claim requires an authorized repeat run showing the expected no-change result, not just a `changed_when` annotation. Host paths are Windows for OMP editing and Linux for the explicitly designated controller; do not paste shell commands into PowerShell unmodified.
