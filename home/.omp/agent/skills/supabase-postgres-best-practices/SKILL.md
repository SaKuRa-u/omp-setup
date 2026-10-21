---
name: supabase-postgres-best-practices
description: PostgreSQL query, schema, indexing, pooling, locking and RLS guidance for established Postgres projects, including but not requiring Supabase. Use when implementing or reviewing PostgreSQL backend code or diagnosing supplied query plans; not for automatic database execution or provisioning.
license: MIT
metadata:
  author: supabase
  version: "1.1.1"
  organization: Supabase
  date: January 2026
  abstract: Comprehensive Postgres performance optimization guide for developers using Supabase and Postgres. Contains performance rules across 8 categories, prioritized by impact from critical (query performance, connection management) to incremental (advanced features). Each rule includes detailed explanations, incorrect vs. correct SQL examples, query plan analysis, and specific performance metrics to guide automated optimization and code generation.
---

## OMP operating boundary (local adaptation)

Read-only first: inspect the exact repository, manifests, lockfiles, configuration and user-supplied evidence before proposing changes. This documentation is not proof that any tool, dependency, account or service is installed. Use OMP native read/find/grep/edit/task tools; native systematic-debugging, TDD, review and Context7 remain authoritative. Do not invoke vendor Skill/Task commands, evaluators, installers or hooks.

Ordinary code edits and public documentation reads follow the user's authorized task scope; do not ask again for approval already given. Obtain exact-target approval at the point of risk before out-of-scope changes, database access, deployment, destructive/network-policy changes or billing-impacting actions. Name the target, intended operation, impact and rollback. Never send credentials, session cookies, connection strings, private keys or sensitive row data in tool arguments or logs. Do not automatically install dependencies, SDKs, CLIs or toolchains, or provision Vercel/Supabase resources. This skill grants no additional permissions.

Windows: resolve paths relative to the actual project; prefer OMP file tools and PowerShell with quoted Windows paths. SQL is database-side, not a shell command. Bash/Linux commands are illustrative and require an explicitly available, approved Linux/WSL environment; never assume one.

Performance multipliers and sample plans are upstream illustrations, not measured guarantees. Preserve semantics, authorization, accessibility and correctness before optimization.

### PostgreSQL scope and execution safety

Apply only for established PostgreSQL work, including plain Postgres anywhere; Supabase is optional. Inspect server version, driver/ORM, extensions, pooler/version/mode, schema, role and environment from existing project evidence. Use native Context7 for version-dependent public APIs and version-matched PostgreSQL documentation for SQL. Supabase auth.uid(), authenticated/anon/service_role roles and hosted pooler ports are not portable Postgres defaults.

Do not automatically connect to any database, even for SELECT. Default to reviewing supplied SQL/schema/plans offline. Draft migrations separately from applying them. Every example is illustrative, never an instruction to execute. All DDL/DML, RLS/grants/roles/functions, extensions, ALTER SYSTEM, configuration reloads, statistics resets, maintenance, COPY/imports and locks require explicit approval for the exact environment and operation, with impact/rollback discussed. SELECT can mutate through functions, acquire locks or expose sensitive data; review its behavior too. No paid database resources, keys, SDK/CLI installation or npm install.

Prefer supplied plans or non-executing EXPLAIN first. EXPLAIN ANALYZE actually executes the statement: never use it on writes, data-modifying CTEs or side-effecting functions, even inside a rollback transaction. For read-only queries, obtain exact-target approval, inspect functions and cost, use bounded timeouts and a suitable staging/read-only environment; read-only is not zero load or zero disclosure.

RLS changes require a reviewed identity/trust model and explicit approval. A client-settable custom GUC is not trusted identity: only a trusted backend may set transaction-local identity after verifying authentication, without allowing clients arbitrary SQL or role/context changes. Pooling must not leak identity. Table owners generally bypass RLS unless forced; superusers/BYPASSRLS still bypass it. SECURITY DEFINER does not inherently bypass all RLS: owner privileges and table ownership/flags determine behavior. Restrict helper ownership/search_path/EXECUTE and test intended caller access; a policy's caller still needs EXECUTE on its helper. Never copy broad grants/revokes or policies blindly.


