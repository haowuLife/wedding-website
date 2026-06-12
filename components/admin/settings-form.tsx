"use client";

import { FormEvent, useState } from "react";

import type { SiteContent } from "@/lib/content/site";

export function SettingsForm({ content }: { content: SiteContent }) {
  const [status, setStatus] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("保存中...");
    const form = new FormData(event.currentTarget);
    const updates = [
      {
        key: "site.identity",
        value: {
          groom: form.get("groom"),
          bride: form.get("bride"),
          title: `${form.get("groom")} & ${form.get("bride")}`,
          subtitle: form.get("subtitle"),
        },
      },
      {
        key: "site.wedding",
        value: {
          date: form.get("date"),
          venue: form.get("venue"),
          address: form.get("address"),
          ceremonyTime: form.get("ceremonyTime"),
          receptionTime: form.get("receptionTime"),
        },
      },
      {
        key: "site.hero",
        value: {
          image: form.get("heroImage"),
        },
      },
      {
        key: "memories.enabled",
        value: { enabled: form.get("memoriesEnabled") === "on" },
      },
    ];
    for (const update of updates) {
      const response = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(update),
      });
      if (!response.ok) {
        setStatus("保存失败");
        return;
      }
    }
    setStatus("已保存");
  }

  const { identity, wedding } = content;
  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 grid gap-6 rounded-2xl bg-white p-6 md:grid-cols-2"
    >
      <AdminField label="新郎姓名" name="groom" defaultValue={identity.groom} />
      <AdminField label="新娘姓名" name="bride" defaultValue={identity.bride} />
      <div className="md:col-span-2">
        <AdminField
          label="首页副标题"
          name="subtitle"
          defaultValue={identity.subtitle}
        />
      </div>
      <div className="md:col-span-2">
        <AdminField
          label="首页主视觉图片 URL"
          name="heroImage"
          type="text"
          defaultValue={content.hero.image}
        />
      </div>
      <AdminField
        label="婚礼日期时间"
        name="date"
        type="datetime-local"
        defaultValue={wedding.date.slice(0, 16)}
      />
      <AdminField
        label="仪式时间"
        name="ceremonyTime"
        type="time"
        defaultValue={wedding.ceremonyTime}
      />
      <AdminField
        label="午宴时间"
        name="receptionTime"
        type="time"
        defaultValue={wedding.receptionTime}
      />
      <AdminField label="酒店名称" name="venue" defaultValue={wedding.venue} />
      <div className="md:col-span-2">
        <AdminField
          label="详细地址"
          name="address"
          defaultValue={wedding.address}
        />
      </div>
      <label className="flex items-center gap-3 text-sm md:col-span-2">
        <input
          name="memoriesEnabled"
          type="checkbox"
          defaultChecked={content.memories.enabled}
          className="size-4 accent-[var(--color-champagne)]"
        />
        开启婚礼回顾页面
      </label>
      <div className="flex items-center gap-4 md:col-span-2">
        <button className="rounded-xl bg-[#2d2924] px-6 py-3 text-sm text-white">
          保存设置
        </button>
        <span className="text-sm text-black/45">{status}</span>
      </div>
    </form>
  );
}

function AdminField({
  label,
  name,
  ...props
}: {
  label: string;
  name: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block text-sm">
      <span className="text-black/55">{label}</span>
      <input
        name={name}
        className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3"
        {...props}
      />
    </label>
  );
}
