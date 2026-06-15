-- Block 3 RLS plan for the MVP data contract.
-- Review in Supabase before applying. This file intentionally avoids anon write policies.

-- Expected JWT app_metadata:
-- {
--   "company_id": "company uuid/text",
--   "role": "owner" | "employee" | "client"
-- }

create schema if not exists app_private;

create or replace function app_private.jwt_company_id()
returns text
language sql
stable
as $$
  select coalesce(
    nullif(auth.jwt() -> 'app_metadata' ->> 'company_id', ''),
    nullif(auth.jwt() -> 'user_metadata' ->> 'company_id', '')
  );
$$;

create or replace function app_private.jwt_role()
returns text
language sql
stable
as $$
  select coalesce(
    nullif(auth.jwt() -> 'app_metadata' ->> 'role', ''),
    nullif(auth.jwt() -> 'user_metadata' ->> 'role', ''),
    'client'
  );
$$;

create or replace function app_private.is_owner()
returns boolean
language sql
stable
as $$
  select app_private.jwt_role() = 'owner';
$$;

create or replace function app_private.is_staff()
returns boolean
language sql
stable
as $$
  select app_private.jwt_role() in ('owner', 'employee');
$$;

-- MVP tables from js/dd-data-contract.js.
alter table companies enable row level security;
alter table projects enable row level security;
alter table company_users enable row level security;
alter table field_photos enable row level security;
alter table field_signatures enable row level security;
alter table report_center_exports enable row level security;
alter table work_orders enable row level security;
alter table work_order_logs enable row level security;
alter table project_timeline enable row level security;
alter table gps_checkins enable row level security;
alter table route_plans enable row level security;
alter table route_stops enable row level security;
alter table weather_alerts enable row level security;
alter table pwa_settings enable row level security;
alter table offline_cache_items enable row level security;
alter table push_notification_templates enable row level security;
alter table mobile_workforce_tasks enable row level security;
alter table team_checkins enable row level security;
alter table bi_snapshots enable row level security;
alter table profitability_records enable row level security;
alter table executive_kpi_snapshots enable row level security;
alter table integration_providers enable row level security;
alter table integration_connections enable row level security;
alter table integration_logs enable row level security;
alter table user_profiles enable row level security;
alter table role_experience_settings enable row level security;
alter table role_activity_logs enable row level security;

-- Backend-only tables: no browser write policy should be created.
alter table integration_credentials enable row level security;
alter table integration_execution_queue enable row level security;
alter table integration_webhooks enable row level security;
alter table whatsapp_message_queue enable row level security;
alter table gmail_message_queue enable row level security;
alter table push_notification_queue enable row level security;
alter table automation_flow_runs enable row level security;
alter table ai_command_center_logs enable row level security;

-- Public metadata that can be read after authentication.
create policy "authenticated read integration providers"
on integration_providers for select to authenticated using (true);

-- Company-scoped reads.
create policy "company scoped read companies"
on companies for select to authenticated
using (id::text = app_private.jwt_company_id() or app_private.is_owner());

create policy "company scoped read projects"
on projects for select to authenticated
using (company_id::text = app_private.jwt_company_id() or app_private.is_owner());

create policy "company scoped read company users"
on company_users for select to authenticated
using (company_id::text = app_private.jwt_company_id() or app_private.is_owner());

create policy "company scoped read field photos"
on field_photos for select to authenticated
using (company_id::text = app_private.jwt_company_id() or app_private.is_owner());

create policy "company scoped read field signatures"
on field_signatures for select to authenticated
using (company_id::text = app_private.jwt_company_id() or app_private.is_owner());

create policy "company scoped read report exports"
on report_center_exports for select to authenticated
using (company_id::text = app_private.jwt_company_id() or app_private.is_owner());

create policy "company scoped read work orders"
on work_orders for select to authenticated
using (company_id::text = app_private.jwt_company_id() or app_private.is_owner());

create policy "company scoped read project timeline"
on project_timeline for select to authenticated
using (company_id::text = app_private.jwt_company_id() or app_private.is_owner());

create policy "company scoped read route plans"
on route_plans for select to authenticated
using (company_id::text = app_private.jwt_company_id() or app_private.is_owner());

create policy "company scoped read route stops"
on route_stops for select to authenticated
using (company_id::text = app_private.jwt_company_id() or app_private.is_owner());

create policy "company scoped read weather alerts"
on weather_alerts for select to authenticated
using (company_id::text = app_private.jwt_company_id() or app_private.is_owner());

create policy "company scoped read mobile tasks"
on mobile_workforce_tasks for select to authenticated
using (company_id::text = app_private.jwt_company_id() or app_private.is_owner());

create policy "company scoped read gps checkins"
on gps_checkins for select to authenticated
using (company_id::text = app_private.jwt_company_id() or app_private.is_owner());

