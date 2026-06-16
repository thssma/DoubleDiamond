-- Remote go-live RLS script for the current DoubleDiamond Supabase schema.
-- This script is idempotent and targets MVP/backend-only tables used by the app.

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

grant usage on schema app_private to authenticated;
grant execute on function app_private.jwt_company_id() to authenticated;
grant execute on function app_private.jwt_role() to authenticated;
grant execute on function app_private.is_owner() to authenticated;
grant execute on function app_private.is_staff() to authenticated;

-- Normalize company scoping columns required by production RLS.
alter table projects add column if not exists company_id text;
alter table project_timeline add column if not exists company_id text;
alter table route_stops add column if not exists company_id text;
alter table team_checkins add column if not exists company_id text;
alter table bi_snapshots add column if not exists company_id text;
alter table work_order_logs add column if not exists company_id text;

update project_timeline pt
set company_id = p.company_id
from projects p
where pt.company_id is null
  and pt.project_id::text = p.id::text
  and p.company_id is not null;

update route_stops rs
set company_id = rp.company_id
from route_plans rp
where rs.company_id is null
  and rs.route_id::text = rp.id::text
  and rp.company_id is not null;

update work_order_logs wol
set company_id = wo.company_id
from work_orders wo
where wol.company_id is null
  and wol.work_order_id::text = wo.id::text
  and wo.company_id is not null;

update team_checkins tc
set company_id = p.company_id
from projects p
where tc.company_id is null
  and tc.project_id::text = p.id::text
  and p.company_id is not null;

do $$
declare
  table_name text;
  policy_record record;
  target_tables text[] := array[
    'companies',
    'projects',
    'company_users',
    'field_photos',
    'field_signatures',
    'report_center_exports',
    'work_orders',
    'work_order_logs',
    'project_timeline',
    'gps_checkins',
    'route_plans',
    'route_stops',
    'weather_alerts',
    'pwa_settings',
    'offline_cache_items',
    'push_notification_templates',
    'mobile_workforce_tasks',
    'team_checkins',
    'bi_snapshots',
    'profitability_records',
    'executive_kpi_snapshots',
    'integration_providers',
    'integration_connections',
    'integration_logs',
    'user_profiles',
    'role_experience_settings',
    'role_activity_logs',
    'integration_credentials',
    'integration_execution_queue',
    'integration_webhooks',
    'whatsapp_message_queue',
    'gmail_message_queue',
    'push_notification_queue',
    'automation_flow_runs',
    'ai_command_center_logs'
  ];
begin
  foreach table_name in array target_tables loop
    execute format('alter table if exists public.%I enable row level security', table_name);

    for policy_record in
      select policyname
      from pg_policies
      where schemaname = 'public'
        and tablename = table_name
        and (
          policyname like 'Allow public %'
          or policyname like 'company scoped %'
          or policyname like 'staff write %'
          or policyname like 'authenticated write %'
          or policyname like 'owner manage %'
          or policyname like 'authenticated read %'
        )
    loop
      execute format('drop policy if exists %I on public.%I', policy_record.policyname, table_name);
    end loop;
  end loop;
end $$;

create policy "authenticated read integration providers"
on integration_providers for select to authenticated using (true);

create policy "company scoped read companies"
on companies for select to authenticated
using (id::text = app_private.jwt_company_id() or app_private.is_owner());

create policy "company scoped read projects"
on projects for select to authenticated
using (company_id = app_private.jwt_company_id() or app_private.is_owner());

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

create policy "company scoped read work order logs"
on work_order_logs for select to authenticated
using (company_id = app_private.jwt_company_id() or app_private.is_owner());

create policy "company scoped read project timeline"
on project_timeline for select to authenticated
using (company_id = app_private.jwt_company_id() or app_private.is_owner());

create policy "company scoped read route plans"
on route_plans for select to authenticated
using (company_id::text = app_private.jwt_company_id() or app_private.is_owner());

create policy "company scoped read route stops"
on route_stops for select to authenticated
using (company_id = app_private.jwt_company_id() or app_private.is_owner());

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
using (company_id = app_private.jwt_company_id() or app_private.is_owner());

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
using (company_id = app_private.jwt_company_id() or app_private.is_owner());

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

create policy "staff write field photos"
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
with check (app_private.is_staff() and (company_id = app_private.jwt_company_id() or company_id is null));

create policy "staff write routes"
on route_plans for insert to authenticated
with check (app_private.is_staff() and company_id::text = app_private.jwt_company_id());

create policy "staff write route stops"
on route_stops for insert to authenticated
with check (app_private.is_staff() and (company_id = app_private.jwt_company_id() or company_id is null));

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
with check (app_private.is_staff() and (company_id = app_private.jwt_company_id() or company_id is null));

create policy "staff write report exports"
on report_center_exports for insert to authenticated
with check (app_private.is_staff() and company_id::text = app_private.jwt_company_id());

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
