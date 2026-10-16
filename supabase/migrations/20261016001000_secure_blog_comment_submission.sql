alter table public.blog_comments
  add column if not exists is_approved boolean not null default false;

drop policy if exists "Anyone can read blog comments" on public.blog_comments;
drop policy if exists "Anyone can post blog comments" on public.blog_comments;

create policy "Anyone can read approved blog comments"
  on public.blog_comments for select
  to anon, authenticated
  using (is_approved = true);

revoke insert, update, delete on public.blog_comments from anon, authenticated;
grant select on public.blog_comments to anon, authenticated;
grant select, insert on public.blog_comments to service_role;

create table if not exists public.blog_comment_rate_limits (
  fingerprint text primary key check (fingerprint ~ '^[0-9a-f]{64}$'),
  window_started_at timestamptz not null,
  request_count integer not null check (request_count > 0)
);

alter table public.blog_comment_rate_limits enable row level security;
revoke all on public.blog_comment_rate_limits from public, anon, authenticated;

create or replace function public.consume_blog_comment_rate_limit(p_fingerprint text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  allowed boolean;
begin
  if p_fingerprint !~ '^[0-9a-f]{64}$' then
    return false;
  end if;

  insert into public.blog_comment_rate_limits as bucket (fingerprint, window_started_at, request_count)
  values (p_fingerprint, now(), 1)
  on conflict (fingerprint) do update
  set
    window_started_at = case
      when bucket.window_started_at <= now() - interval '15 minutes' then now()
      else bucket.window_started_at
    end,
    request_count = case
      when bucket.window_started_at <= now() - interval '15 minutes' then 1
      else bucket.request_count + 1
    end
  returning request_count <= 5 into allowed;

  return allowed;
end;
$$;

revoke all on function public.consume_blog_comment_rate_limit(text) from public, anon, authenticated;
grant execute on function public.consume_blog_comment_rate_limit(text) to service_role;
