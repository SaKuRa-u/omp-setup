---
name: webapp-testing
description: Verify an authorized web application's rendered UI, interactions, responsive states and browser errors with OMP's native browser. Use for actual web-surface smoke verification; not a replacement for TDD, debugging, UI design, or a security audit.
license: Apache-2.0; see LICENSE.txt
compatibility: OMP Eval browser API; Windows paths; no bundled server launcher or Python Playwright dependency
---

# Web application verification — OMP adaptation

Adapted 2026-10-18 from the Anthropic `webapp-testing` skill installed in OpenCode. The source's rendered-state reconnaissance is retained; Python launchers, black-box script execution, mandatory `networkidle`, and fixed sleep advice are replaced with native OMP browser workflows. See [provenance](references/provenance.json).

## Ownership and permissions

- Impeccable owns UI design and critique. This skill supplies verification evidence, not a second visual design system.
- Use `systematic-debugging` for unexpected failures, `tdd` for requested test-first work, and `verification-before-completion` before claiming success.
- Inspect repository scripts and the user's selected app/URL before launching anything. A script named `dev` or `test` is executable code, not automatic permission to run an untrusted project.
- Prefer a dedicated managed browser tab. Do not adopt or navigate a logged-in user tab without a named authorized target. Never submit purchases, destructive changes, real messages, production writes, or account/security changes merely to test a button.
- Do not install Playwright, browsers, npm dependencies, vendor helpers, or remote services without the applicable permission. Native managed Chromium can be downloaded on first use; use an authorized existing runtime if acquisition is outside scope, or report the missing prerequisite.
- Keep screenshots, traces, cookies, logs and request bodies local and scoped. Redact credentials and personal data; never export authentication state or inspect unrelated browser sessions.

## Select the verification surface

1. Resolve the exact local app, startup command, port and expected behavior from the task and repository. Ask only if identity remains ambiguous.
2. Reuse an authorized running server. Otherwise inspect the project command and use the Bash tool's named service with readiness port/log checks and explicit `cwd`; do not start a bundled wrapper or kill a process you do not own.
3. Read `xd://eval/browser` before first use. The mounted API is authoritative if examples differ.
4. Open a dedicated tab. Observe rendered state, identify accessible roles/labels or stable test IDs, then interact. Reading HTML or taking a screenshot alone does not prove behavior.
5. Wait for a concrete state: visible control, expected text, route, or completed app state. Do not require `networkidle`: polling, streaming and analytics can keep a valid app busy. Avoid arbitrary sleeps.

## Native browser recipe

Run through JavaScript Eval; replace the URL and expectations with the selected app's real contract. Do not select an unrelated example target.

```javascript
const tab = await browser.open({
  name: 'webapp-check',
  url: 'http://127.0.0.1:5173',
  viewport: { width: 1280, height: 800 }
});
try {
  display(await tab.observe());
  // Choose a selector from the observed rendered state, not guessed source text.
  await tab.waitForSelector('role/button[name="Save" exact]', { timeout: 10000 });
  await tab.click('role/button[name="Save" exact]');
  await tab.waitForText('Saved', { timeout: 10000 });
  display(await tab.errors());
  await tab.screenshot({ fullPage: true });
} finally {
  await tab.close();
}
```

A selector that fails is evidence to inspect, not a reason to silently weaken the assertion. After navigation or rerender, re-observe before using observed element references. For custom checks, use `tab.run` and throw on a mismatched value; cell closures are not captured. Do not assume its `assert` helper has Node's `assert.equal` methods.

Keyboard calls use `tab.press('Tab', { selector: 'role/textbox[name="Item" exact]' })`, not `(selector, key)`. Inspect focus after the actual keyboard transition.

### Windows runtime observations

The installation smoke on 2026-10-18 used the existing Edge executable and a dedicated temporary profile. Automatic `app.path` launch returned a WebSocket connection failure; launching an owned headless Edge process and connecting with `app: { cdp_url: 'http://127.0.0.1:<owned-port>' }` succeeded. This is an observed fallback, not a diagnosed fix for the automatic launcher. Never attach an unrelated user browser or change browser/network policy to bypass a failure.

Check `tab.observe().viewport` rather than assuming the requested size applied. The CDP smoke initially reported 754x487 despite the open request. On this Chromium route an explicit resize worked:

```javascript
await tab.run(async ({ page }) => {
  await page.setViewport({ width: 390, height: 844 });
});
display((await tab.observe()).viewport);
```

`page.setViewport` is a Chromium API; do not assume a Tern tab supports it. Close owned browser processes before removing their temporary profiles; closing a CDP-managed tab only releases it.

## Cover the changed contract

Choose relevant cases, not a ritual full suite:

- Main path: user input -> action -> visible result, with the actual resulting state checked.
- Empty/loading/error states: only trigger failures on the authorized local/synthetic target. Do not disrupt production networking or mutate real records to manufacture an error.
- Form boundaries: invalid input, displayed error, correction and successful resubmission. Never use actual secrets in fixtures.
- Keyboard: focus entry, tab order, Enter/Space activation, Escape/dismissal and visible focus. A screenshot cannot establish keyboard access.
- Responsive: inspect a desktop and a narrow viewport, including navigation, horizontal overflow and actionable controls. Visual inspection of both is required for a visual pass.
- State transitions: disabled/busy behavior, duplicate submissions where relevant, cancel, refresh and persistence if these belong to the requested contract.
- Browser diagnostics: report actual console/runtime errors and relevant failed requests without copying credentials or entire payloads.

For mobile checks open a second named tab with a narrow viewport, or use the documented viewport emulation API. Close every owned tab in `finally`. Stop only services created for this task. Do not kill shared browser/server processes.

## Evidence and report

Report in Bahasa Indonesia: selected app/URL, tested action and expected state, observed result, viewport(s), keyboard/error cases actually exercised, and remaining limits. Distinguish **terverifikasi**, **gagal**, and **belum diuji**. A passed smoke flow is not an accessibility certification, security audit, full E2E suite, or proof that every browser works. Keep permanent tests only when they catch a plausible consumer-visible regression and match existing project conventions; use throwaway probes for this workflow's own API checks.
