# Block 3 Security And Data Scope

This block keeps the current static frontend architecture, but adds guardrails for security and backend readiness.

## Current Decisions

- Supabase anon access remains browser-side for the current static build.
- No service-role key, OpenAI key, payment secret, webhook signing secret, or third-party private token may be committed to frontend files.
- Staff PINs remain demo-only and are centralized through `DDConfig.DEMO_PINS`.
- Runtime overrides can be injected with `window.DD_RUNTIME_CONFIG` before `js/dd-config.js` loads.
- Browser persistence should go through `DDStorage` for new code.
- Table names and record ids are validated/encoded in `DDApi` before Supabase REST calls.
- MVP table access is tracked in `js/dd-data-contract.js` and summarized in `docs/DATA_ACCESS_MATRIX.md`.
- The production RLS target is documented in `docs/RLS_IMPLEMENTATION_PLAN.md` and drafted in `supabase/BLOCK3_RLS_PLAN.sql`.

## Production Backend Requirements

- Replace demo PIN login with Supabase Auth or a backend session flow.
- Move privileged writes and third-party integrations to backend endpoints or Supabase Edge Functions.
- Enable and verify RLS policies for every table used by role-specific screens.
- Keep only public anon configuration in the frontend.
- Add server-side audit logging for sensitive mutations.

## Validation

Run before merging this block:

```powershell
node --check script.js
Get-ChildItem js -Recurse -Filter *.js | ForEach-Object { node --check $_.FullName }
node tools/validate-mvp-scope.js
node tools/validate-security-scope.js
node tools/validate-data-contract.js
node tools/validate-rls-plan.js
```
