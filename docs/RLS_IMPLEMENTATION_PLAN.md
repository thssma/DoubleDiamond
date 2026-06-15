# RLS Implementation Plan

This is the production security target for the MVP data contract.

## Current State

- The static app still uses the Supabase anon key for demo access.
- `SQL_V61_ROLE_EXPERIENCE.sql` contains public anon write policies and should be treated as historical/demo SQL.
- `supabase/BLOCK3_RLS_PLAN.sql` is the new review target. It does not create anon write policies.

## Implementation Order

1. Add Supabase Auth and set `company_id` plus `role` in JWT metadata.
2. Apply helper functions from `supabase/BLOCK3_RLS_PLAN.sql`.
3. Enable RLS for MVP tables.
4. Apply authenticated read policies.
5. Apply staff/client insert policies only where needed by the MVP.
6. Apply owner-only policies for admin and settings flows.
7. Keep backend-only tables without browser write policies.
8. Move integration queues, webhook writes, AI logs, and provider sends behind Edge Functions or backend API.

## Backend-Only Tables

- `integration_credentials`
- `integration_execution_queue`
- `integration_webhooks`
- `whatsapp_message_queue`
- `gmail_message_queue`
- `push_notification_queue`
- `automation_flow_runs`
- `ai_command_center_logs`

## Validation

```powershell
node tools/validate-rls-plan.js
```

The validator blocks anon write policies and ensures backend-only tables do not get browser write policies in the Block 3 RLS plan.
