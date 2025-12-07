# Настройка Supabase для Semantica CRM

Этот проект сейчас работает **полностью на мок-данных и локальном состоянии** (offline-first). 
После настройки Supabase все экраны `/admin` начнут работать с реальной базой.

## 1. Переменные окружения

В корне проекта создайте файл `.env.local` (если его ещё нет) и добавьте туда:

```env
NEXT_PUBLIC_SUPABASE_URL="https://YOUR_PROJECT_ID.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_ANON_KEY"
SUPABASE_SERVICE_ROLE_KEY="YOUR_SERVICE_ROLE_KEY"
```

- `NEXT_PUBLIC_SUPABASE_URL` и `NEXT_PUBLIC_SUPABASE_ANON_KEY` берутся из Settings → API → Project URL / anon key.
- `SUPABASE_SERVICE_ROLE_KEY` нужен **только для миграций/серверного кода**, не используйте его на клиенте.

## 2. Создание схемы базы данных

Перейдите в Supabase → **SQL editor** и выполните по очереди следующие блоки.

### 2.1. Таблица lead_stages (справочник стадий)

```sql
create table if not exists public.lead_stages (
  id text primary key,
  name text not null,
  sort_order int not null
);

insert into public.lead_stages (id, name, sort_order) values
  ('new', 'Новые', 10),
  ('qualification', 'Квалификация', 20),
  ('proposal', 'Коммерческое предложение', 30),
  ('negotiation', 'Переговоры', 40),
  ('in_work', 'В работе', 50),
  ('won', 'Сделка закрыта', 60),
  ('lost', 'Отказ', 70)
  on conflict (id) do nothing;
```

### 2.2. Таблица leads

```sql
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,

  name text not null,
  phone text not null,
  email text,
  company text,
  telegram_id bigint,
  telegram_username text,
  category text,
  potential_amount numeric,
  stage text not null references public.lead_stages(id),
  tags text[] default array[]::text[],
  notes text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_leads_owner_id on public.leads(owner_id);
create index if not exists idx_leads_stage on public.leads(stage);
```

### 2.3. Таблица lead_tasks

```sql
create table if not exists public.lead_tasks (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  lead_id uuid not null references public.leads(id) on delete cascade,

  title text not null,
  description text,
  due_date timestamptz,
  completed boolean not null default false,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_lead_tasks_owner_id on public.lead_tasks(owner_id);
create index if not exists idx_lead_tasks_lead_id on public.lead_tasks(lead_id);
```

### 2.4. Таблица lead_history

```sql
create table if not exists public.lead_history (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  lead_id uuid not null references public.leads(id) on delete cascade,

  type text not null,
  data jsonb,

  created_at timestamptz not null default now()
);

create index if not exists idx_lead_history_owner_id on public.lead_history(owner_id);
create index if not exists idx_lead_history_lead_id on public.lead_history(lead_id);
```

### 2.5. Таблицы projects и project_tasks

```sql
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  lead_id uuid references public.leads(id) on delete set null,

  name text not null,
  status text not null default 'active',
  budget numeric,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_projects_owner_id on public.projects(owner_id);

create table if not exists public.project_tasks (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,

  title text not null,
  description text,
  status text not null default 'todo',
  time_spent_minutes int not null default 0,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_project_tasks_owner_id on public.project_tasks(owner_id);
create index if not exists idx_project_tasks_project_id on public.project_tasks(project_id);
```

### 2.6. Таблицы payments и expenses

```sql
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  lead_id uuid references public.leads(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,

  amount numeric not null,
  currency text not null default 'RUB',
  type text not null check (type in ('income', 'refund')),

  paid_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists idx_payments_owner_id on public.payments(owner_id);

create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,

  category text not null,
  amount numeric not null,
  currency text not null default 'RUB',
  spent_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists idx_expenses_owner_id on public.expenses(owner_id);
```

### 2.7. Таблица documents

```sql
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  lead_id uuid references public.leads(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,

  bucket text not null,
  path text not null,
  filename text not null,
  mime_type text,
  size_bytes bigint,

  created_at timestamptz not null default now()
);

create index if not exists idx_documents_owner_id on public.documents(owner_id);
```

### 2.8. Таблица message_templates

```sql
create table if not exists public.message_templates (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,

  title text not null,
  channel text check (channel in ('telegram', 'whatsapp', 'email')),
  body text not null,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_message_templates_owner_id on public.message_templates(owner_id);
```

## 3. Включение RLS и политики

Во всех таблицах мы хотим видеть **только свои данные**, по `owner_id = auth.uid()`.

### 3.1. Включаем RLS

```sql
alter table public.leads enable row level security;
alter table public.lead_tasks enable row level security;
alter table public.lead_history enable row level security;
alter table public.projects enable row level security;
alter table public.project_tasks enable row level security;
alter table public.payments enable row level security;
alter table public.expenses enable row level security;
alter table public.documents enable row level security;
alter table public.message_templates enable row level security;
```

### 3.2. Политики для owner_id

```sql
create policy "leads_select_own" on public.leads
  for select using (owner_id = auth.uid());

create policy "leads_modify_own" on public.leads
  for all using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create policy "lead_tasks_own" on public.lead_tasks
  for all using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create policy "lead_history_own" on public.lead_history
  for all using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create policy "projects_own" on public.projects
  for all using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create policy "project_tasks_own" on public.project_tasks
  for all using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create policy "payments_own" on public.payments
  for all using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create policy "expenses_own" on public.expenses
  for all using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create policy "documents_own" on public.documents
  for all using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create policy "message_templates_own" on public.message_templates
  for all using (owner_id = auth.uid())
  with check (owner_id = auth.uid());
```

## 4. Storage (документы)

1. Перейдите в Supabase → **Storage** → **Create bucket**.
2. Название бакета, например: `crm-documents`.
3. Тип доступа: **Private**.
4. После создания выполните SQL-политику для доступа только к своим файлам:

```sql
create policy "documents_bucket_own" on storage.objects
  for all using (
    bucket_id = 'crm-documents'
    and auth.role() = 'authenticated'
  );
```

В коде бакет ожидается под именем `crm-documents` (при желании можно поменять в конфиге).

## 5. Как это свяжется с текущим кодом

- Файл `lib/supabase-client.ts` использует `NEXT_PUBLIC_SUPABASE_URL` и `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
  - Если они **не заданы** → используется мок-клиент и все экраны `/admin` работают на локальных мок-данных.
  - Если заданы → создаётся реальный Supabase client, и можно постепенно переводить сторы с моков на реальные таблицы.
- Типы и схемы в `types/supabase.ts` соответствуют структуре таблиц выше.
- Моки в `mocks/leads.ts` повторяют структуру таблицы `leads` и `lead_tasks`.

## 6. Проверка после настройки

1. Заполните `.env.local` своими ключами Supabase.
2. Прогоните SQL из разделов 2–4 в Supabase SQL editor.
3. Локально выполните:

```bash
npm install
npm run dev
```

4. Откройте `/admin` — всё должно продолжить работать (пока ещё на моках).
5. Дальше можно поэтапно заменять обращения к мокам (файлы `mocks/*`, `lib/leads-store.ts`) на реальные запросы к Supabase через `getSupabaseClient()`.
