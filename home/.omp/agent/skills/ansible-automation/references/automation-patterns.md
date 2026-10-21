# Ansible automation patterns and diagnostic reference

Modified documentation adaptation, 2026-10-18, from akin-ozer/cc-devops-skills (`ansible-generator/SKILL.md` and selected best-practice sections), Apache-2.0; see [NOTICE](../NOTICE) and [LICENSE](../LICENSE). Examples are unexecuted documentation, not permission to run Ansible or install anything.

## Inventory, configuration and controller trust

Read inventory as text first. An INI/YAML file can still select plugins, connection methods, vault lookups or executable behavior through configuration. Inspect the project's `ansible.cfg`, collection/role requirements, plugin/callback directories, lookups, environment overrides and role dependencies. Ansible loads configuration by precedence; a repository config is not inherently trusted.

Keep real secrets outside inventory. Static groups should reflect actual environments and approved hosts; never generate production IPs or automatically broaden to `all`. Dynamic inventory can call cloud APIs or execute programs even for listing commands. `--limit` narrows normal inventory selection but not delegated execution, local actions, arbitrary lookups or external services operated by modules.

Native Windows is not an Ansible control node. OMP can generate/review files on Windows. Execution needs a separately approved, existing supported Linux controller (including supported WSL use where appropriate). WSL is not installed or invoked by this skill. SSH/WinRM connectivity and managed-node interpreters remain prerequisites.

## Minimal role layout

Create only files required by the request:

```text
roles/app_config/
  defaults/main.yml
  tasks/main.yml
  handlers/main.yml
  templates/app.conf.j2
  meta/argument_specs.yml
```

Defaults are intended for user overrides. `vars/main.yml` is higher priority and should not become a dumping ground for configurable defaults. Inventory groups, host vars, includes, role invocation and extra vars affect precedence; use exact-version documentation for disputed behavior. A role directory is not evidence of test coverage. Do not copy Molecule scaffolding without implementing and approving the actual runtime test.

## Idempotent desired state

A task file fragment for a previously approved Linux service role:

```yaml
- name: Create application configuration directory
  ansible.builtin.file:
    path: /etc/myapp
    state: directory
    owner: root
    group: root
    mode: '0755'
  become: true

- name: Render validated application configuration
  ansible.builtin.template:
    src: app.conf.j2
    dest: /etc/myapp/app.conf
    owner: root
    group: root
    mode: '0640'
    backup: true
    validate: '/usr/local/bin/myapp --check-config %s'
  become: true
  notify: Restart application
```

Handler fragment:

```yaml
- name: Restart application
  ansible.builtin.service:
    name: myapp
    state: restarted
  become: true
```

These are explicit fragments, not a runnable complete role: the service, its real config format, installed validation binary, privileges and downtime allowance must be supplied by the actual project. Only include `validate` if the application's executable genuinely supports that syntax. `backup: true` can create sensitive files; review ownership, retention and secret contents. Avoid diff/logging of secret-bearing templates. A handler runs only if notified, normally once at the appropriate handler phase; explicit `flush_handlers` changes timing and needs a reason.

Idempotency means repeated authorized execution converges without unintended changes. Stateful file/package/user/service modules usually express it better than commands. `changed_when: false` only changes reporting; it does not prevent side effects. `creates` and `removes` are useful command guards but must represent the actual desired state. Never suppress failures merely to make a run green.

## Module choice and platform distinctions

| Need | Typical module | Review requirements |
| --- | --- | --- |
| Linux package desired state | `ansible.builtin.apt`, `ansible.builtin.dnf`, or `ansible.builtin.package` | Real OS, package name/version, package-manager locks, repository trust and network scope; `package` does not translate names |
| File or directory permissions | `ansible.builtin.file` | Quoted modes, correct owner/group, avoid unrequested recursive permission changes |
| Managed configuration | `ansible.builtin.template` / `ansible.builtin.copy` | Secret logging, validation command existence, backup policy and notified restart |
| Linux service state | `ansible.builtin.service` / `ansible.builtin.systemd_service` | Service manager/module version, disruption and privilege boundary |
| SSH authorized keys | `ansible.posix.authorized_key` | Separate collection and key provenance; not `ansible.builtin.authorized_key`; exclusive key changes can lock operators out |
| Windows files/services | `ansible.windows.win_file`, `win_copy`, `win_template`, `win_service` | Existing collection, Windows path escaping, ACL model, connection and authentication |
| Unavoidable external command | `ansible.builtin.command` preferred to shell | Exact executable/argv, idempotency guard, changed/failed conditions, target/controller location and secret exposure |

