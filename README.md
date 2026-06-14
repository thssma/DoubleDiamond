# DoubleDiamond

Static frontend for the DoubleDiamond field service and client portal application.

## Current Scope

- Client portal for project progress, reports, photos, timeline, approvals, and signatures.
- Employee field workflow for work orders, routes, check-ins, photo upload, and mobile operations.
- Owner command center for operational, financial, automation, and AI dashboards.

## Local Run

Use any static file server from the repository root. Example:

```powershell
python -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/index.html?v=v1-commercial-final
```

## Demo Access

- Client: use the public client login button.
- Employee: staff access with PIN `field123`.
- Owner: staff access with PIN `owner123`.

These PINs are demo-only. Production authentication belongs in the security/backend block.

## Frontend Structure

- `index.html`: static shell and script loading order.
- `style.css`: global styles.
- `script.js`: legacy application surface still being reduced.
- `js/dd-*.js`: shared runtime modules extracted from the legacy script.
- `js/screens/`: screen-specific modules extracted during cleanup.
- `docs/archive/`: historical phase notes retained for reference.

## Block Plan

1. Base cleanup: reduce `script.js`, organize docs, centralize text/encoding cleanup, and extract critical screens.
2. Product and UX: finalize MVP screens by role and remove prototype noise.
3. Security and backend: authentication, Supabase schema/RLS, and API hardening.
4. QA and deploy: smoke tests, deploy target, service worker validation, and final docs.

## Validation

Before merging a branch:

```powershell
node --check script.js
Get-ChildItem js -Recurse -Filter *.js | ForEach-Object { node --check $_.FullName }
```

Manual browser smoke checks:

- Client login opens `My Project` and only shows Client Portal/Reports navigation.
- Employee login opens `Mobile Workforce` and shows operational navigation.
- Owner login opens `Home` and shows the full menu.
