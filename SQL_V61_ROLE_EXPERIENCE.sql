
create table if not exists user_profiles (
  id uuid primary key default gen_random_uuid(),
  company_id text,
  user_name text,
  user_email text,
  role text default 'owner',
  status text default 'Active',
  created_at timestamptz default now()
);

create table if not exists role_experience_settings (
  id uuid primary key default gen_random_uuid(),
  role text,
  home_title text,
  home_subtitle text,
  allowed_routes jsonb,
  status text default 'Active',
  created_at timestamptz default now()
);

create table if not exists role_activity_logs (
  id uuid primary key default gen_random_uuid(),
  company_id text,
  user_role text,
  action_name text,
  action_details text,
  created_at timestamptz default now()
);

alter table user_profiles enable row level security;
alter table role_experience_settings enable row level security;
alter table role_activity_logs enable row level security;

drop policy if exists "Allow public read user_profiles" on user_profiles;
drop policy if exists "Allow public insert user_profiles" on user_profiles;
drop policy if exists "Allow public update user_profiles" on user_profiles;
drop policy if exists "Allow public delete user_profiles" on user_profiles;

drop policy if exists "Allow public read role_experience_settings" on role_experience_settings;
drop policy if exists "Allow public insert role_experience_settings" on role_experience_settings;
drop policy if exists "Allow public update role_experience_settings" on role_experience_settings;
drop policy if exists "Allow public delete role_experience_settings" on role_experience_settings;

drop policy if exists "Allow public read role_activity_logs" on role_activity_logs;
drop policy if exists "Allow public insert role_activity_logs" on role_activity_logs;
drop policy if exists "Allow public update role_activity_logs" on role_activity_logs;
drop policy if exists "Allow public delete role_activity_logs" on role_activity_logs;

create policy "Allow public read user_profiles" on user_profiles for select to anon using (true);
create policy "Allow public insert user_profiles" on user_profiles for insert to anon with check (true);
create policy "Allow public update user_profiles" on user_profiles for update to anon using (true) with check (true);
create policy "Allow public delete user_profiles" on user_profiles for delete to anon using (true);

create policy "Allow public read role_experience_settings" on role_experience_settings for select to anon using (true);
create policy "Allow public insert role_experience_settings" on role_experience_settings for insert to anon with check (true);
create policy "Allow public update role_experience_settings" on role_experience_settings for update to anon using (true) with check (true);
create policy "Allow public delete role_experience_settings" on role_experience_settings for delete to anon using (true);

create policy "Allow public read role_activity_logs" on role_activity_logs for select to anon using (true);
create policy "Allow public insert role_activity_logs" on role_activity_logs for insert to anon with check (true);
create policy "Allow public update role_activity_logs" on role_activity_logs for update to anon using (true) with check (true);
create policy "Allow public delete role_activity_logs" on role_activity_logs for delete to anon using (true);

insert into role_experience_settings (role, home_title, home_subtitle, allowed_routes)
values
('owner', 'Business Command Center', 'Gestão completa da empresa, operação, financeiro, BI e IA.', '["dashboard","fieldDashboard","workOrders","biDashboard","executiveIntelligence","aiOperationsCommand","billingDashboard","mapsReal","whatsappReal","gmailReal","configuracoes"]'::jsonb),
('employee', 'Meu Trabalho Hoje', 'Ordens, rotas, check-in, fotos, clima e execução em campo.', '["employeeHome","workOrders","routePlanning","weatherCenter","mobileWorkforce","fieldDashboard"]'::jsonb),
('client', 'Meu Projeto', 'Projetos, ordens, fotos, relatórios, pagamentos e mensagens.', '["clientHome","workOrders","reportCenter","billingDashboard"]'::jsonb);
