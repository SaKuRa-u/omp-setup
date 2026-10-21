---
name: vercel-react-best-practices
description: React and Next.js performance optimization guidelines from Vercel Engineering. This skill should be used when writing, reviewing, or refactoring React/Next.js code to ensure optimal performance patterns. Triggers on tasks involving React components, Next.js pages, data fetching, bundle optimization, or performance improvements.
license: MIT
metadata:
  author: vercel
  version: "1.0.0"
---

## OMP operating boundary (local adaptation)

Read-only first: inspect the exact repository, manifests, lockfiles, configuration and user-supplied evidence before proposing changes. This documentation is not proof that any tool, dependency, account or service is installed. Use OMP native read/find/grep/edit/task tools; native systematic-debugging, TDD, review and Context7 remain authoritative. Do not invoke vendor Skill/Task commands, evaluators, installers or hooks.

Ordinary code edits and public documentation reads follow the user's authorized task scope; do not ask again for approval already given. Obtain exact-target approval at the point of risk before out-of-scope changes, database access, deployment, destructive/network-policy changes or billing-impacting actions. Name the target, intended operation, impact and rollback. Never send credentials, session cookies, connection strings, private keys or sensitive row data in tool arguments or logs. Do not automatically install dependencies, SDKs, CLIs or toolchains, or provision Vercel/Supabase resources. This skill grants no additional permissions.

Windows: resolve paths relative to the actual project; prefer OMP file tools and PowerShell with quoted Windows paths. SQL is database-side, not a shell command. Bash/Linux commands are illustrative and require an explicitly available, approved Linux/WSL environment; never assume one.

Performance multipliers and sample plans are upstream illustrations, not measured guarantees. Preserve semantics, authorization, accessibility and correctness before optimization.

### React/Next.js scope and ownership

Apply only when repository evidence or the user establishes React/Next.js; this does not establish the user's default stack. Inspect actual React, React DOM, Next.js, router, compiler, runtime and library versions from manifests and lockfiles. Consult the native Context7 skill for version-dependent APIs (Activity, useEffectEvent, use/useTransition, cache, after, resource hints, Next configuration and pooling libraries); if unavailable, state that limitation and use supplied/version-matched official docs, not guesses. Do not upgrade to make an example work.

Impeccable remains the UI design owner: this skill covers implementation/performance, not visual direction or a competing design system. Keep existing data-fetching/cache libraries; SWR, better-all, lru-cache, Zod and analytics imports are optional examples, not installation instructions. Prefer the dependency-free promise example when better-all is absent. Only parallelize already-authorized independent work; bound fan-out to service limits and handle rejection paths.

Never use browser cookies/localStorage to establish authorization. Never cache auth decisions or sensitive per-user data in shared module state; caches require tenant/user-aware keys, access checks, bounds, invalidation and suitable lifetime. Keep secret fields out of client props. No telemetry, prefetch or third-party network requests without applicable approval and privacy/consent review. Hydration suppression does not repair mismatches: fix deterministic server/client output first; use an escape hatch only when deliberately unavoidable.


# Vercel React Best Practices

Comprehensive performance optimization guide for React and Next.js applications, maintained by Vercel. Contains 70 rules across 8 categories, prioritized by impact to guide automated refactoring and code generation.

## When to Apply

Reference these guidelines when:
- Writing new React components or Next.js pages
- Implementing data fetching (client or server-side)
- Reviewing code for performance issues
- Refactoring existing React/Next.js code
- Optimizing bundle size or load times

## Rule Categories by Priority

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Eliminating Waterfalls | CRITICAL | `async-` |
| 2 | Bundle Size Optimization | CRITICAL | `bundle-` |
| 3 | Server-Side Performance | HIGH | `server-` |
| 4 | Client-Side Data Fetching | MEDIUM-HIGH | `client-` |
| 5 | Re-render Optimization | MEDIUM | `rerender-` |
| 6 | Rendering Performance | MEDIUM | `rendering-` |
| 7 | JavaScript Performance | LOW-MEDIUM | `js-` |
| 8 | Advanced Patterns | LOW | `advanced-` |

## Quick Reference

### 1. Eliminating Waterfalls (CRITICAL)

- `async-cheap-condition-before-await` - Check cheap sync conditions before awaiting flags or remote values
- `async-defer-await` - Move await into branches where actually used
- `async-parallel` - Use Promise.all() for independent operations
- `async-dependencies` - Use dependency-free promises for partial dependencies; better-all only if already adopted
- `async-api-routes` - Start promises early, await late in API routes
- `async-suspense-boundaries` - Use Suspense to stream content

### 2. Bundle Size Optimization (CRITICAL)

- `bundle-barrel-imports` - Import directly, avoid barrel files
- `bundle-analyzable-paths` - Prefer statically analyzable import and file-system paths to avoid broad bundles and traces
- `bundle-dynamic-imports` - Use next/dynamic for heavy components
- `bundle-defer-third-party` - Load analytics/logging after hydration
- `bundle-conditional` - Load modules only when feature is activated
- `bundle-preload` - Preload on hover/focus for perceived speed

