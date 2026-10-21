---
title: Defer Non-Critical Third-Party Libraries
impact: MEDIUM
impactDescription: loads after hydration
tags: bundle, third-party, analytics, defer
---

> OMP adaptation: read SKILL.md operating boundaries before applying this illustrative rule. Exact-target approval is required for mutations/network/database execution; dependencies are not installed automatically. Upstream performance figures are not locally verified.


## Defer Non-Critical Third-Party Libraries

Analytics, logging, and error tracking don't block user interaction. Load them after hydration.

**Incorrect (blocks initial bundle):**

```tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

**Correct (loads after hydration):**

```tsx
import dynamic from 'next/dynamic'

const Analytics = dynamic(
  () => import('@vercel/analytics/react').then(m => m.Analytics),
  { ssr: false }
)

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```


**OMP correction/caveat:** Next.js App Router: ssr:false belongs in a Client Component wrapper, not a Server Component root layout. Keep layout server-side and render an approved existing client wrapper. Do not add analytics or a vendor service merely to optimize it.
