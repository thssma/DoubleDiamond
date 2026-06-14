# Data Access Matrix

This matrix defines the current data contract for the Block 2 MVP routes. It does not remove legacy tables yet; it marks what the visible MVP needs and what must move behind backend/RLS before production.

## Access Levels

- `read`: frontend can read with anon access only when RLS limits rows to the current role/company/project.
- `write`: frontend currently writes demo data, but production must require authenticated user context and RLS.
- `owner-write`: owner-only mutation. Production must require authenticated owner/admin role.
- `backend-only`: should not be written directly by the browser in production.

## Role Summary

- Client routes: `clientHome`, `reportCenter`.
- Employee routes: operational field routes, work orders, routes, weather, mobile/PWA, reports.
- Owner routes: client management, operations, finance/BI, executive, integrations, settings.

## Backend-Required Tables

These tables are high risk if directly writable from the browser:

- `integration_credentials`
- `integration_execution_queue`
- `integration_webhooks`
- `whatsapp_message_queue`
- `gmail_message_queue`
- `push_notification_queue`
- `automation_flow_runs`
- `ai_command_center_logs`

## Source Of Truth

The executable contract lives in `js/dd-data-contract.js` and is validated by:

```powershell
node tools/validate-data-contract.js
```