Declare collection dependencies and compatible versions in the project's requirements when needed, but do not fetch them. FQCN is preferred for ambiguity avoidance; short names are not all universally deprecated. Lookup/filter plugins execute on the controller, while most modules execute on managed nodes. `delegate_to` changes where a task runs; privilege escalation and credentials must match that host.

## Safety-sensitive task review

- `state: absent`, account/key changes, package upgrades, firewall settings, storage/database changes and reboots are distinct high-impact actions; scope approval precisely.
- `become: true` should be task/block-scoped when possible, not an automatic whole-play default. Confirm the privilege mechanism, not just the boolean.
- `no_log: true` helps protect secret-bearing tasks, but debug tasks, registered vars, callback output, controller artifacts and diff may still leak data. Do not print them.
- Vault encryption protects stored data, not secrets after decryption or in module arguments. Use existing approved vault identity/prompt mechanisms; never put vault passwords in command strings or extra vars.
- Do not weaken host-key or TLS checks to solve connection failures. Establish the correct identity/trust chain.
- `check_mode: false`, `local_action`, dynamic includes and role dependencies can bypass an assumed dry-run boundary. Read them before any check-mode request.
- `failed_when: false`, `ignore_errors`, broad rescue blocks and `changed_when` can hide real failure. Preserve the original failure and make exception handling objective-specific.
- `serial` and `max_fail_percentage` affect rollout risk, but are not a rollback plan. Decide health checks, backups and recovery procedure from the actual service contract before approving changes.

## Evidence-driven diagnosis

| Supplied failure | First local evidence | Next narrow question/check, only if approved |
| --- | --- | --- |
| YAML parse error | exact reported line plus surrounding indentation/quoting | trusted local syntax/lint tool; YAML validity alone does not prove Ansible semantics |
| Module not found | FQCN, requirements and reported Ansible/collection version | inspect existing controller collection inventory; no automatic Galaxy install |
| Undefined variable | role defaults, inventory layering, include scope, extra vars names | identify expected source without printing secret values |
| Unreachable | connection config, host/port, redacted SSH or WinRM error | authorized connectivity/identity check; never disable verification |
| Permission denied | task `become`, remote user, target path/ACL | exact privilege requirement and intended owner; no blanket root/chmod workaround |
| Task always changed | stateful module parameters, command guards, template nondeterminism | an authorized repeated run on the same target and desired state |
| Check mode differs from apply | module documentation, conditions, registered vars, forced tasks | identify unsupported check-mode behavior; do not silently perform a real run |
| Handler not triggered | task changed status, notify/listen names, include timing | determine whether a real config change was expected before forcing restart |

Use native systematic-debugging to establish a cause, then the smallest correct domain change. Do not run target access to confirm a user-reported failure or copy unredacted verbose output into logs. Verbose Ansible output can expose sensitive details; require a need and redact it.

## Validation evidence ladder

1. Text/manual review: YAML shape, FQCNs, desired state, variables, secrets and approval scope. Not a tool pass.
2. Trusted local syntax/lint checks: can parse/evaluate code and may need collections/configuration. Report the actual version and command; missing requirements are a limit, not a reason to install automatically.
3. Approved inventory resolution/check mode: may contact services and targets; not guaranteed read-only. Inspect all side-effect paths first.
4. Approved real execution and repeat-run idempotency evidence: separate authorization and actual observed changes/health. Do not infer this from step 1 or 2.

## Authoritative follow-up

- https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html
- https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_checkmode.html
- https://docs.ansible.com/ansible/latest/reference_appendices/general_precedence.html
- https://docs.ansible.com/ansible/latest/collections/ansible/builtin/
- https://docs.ansible.com/ansible/latest/collections/ansible/windows/

Use the relevant installed version rather than assuming `latest` matches. These are further reading pointers; installation did not access a controller, run these examples or verify runtime behavior.