# Supabase Postgres Best Practices

Comprehensive performance optimization guide for Postgres, maintained by Supabase. Contains rules across 8 categories, prioritized by impact to guide automated query optimization and schema design.

## When to Apply

Reference these guidelines when:
- Writing SQL queries or designing schemas
- Implementing indexes or query optimization
- Reviewing database performance issues
- Configuring connection pooling or scaling
- Optimizing for Postgres-specific features
- Working with Row-Level Security (RLS)

## Rule Categories by Priority

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Query Performance | CRITICAL | `query-` |
| 2 | Connection Management | CRITICAL | `conn-` |
| 3 | Security & RLS | CRITICAL | `security-` |
| 4 | Schema Design | HIGH | `schema-` |
| 5 | Concurrency & Locking | MEDIUM-HIGH | `lock-` |
| 6 | Data Access Patterns | MEDIUM | `data-` |
| 7 | Monitoring & Diagnostics | LOW-MEDIUM | `monitor-` |
| 8 | Advanced Features | LOW | `advanced-` |

## How to Use

Read individual rule files for detailed explanations and SQL examples:

```
references/query-missing-indexes.md
references/query-partial-indexes.md
references/_sections.md
```

Each rule file contains:
- Brief explanation of why it matters
- Incorrect SQL example with explanation
- Correct SQL example with explanation
- Optional EXPLAIN output or metrics
- Additional context and references
- Supabase-specific notes (when applicable)

## References

- https://www.postgresql.org/docs/current/
- https://supabase.com/docs
- https://wiki.postgresql.org/wiki/Performance_Optimization
- https://supabase.com/docs/guides/database/overview
- https://supabase.com/docs/guides/auth/row-level-security

## Bundled documentation

- [_sections](references/_sections.md)
- [advanced-full-text-search](references/advanced-full-text-search.md)
- [advanced-jsonb-indexing](references/advanced-jsonb-indexing.md)
- [conn-idle-timeout](references/conn-idle-timeout.md)
- [conn-limits](references/conn-limits.md)
- [conn-pooling](references/conn-pooling.md)
- [conn-prepared-statements](references/conn-prepared-statements.md)
- [data-batch-inserts](references/data-batch-inserts.md)
- [data-n-plus-one](references/data-n-plus-one.md)
- [data-pagination](references/data-pagination.md)
- [data-upsert](references/data-upsert.md)
- [lock-advisory](references/lock-advisory.md)
- [lock-deadlock-prevention](references/lock-deadlock-prevention.md)
- [lock-short-transactions](references/lock-short-transactions.md)
- [lock-skip-locked](references/lock-skip-locked.md)
- [monitor-explain-analyze](references/monitor-explain-analyze.md)
- [monitor-pg-stat-statements](references/monitor-pg-stat-statements.md)
- [monitor-vacuum-analyze](references/monitor-vacuum-analyze.md)
- [query-composite-indexes](references/query-composite-indexes.md)
- [query-covering-indexes](references/query-covering-indexes.md)
- [query-index-types](references/query-index-types.md)
- [query-missing-indexes](references/query-missing-indexes.md)
- [query-partial-indexes](references/query-partial-indexes.md)
- [schema-constraints](references/schema-constraints.md)
- [schema-data-types](references/schema-data-types.md)
- [schema-foreign-key-indexes](references/schema-foreign-key-indexes.md)
- [schema-lowercase-identifiers](references/schema-lowercase-identifiers.md)
- [schema-partitioning](references/schema-partitioning.md)
- [schema-primary-keys](references/schema-primary-keys.md)
- [security-privileges](references/security-privileges.md)
- [security-rls-basics](references/security-rls-basics.md)
- [security-rls-performance](references/security-rls-performance.md)

## Attribution and local adaptation

Adapted from https://github.com/supabase/agent-skills, commit `c9be0e931b7930f7d02126d04774d904c381e7d7`, source `skills/supabase-postgres-best-practices`. Upstream declares MIT in SKILL frontmatter. See [LICENSE](LICENSE). OMP safety boundaries and inline corrections are local adaptations, not upstream endorsements. All rule content is retained except explicitly corrected examples; authoring templates and duplicate compiled/developer documents are excluded.