create policy "company scoped read team checkins"
on team_checkins for select to authenticated
using (company_id::text = app_private.jwt_company_id() or app_private.is_owner());

create policy "company scoped read pwa settings"
on pwa_settings for select to authenticated
using (company_id::text = app_private.jwt_company_id() or app_private.is_owner());

create policy "company scoped read offline cache"
on offline_cache_items for select to authenticated
using (company_id::text = app_private.jwt_company_id() or app_private.is_owner());

create policy "company scoped read push templates"
on push_notification_templates for select to authenticated
using (company_id::text = app_private.jwt_company_id() or app_private.is_owner());

create policy "company scoped read bi snapshots"
on bi_snapshots for select to authenticated
using (company_id::text = app_private.jwt_company_id() or app_private.is_owner());

create policy "company scoped read profitability"
on profitability_records for select to authenticated
using (company_id::text = app_private.jwt_company_id() or app_private.is_owner());

create policy "company scoped read executive kpis"
on executive_kpi_snapshots for select to authenticated
using (company_id::text = app_private.jwt_company_id() or app_private.is_owner());

create policy "company scoped read integration connections"
on integration_connections for select to authenticated
using (company_id::text = app_private.jwt_company_id() or app_private.is_owner());

create policy "company scoped read integration logs"
on integration_logs for select to authenticated
using (company_id::text = app_private.jwt_company_id() or app_private.is_owner());

create policy "company scoped read role activity"
on role_activity_logs for select to authenticated
using (company_id::text = app_private.jwt_company_id() or app_private.is_owner());

-- Staff/client writes used by the MVP. Production should still prefer backend endpoints for audit-heavy flows.
create policy "staff write field operations"
on field_photos for insert to authenticated
with check (app_private.is_staff() and company_id::text = app_private.jwt_company_id());

create policy "authenticated write field signatures"
on field_signatures for insert to authenticated
with check (company_id::text = app_private.jwt_company_id() or app_private.is_owner());

create policy "staff write work orders"
on work_orders for insert to authenticated
with check (app_private.is_staff() and company_id::text = app_private.jwt_company_id());

create policy "staff write work order logs"
on work_order_logs for insert to authenticated
with check (app_private.is_staff());

create policy "staff write routes"
on route_plans for insert to authenticated
with check (app_private.is_staff() and company_id::text = app_private.jwt_company_id());

create policy "staff write route stops"
on route_stops for insert to authenticated
with check (app_private.is_staff() and company_id::text = app_private.jwt_company_id());

create policy "staff write weather alerts"
on weather_alerts for insert to authenticated
with check (app_private.is_staff() and company_id::text = app_private.jwt_company_id());

create policy "staff write mobile tasks"
on mobile_workforce_tasks for insert to authenticated
with check (app_private.is_staff() and company_id::text = app_private.jwt_company_id());

create policy "staff write gps checkins"
on gps_checkins for insert to authenticated
with check (app_private.is_staff() and company_id::text = app_private.jwt_company_id());

create policy "staff write team checkins"
on team_checkins for insert to authenticated
with check (app_private.is_staff() and company_id::text = app_private.jwt_company_id());

create policy "staff write report exports"
on report_center_exports for insert to authenticated
with check (app_private.is_staff() and company_id::text = app_private.jwt_company_id());

-- Owner-only mutations.
create policy "owner manage companies"
on companies for all to authenticated
using (app_private.is_owner())
with check (app_private.is_owner());

create policy "owner manage company users"
on company_users for all to authenticated
using (app_private.is_owner())
with check (app_private.is_owner());

create policy "owner manage pwa settings"
on pwa_settings for all to authenticated
using (app_private.is_owner())
with check (app_private.is_owner());

create policy "owner manage offline cache"
on offline_cache_items for all to authenticated
using (app_private.is_owner())
with check (app_private.is_owner());

create policy "owner manage push templates"
on push_notification_templates for all to authenticated
using (app_private.is_owner())
with check (app_private.is_owner());

create policy "owner manage profitability"
on profitability_records for all to authenticated
using (app_private.is_owner())
with check (app_private.is_owner());

create policy "owner manage bi snapshots"
on bi_snapshots for all to authenticated
using (app_private.is_owner())
with check (app_private.is_owner());

create policy "owner manage executive kpis"
on executive_kpi_snapshots for all to authenticated
using (app_private.is_owner())
with check (app_private.is_owner());

create policy "owner manage integration connections"
on integration_connections for all to authenticated
using (app_private.is_owner())
with check (app_private.is_owner());

create policy "owner manage user profiles"
on user_profiles for all to authenticated
using (app_private.is_owner())
with check (app_private.is_owner());

create policy "owner manage role experience settings"
on role_experience_settings for all to authenticated
using (app_private.is_owner())
with check (app_private.is_owner());
