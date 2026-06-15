# Final Release Checklist

## Completed Blocks

- Block 1: base cleanup and critical screen extraction. Merged.
- Block 2: role-based MVP product/UX focus. Merged.
- Block 3: security, data contract, RLS plan, and backend boundary guardrails. Merged.
- Block 4: final QA/release documentation and release validator. Ready for review.

## Final Validation

Run:

```powershell
node tools/validate-release.js
```

This covers:

- `script.js` syntax.
- All `js/**/*.js` syntax.
- All `tools/**/*.js` syntax.
- MVP route scope validation.
- Security scope validation.
- Data contract validation.
- RLS plan validation.
- Backend boundary validation.

## Browser Smoke

Manual smoke target:

```text
http://127.0.0.1:4173/index.html?v=final-release
```

Required checks:

- Login shell renders without console errors.
- Client role shows Client Portal and Reports only.
- Employee role shows field/operations MVP routes.
- Owner role shows owner MVP routes.
- Staff demo PINs are not displayed in the UI.
- Backend-only browser writes return simulated/prepared responses until backend endpoints are connected.

## Production Follow-Up

- Apply Supabase Auth.
- Review and apply `supabase/BLOCK3_RLS_PLAN.sql`.
- Move backend-only queues/logs/integration writes to Edge Functions or backend API.
- Replace demo PIN access with real authentication.
- Run final deploy smoke after Netlify production publish.
