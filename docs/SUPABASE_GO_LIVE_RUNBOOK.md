# Supabase Go-Live Runbook

Use this runbook when you are ready to connect the project to the real Supabase environment before production deploy.

## 1. Login And Link

From the repository root:

```powershell
supabase login
supabase link --project-ref PROJECT_REF
```

Find `PROJECT_REF` in the Supabase dashboard URL:

```text
https://supabase.com/dashboard/project/PROJECT_REF
```

## 2. Configure Secrets

Set secrets in Supabase only. Do not commit real values.

```powershell
supabase secrets set META_WHATSAPP_TOKEN=...
supabase secrets set META_WHATSAPP_PHONE_NUMBER_ID=...
supabase secrets set GOOGLE_CLIENT_ID=...
supabase secrets set GOOGLE_CLIENT_SECRET=...
supabase secrets set GOOGLE_REFRESH_TOKEN=...
supabase secrets set PUSH_PROVIDER_SECRET=...
supabase secrets set OPENAI_API_KEY=...
supabase secrets set BACKEND_MODE=production
```

## 3. Deploy Edge Functions

```powershell
supabase functions deploy doublediamond-dispatch
supabase functions deploy send-whatsapp
supabase functions deploy send-gmail
supabase functions deploy send-push
supabase functions deploy run-automation
supabase functions deploy run-ai-command
```

## 4. Review And Apply RLS

Review first:

```powershell
notepad supabase\BLOCK3_RLS_PLAN.sql
```

Apply only after confirming table names and columns in the Supabase project:

```powershell
supabase db push
```

If you prefer manual SQL application, open Supabase SQL Editor and apply the contents of:

```text
supabase/BLOCK3_RLS_PLAN.sql
```

Important:

- Do not apply `SQL_V61_ROLE_EXPERIENCE.sql` for production.
- `SQL_V61_ROLE_EXPERIENCE.sql` is historical/demo SQL and contains public anon write policies.
- The production target is `supabase/BLOCK3_RLS_PLAN.sql`.

## 5. Configure Auth Metadata

Each Supabase Auth user must have metadata:

```json
{
  "company_id": "COMPANY_ID",
  "role": "owner"
}
```

Allowed roles:

- `owner`
- `employee`
- `client`

Recommended mapping:

- Owner users: `role=owner`
- Field staff: `role=employee`
- Customer portal users: `role=client`

## 6. Configure Frontend Runtime

Inject runtime config before `js/dd-config.js` in production hosting:

```html
<script>
window.DD_RUNTIME_CONFIG = {
  DEMO_MODE: false,
  SUPABASE_ANON_KEY: "PUBLIC_SUPABASE_ANON_KEY",
  BACKEND_ENDPOINTS: {
    default: "https://PROJECT_REF.supabase.co/functions/v1/doublediamond-dispatch",
    "whatsapp_message_queue.insert": "https://PROJECT_REF.supabase.co/functions/v1/send-whatsapp",
    "gmail_message_queue.insert": "https://PROJECT_REF.supabase.co/functions/v1/send-gmail",
    "push_notification_queue.insert": "https://PROJECT_REF.supabase.co/functions/v1/send-push",
    "automation_flow_runs.insert": "https://PROJECT_REF.supabase.co/functions/v1/run-automation",
    "ai_command_center_logs.insert": "https://PROJECT_REF.supabase.co/functions/v1/run-ai-command"
  }
};
</script>
```

Do not expose privileged Supabase server keys, provider tokens, OAuth client secrets, OpenAI keys, or webhook secrets in frontend runtime config.

## 7. Pre-Deploy Validation

Run locally:

```powershell
node tools/validate-release.js
```

Expected output includes:

```text
Release validation passed.
```

## 8. Production Smoke

After deploy, test these flows:

- Login with owner user through Supabase Auth.
- Login with employee user through Supabase Auth.
- Login with client user through Supabase Auth.
- Confirm staff PIN login is disabled when `DEMO_MODE=false`.
- Confirm Client navigation only shows Client Portal and Reports.
- Confirm Employee navigation shows field/operations routes.
- Confirm Owner navigation shows owner MVP routes.
- Trigger a backend-only action and confirm it reaches the configured Edge Function.
- Confirm browser console has no errors.
- Confirm service worker refreshes to the latest cache.

## 9. Rollback

If production auth/backend fails:

1. Revert frontend runtime config to omit `BACKEND_ENDPOINTS`.
2. Keep `DEMO_MODE=false` if real users exist.
3. Disable affected Edge Function routes in hosting config.
4. Restore previous deploy from the hosting provider.
5. Do not re-enable public anon write policies.

## Final Gate

The project is production-ready only when all of these are complete:

- Supabase CLI linked to the correct project.
- Secrets configured in Supabase.
- Edge Functions deployed.
- RLS reviewed and applied.
- Auth users have `company_id` and `role`.
- Frontend runtime config uses `DEMO_MODE=false`.
- Release validation passes.
- Production smoke passes.
