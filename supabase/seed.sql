insert into public.site_settings (key, value)
values
  ('site.identity', '{"groom":"陈屿","bride":"林晚"}'::jsonb),
  ('site.wedding', '{"date":"2026-10-18T10:28:00+08:00","venue":"杭州木守西溪酒店"}'::jsonb),
  ('gallery.access', '{"enabled":false}'::jsonb),
  ('memories.enabled', '{"enabled":false}'::jsonb)
on conflict (key) do update set value = excluded.value;
