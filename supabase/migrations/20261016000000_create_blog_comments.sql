create table if not exists public.blog_comments (
  id uuid primary key default gen_random_uuid(),
  article_slug text not null check (article_slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  author_name text check (author_name is null or char_length(trim(author_name)) between 1 and 80),
  linkedin_url text,
  body text not null check (char_length(trim(body)) between 1 and 2000),
  created_at timestamptz not null default now(),
  constraint blog_comments_identity_pair check (
    (author_name is null and linkedin_url is null)
    or (author_name is not null and linkedin_url is not null)
  ),
  constraint blog_comments_linkedin_url check (
    linkedin_url is null
    or linkedin_url ~* '^https://(www\.)?linkedin\.com/(in|pub)/[^/?#]+/?$'
  )
);

create index if not exists blog_comments_article_created_idx
  on public.blog_comments (article_slug, created_at);

alter table public.blog_comments enable row level security;

create policy "Anyone can read blog comments"
  on public.blog_comments for select
  to anon, authenticated
  using (true);

create policy "Anyone can post blog comments"
  on public.blog_comments for insert
  to anon, authenticated
  with check (
    char_length(trim(body)) between 1 and 2000
    and (
      (author_name is null and linkedin_url is null)
      or (
        char_length(trim(author_name)) between 1 and 80
        and linkedin_url ~* '^https://(www\.)?linkedin\.com/(in|pub)/[^/?#]+/?$'
      )
    )
  );

grant select, insert on public.blog_comments to anon, authenticated;
