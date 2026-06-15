# DoubleDiamond

Static frontend for the DoubleDiamond field service and client portal application.

## Current Scope

- Client portal for project progress, reports, photos, timeline, approvals, and signatures.
- Employee field workflow for work orders, routes, check-ins, photo upload, and mobile operations.
- Owner command center for operational, client, field, reporting, integration, and business performance controls.

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
- `js/ui/`: UI behavior modules for role UX, text cleanup, and MVP navigation.
- `docs/MVP_SCOPE.md`: role-based MVP scope for Product/UX work.
- `docs/BLOCK2_QA_CHECKLIST.md`: QA checklist for the Product/UX block.
- `docs/BLOCK3_SECURITY_DATA.md`: security/data guardrails and backend readiness scope.
- `docs/DATA_ACCESS_MATRIX.md`: MVP table access map for frontend, RLS, and backend work.
- `docs/RLS_IMPLEMENTATION_PLAN.md`: Supabase Auth/RLS rollout plan for production.
- `docs/archive/`: historical phase notes retained for reference.

## Block Plan

1. Base cleanup: reduce `script.js`, organize docs, centralize text/encoding cleanup, and extract critical screens. Status: merged.
2. Product and UX: finalize MVP screens by role and remove prototype noise. Status: merged.
3. Security and backend: authentication, Supabase schema/RLS, and API hardening. Status: ready for review.
4. QA and deploy: smoke tests, deploy target, service worker validation, and final docs.

## Validation

Before merging a branch:

```powershell
node --check script.js
Get-ChildItem js -Recurse -Filter *.js | ForEach-Object { node --check $_.FullName }
node tools/validate-mvp-scope.js
node tools/validate-security-scope.js
node tools/validate-data-contract.js
node tools/validate-rls-plan.js
node tools/validate-backend-boundary.js
```

Manual browser smoke checks:

- Client login opens `My Project` and only shows Client Portal/Reports navigation.
- Employee login opens `Mobile Workforce` and shows operational navigation.
- Owner login opens `Home` and shows the focused MVP owner menu.