### 3. Server-Side Performance (HIGH)

- `server-auth-actions` - Authenticate server actions like API routes
- `server-cache-react` - Use React.cache() for per-request deduplication
- `server-cache-lru` - Use LRU cache for cross-request caching
- `server-dedup-props` - Avoid duplicate serialization in RSC props
- `server-hoist-static-io` - Hoist static I/O (fonts, logos) to module level
- `server-no-shared-module-state` - Avoid module-level mutable request state in RSC/SSR
- `server-serialization` - Minimize data passed to client components
- `server-parallel-fetching` - Restructure components to parallelize fetches
- `server-parallel-nested-fetching` - Chain nested fetches per item in Promise.all
- `server-after-nonblocking` - Use after() for non-blocking operations

### 4. Client-Side Data Fetching (MEDIUM-HIGH)

- `client-swr-dedup` - Use SWR for automatic request deduplication
- `client-event-listeners` - Deduplicate global event listeners
- `client-passive-event-listeners` - Use passive listeners for scroll
- `client-localstorage-schema` - Version and minimize localStorage data

### 5. Re-render Optimization (MEDIUM)

- `rerender-defer-reads` - Don't subscribe to state only used in callbacks
- `rerender-memo` - Extract expensive work into memoized components
- `rerender-memo-with-default-value` - Hoist default non-primitive props
- `rerender-dependencies` - Use primitive dependencies in effects
- `rerender-derived-state` - Subscribe to derived booleans, not raw values
- `rerender-derived-state-no-effect` - Derive state during render, not effects
- `rerender-functional-setstate` - Use functional setState for stable callbacks
- `rerender-lazy-state-init` - Pass function to useState for expensive values
- `rerender-simple-expression-in-memo` - Avoid memo for simple primitives
- `rerender-split-combined-hooks` - Split hooks with independent dependencies
- `rerender-move-effect-to-event` - Put interaction logic in event handlers
- `rerender-transitions` - Use startTransition for non-urgent updates
- `rerender-use-deferred-value` - Defer expensive renders to keep input responsive
- `rerender-use-ref-transient-values` - Use refs for transient frequent values
- `rerender-no-inline-components` - Don't define components inside components

### 6. Rendering Performance (MEDIUM)

- `rendering-animate-svg-wrapper` - Animate div wrapper, not SVG element
- `rendering-content-visibility` - Use content-visibility for long lists
- `rendering-hoist-jsx` - Extract static JSX outside components
- `rendering-svg-precision` - Reduce SVG coordinate precision
- `rendering-hydration-no-flicker` - Use inline script for client-only data
- `rendering-hydration-suppress-warning` - Suppress expected mismatches
- `rendering-activity` - Use Activity component for show/hide
- `rendering-conditional-render` - Use ternary, not && for conditionals
- `rendering-usetransition-loading` - Prefer useTransition for loading state
- `rendering-resource-hints` - Use React DOM resource hints for preloading
- `rendering-script-defer-async` - Use defer or async on script tags

### 7. JavaScript Performance (LOW-MEDIUM)

- `js-batch-dom-css` - Group CSS changes via classes or cssText
- `js-index-maps` - Build Map for repeated lookups
- `js-cache-property-access` - Cache object properties in loops
- `js-cache-function-results` - Cache function results in module-level Map
- `js-cache-storage` - Cache localStorage/sessionStorage reads
- `js-combine-iterations` - Combine multiple filter/map into one loop
- `js-length-check-first` - Check array length before expensive comparison
- `js-early-exit` - Return early from functions
- `js-hoist-regexp` - Hoist RegExp creation outside loops
- `js-min-max-loop` - Use loop for min/max instead of sort
- `js-set-map-lookups` - Use Set/Map for O(1) lookups
- `js-tosorted-immutable` - Use toSorted() for immutability
- `js-flatmap-filter` - Use flatMap to map and filter in one pass
- `js-request-idle-callback` - Defer non-critical work to browser idle time

### 8. Advanced Patterns (LOW)

- `advanced-effect-event-deps` - Don't put `useEffectEvent` results in effect deps
- `advanced-event-handler-refs` - Store event handlers in refs
- `advanced-init-once` - Initialize app once per app load
- `advanced-use-latest` - useLatest for stable callback refs

## How to Use

Read individual rule files for detailed explanations and code examples:

```
rules/async-parallel.md
rules/bundle-barrel-imports.md
```

Each rule file contains:
- Brief explanation of why it matters
- Incorrect code example with explanation
- Correct code example with explanation
- Additional context and references

## Complete rule index

All detailed rules are bundled below; no separate compiled AGENTS file is required.

## Bundled documentation

