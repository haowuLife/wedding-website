insert into public.site_settings (key, value)
values
  (
    'site.identity',
    '{
      "groom": "吴昊",
      "bride": "王璐",
      "title": "吴昊 & 王璐",
      "subtitle": "诚邀您见证我们的婚礼"
    }'::jsonb
  ),
  (
    'site.wedding',
    '{
      "date": "2026-10-06T12:00:00+08:00",
      "displayDate": "2026.10.06",
      "lunarDate": "星期二 · 午宴",
      "ceremonyTime": "待确认",
      "receptionTime": "待确认",
      "city": "泰兴",
      "venue": "泰州泰兴希尔顿欢朋酒店",
      "address": "江苏省泰州市泰兴市文昌中路1号",
      "mapUrl": "https://uri.amap.com/search?keyword=%E6%B3%B0%E5%B7%9E%E6%B3%B0%E5%85%B4%E5%B8%8C%E5%B0%94%E9%A1%BF%E6%AC%A2%E6%9C%8B%E9%85%92%E5%BA%97",
      "hotelUrl": "https://www.hilton.com/zh-hans/hotels/ytytxhx-hampton-taizhou-taixing/"
    }'::jsonb
  )
on conflict (key) do update
set
  value = excluded.value,
  updated_at = now();
