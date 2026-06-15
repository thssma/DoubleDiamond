# Backend/Auth Foundation

This cycle prepares the static frontend to hand privileged work to backend endpoints without storing secrets in the browser.

## Runtime Config

Inject `window.DD_RUNTIME_CONFIG` before `js/dd-config.js` to override production settings:

```html
<script>
window.DD_RUNTIME_CONFIG = {
  DEMO_MODE: false,
  SUPABASE_ANON_KEY: "public-anon-key",
  BACKEND_ENDPOINTS: {
    default: "https://example.supabase.co/functions/v1/doublediamond-dispatch",
    "whatsapp_message_queue.insert": "https://example.supabase.co/functions/v1/send-whatsapp"
  }
};
</script>
```

## Backend Boundary

- `js/dd-data-contract.js` marks backend-only tables.
- `js/dd-backend.js` resolves configured endpoints.
- `js/dd-api.js` sends backend-only writes to `DDBackend` when configured.
- If no endpoint exists, `DDApi` returns an explicit simulated `202` response and does not write directly to Supabase.

## Next Production Step

Create Supabase Edge Functions for:

- `whatsapp_message_queue`
- `gmail_message_queue`
- `push_notification_queue`
- `automation_flow_runs`
- `ai_command_center_logs`
- integration credentials, execution queue, and webhooks
