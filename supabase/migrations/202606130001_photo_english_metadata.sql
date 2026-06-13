alter table public.photos
  add column if not exists title_en text
    check (title_en is null or char_length(title_en) between 1 and 120),
  add column if not exists description_en text
    check (description_en is null or char_length(description_en) <= 500);
