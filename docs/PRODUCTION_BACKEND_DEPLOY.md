# Production Backend Deploy

This repository includes Supabase Edge Function scaffolds for backend-only operations. They are safe to version because no secrets are committed.

## Functions

- `doublediamond-dispatch`: generic backend-only dispatcher.
- `send-whatsapp`: WhatsApp queue dispatcher.
- `send-gmail`: Gmail queue dispatcher.
- `send-push`: push notification dispatcher.
- `run-automation`: automation runner dispatcher.
- `run-ai-command`: AI command dispatcher.

## Required Auth Metadata

Set these values in Supabase Auth JWT metadata:

- `company_id`
- `role`: `owner`, `employee`, or `client`

## Required Secrets

Set secrets in Supabase, not in frontend code:

```powershell
supabase secrets set META_WHATSAPP_TOKEN=...
supabase secrets set META_WHATSAPP_PHONE_NUMBER_ID=...
supabase secrets set GOOGLE_CLIENT_ID=...
supabase secrets set GOOGLE_CLIENT_SECRET=...
supabase secrets set GOOGLE_REFRESH_TOKEN=...
supabase secrets set PUSH_PROVIDER_SECRET=...
supabase secrets set OPENAI_API_KEY=...
```

Optional:

```powershell
supabase secrets set BACKEND_MODE=production
```

## Deploy

```powershell
supabase functions deploy doublediamond-dispatch
supabase functions deploy send-whatsapp
supabase functions deploy send-gmail
supabase functions deploy send-push
supabase functions deploy run-automation
supabase functions deploy run-ai-command
```

## Frontend Runtime Config

Inject before `js/dd-config.js`:

```html
<script>
window.DD_RUNTIME_CONFIG = {
  DEMO_MODE: false,
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

## Validation

```powershell
node tools/validate-edge-functions.js
node tools/validate-release.js
```
