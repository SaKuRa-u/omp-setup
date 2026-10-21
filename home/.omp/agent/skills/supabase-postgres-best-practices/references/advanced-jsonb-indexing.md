---
title: Index JSONB Columns for Efficient Querying
impact: MEDIUM
impactDescription: 10-100x faster JSONB queries with proper indexing
tags: jsonb, gin, indexes, json
---

> OMP adaptation: read SKILL.md operating boundaries before applying this illustrative rule. Exact-target approval is required for mutations/network/database execution; dependencies are not installed automatically. Upstream performance figures are not locally verified.


## Index JSONB Columns for Efficient Querying

JSONB queries without indexes scan the entire table. Use GIN indexes for containment queries.

**Incorrect (no index on JSONB):**

```sql
create table products (
  id bigint primary key,
  attributes jsonb
);

-- Full table scan for every query
select * from products where attributes @> '{"color": "red"}';
select * from products where attributes->>'brand' = 'Nike';
```

**Correct (GIN index for JSONB):**

```sql
-- GIN index for containment operators (@>, ?, ?&, ?|)
create index products_attrs_gin on products using gin (attributes);

-- Now containment queries use the index
select * from products where attributes @> '{"color": "red"}';

-- For specific key lookups, use expression index
create index products_brand_idx on products ((attributes->>'brand'));
select * from products where attributes->>'brand' = 'Nike';
```

Choose the right operator class:

```sql
-- jsonb_ops (default): supports all operators, larger index
create index idx1 on products using gin (attributes);

-- jsonb_path_ops: only @> operator, but 2-3x smaller index
create index idx2 on products using gin (attributes jsonb_path_ops);
```

Reference: [JSONB Indexes](https://www.postgresql.org/docs/current/datatype-json.html#JSON-INDEXING)