- [_sections](rules/_sections.md)
- [advanced-effect-event-deps](rules/advanced-effect-event-deps.md)
- [advanced-event-handler-refs](rules/advanced-event-handler-refs.md)
- [advanced-init-once](rules/advanced-init-once.md)
- [advanced-use-latest](rules/advanced-use-latest.md)
- [async-api-routes](rules/async-api-routes.md)
- [async-cheap-condition-before-await](rules/async-cheap-condition-before-await.md)
- [async-defer-await](rules/async-defer-await.md)
- [async-dependencies](rules/async-dependencies.md)
- [async-parallel](rules/async-parallel.md)
- [async-suspense-boundaries](rules/async-suspense-boundaries.md)
- [bundle-analyzable-paths](rules/bundle-analyzable-paths.md)
- [bundle-barrel-imports](rules/bundle-barrel-imports.md)
- [bundle-conditional](rules/bundle-conditional.md)
- [bundle-defer-third-party](rules/bundle-defer-third-party.md)
- [bundle-dynamic-imports](rules/bundle-dynamic-imports.md)
- [bundle-preload](rules/bundle-preload.md)
- [client-event-listeners](rules/client-event-listeners.md)
- [client-localstorage-schema](rules/client-localstorage-schema.md)
- [client-passive-event-listeners](rules/client-passive-event-listeners.md)
- [client-swr-dedup](rules/client-swr-dedup.md)
- [js-batch-dom-css](rules/js-batch-dom-css.md)
- [js-cache-function-results](rules/js-cache-function-results.md)
- [js-cache-property-access](rules/js-cache-property-access.md)
- [js-cache-storage](rules/js-cache-storage.md)
- [js-combine-iterations](rules/js-combine-iterations.md)
- [js-early-exit](rules/js-early-exit.md)
- [js-flatmap-filter](rules/js-flatmap-filter.md)
- [js-hoist-regexp](rules/js-hoist-regexp.md)
- [js-index-maps](rules/js-index-maps.md)
- [js-length-check-first](rules/js-length-check-first.md)
- [js-min-max-loop](rules/js-min-max-loop.md)
- [js-request-idle-callback](rules/js-request-idle-callback.md)
- [js-set-map-lookups](rules/js-set-map-lookups.md)
- [js-tosorted-immutable](rules/js-tosorted-immutable.md)
- [rendering-activity](rules/rendering-activity.md)
- [rendering-animate-svg-wrapper](rules/rendering-animate-svg-wrapper.md)
- [rendering-conditional-render](rules/rendering-conditional-render.md)
- [rendering-content-visibility](rules/rendering-content-visibility.md)
- [rendering-hoist-jsx](rules/rendering-hoist-jsx.md)
- [rendering-hydration-no-flicker](rules/rendering-hydration-no-flicker.md)
- [rendering-hydration-suppress-warning](rules/rendering-hydration-suppress-warning.md)
- [rendering-resource-hints](rules/rendering-resource-hints.md)
- [rendering-script-defer-async](rules/rendering-script-defer-async.md)
- [rendering-svg-precision](rules/rendering-svg-precision.md)
- [rendering-usetransition-loading](rules/rendering-usetransition-loading.md)
- [rerender-defer-reads](rules/rerender-defer-reads.md)
- [rerender-dependencies](rules/rerender-dependencies.md)
- [rerender-derived-state-no-effect](rules/rerender-derived-state-no-effect.md)
- [rerender-derived-state](rules/rerender-derived-state.md)
- [rerender-functional-setstate](rules/rerender-functional-setstate.md)
- [rerender-lazy-state-init](rules/rerender-lazy-state-init.md)
- [rerender-memo-with-default-value](rules/rerender-memo-with-default-value.md)
- [rerender-memo](rules/rerender-memo.md)
- [rerender-move-effect-to-event](rules/rerender-move-effect-to-event.md)
- [rerender-no-inline-components](rules/rerender-no-inline-components.md)
- [rerender-simple-expression-in-memo](rules/rerender-simple-expression-in-memo.md)
- [rerender-split-combined-hooks](rules/rerender-split-combined-hooks.md)
- [rerender-transitions](rules/rerender-transitions.md)
- [rerender-use-deferred-value](rules/rerender-use-deferred-value.md)
- [rerender-use-ref-transient-values](rules/rerender-use-ref-transient-values.md)
- [server-after-nonblocking](rules/server-after-nonblocking.md)
- [server-auth-actions](rules/server-auth-actions.md)
- [server-cache-lru](rules/server-cache-lru.md)
- [server-cache-react](rules/server-cache-react.md)
- [server-dedup-props](rules/server-dedup-props.md)
- [server-hoist-static-io](rules/server-hoist-static-io.md)
- [server-no-shared-module-state](rules/server-no-shared-module-state.md)
- [server-parallel-fetching](rules/server-parallel-fetching.md)
- [server-parallel-nested-fetching](rules/server-parallel-nested-fetching.md)
- [server-serialization](rules/server-serialization.md)

## Attribution and local adaptation

Adapted from https://github.com/vercel-labs/agent-skills, commit `063bee94c3f4df8453406c830b0a7df0f2860278`, source `skills/react-best-practices`. Upstream declares MIT in SKILL frontmatter. See [LICENSE](LICENSE). OMP safety boundaries and inline corrections are local adaptations, not upstream endorsements. All rule content is retained except explicitly corrected examples; authoring templates and duplicate compiled/developer documents are excluded.
