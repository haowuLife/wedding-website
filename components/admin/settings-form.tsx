"use client";

import { FormEvent, useState } from "react";

import type { SiteContent } from "@/lib/content/site";
import type { Locale } from "@/lib/i18n/locale";

type ContentByLocale = Record<Locale, SiteContent>;

const localeLabels: Record<
  Locale,
  {
    tab: string;
    groom: string;
    bride: string;
    subtitle: string;
    heroEyebrow: string;
    invitationLabel: string;
  }
> = {
  zh: {
    tab: "中文内容",
    groom: "新郎姓名",
    bride: "新娘姓名",
    subtitle: "首页副标题",
    heroEyebrow: "主视觉眉标题",
    invitationLabel: "邀请按钮文案",
  },
  en: {
    tab: "English Content",
    groom: "Groom Name (English)",
    bride: "Bride Name (English)",
    subtitle: "Homepage Subtitle (English)",
    heroEyebrow: "Hero Eyebrow (English)",
    invitationLabel: "Invitation Button (English)",
  },
};

export function SettingsForm({
  contentByLocale: initialContentByLocale,
}: {
  contentByLocale: ContentByLocale;
}) {
  const [activeLocale, setActiveLocale] = useState<Locale>("zh");
  const [contentByLocale, setContentByLocale] = useState<ContentByLocale>(
    () => structuredClone(initialContentByLocale),
  );
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const content = contentByLocale[activeLocale];
  const labels = localeLabels[activeLocale];

  function updateLocale(
    locale: Locale,
    update: (draft: SiteContent) => void,
  ) {
    setContentByLocale((current) => {
      const next = structuredClone(current);
      update(next[locale]);
      return next;
    });
  }

  function updateShared(update: (draft: SiteContent) => void) {
    setContentByLocale((current) => {
      const next = structuredClone(current);
      update(next.zh);
      update(next.en);
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus("保存中...");

    const zh = contentByLocale.zh;
    const en = contentByLocale.en;
    const updates = [
      { key: "site.identity", value: zh.identity },
      { key: "site.identity.en", value: en.identity },
      { key: "site.hero", value: zh.hero },
      {
        key: "site.hero.en",
        value: {
          eyebrow: en.hero.eyebrow,
          invitationLabel: en.hero.invitationLabel,
        },
      },
      { key: "site.wedding", value: zh.wedding },
      {
        key: "site.wedding.en",
        value: {
          lunarDate: en.wedding.lunarDate,
          ceremonyTime: en.wedding.ceremonyTime,
          receptionTime: en.wedding.receptionTime,
          city: en.wedding.city,
          venue: en.wedding.venue,
          address: en.wedding.address,
          schedule: en.wedding.schedule,
        },
      },
      { key: "site.story", value: zh.story },
      { key: "site.story.en", value: en.story },
      { key: "site.guide", value: zh.guide },
      { key: "site.guide.en", value: en.guide },
      {
        key: "site.travel",
        value: { items: zh.travel, disclaimer: zh.travelDisclaimer },
      },
      {
        key: "site.travel.en",
        value: { items: en.travel, disclaimer: en.travelDisclaimer },
      },
      { key: "site.food", value: { items: zh.food } },
      { key: "site.food.en", value: { items: en.food } },
      {
        key: "site.transport",
        value: {
          items: zh.transport,
          holidayNote: zh.holidayTravelNote,
        },
      },
      {
        key: "site.transport.en",
        value: {
          items: en.transport,
          holidayNote: en.holidayTravelNote,
        },
      },
      { key: "site.navigation", value: zh.navigation },
      { key: "site.navigation.en", value: en.navigation },
      {
        key: "site.memories",
        value: {
          title: zh.memories.title,
          description: zh.memories.description,
        },
      },
      {
        key: "site.memories.en",
        value: {
          title: en.memories.title,
          description: en.memories.description,
        },
      },
      {
        key: "memories.enabled",
        value: { enabled: zh.memories.enabled },
      },
    ];

    try {
      const responses = await Promise.all(
        updates.map((update) =>
          fetch("/api/admin/settings", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(update),
          }),
        ),
      );
      if (responses.some((response) => !response.ok)) {
        setStatus("保存失败");
        return;
      }
      setStatus("已保存");
    } catch {
      setStatus("保存失败");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <section className="rounded-2xl bg-white p-6">
        <h2 className="font-serif text-2xl tracking-[0.06em]">共享设置</h2>
        <p className="mt-2 text-sm leading-6 text-black/50">
          日期、图片和链接在中英文页面共用，只需维护一次。
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <AdminField
            label="婚礼日期时间"
            type="datetime-local"
            value={contentByLocale.zh.wedding.date.slice(0, 16)}
            onChange={(value) =>
              updateShared((draft) => {
                draft.wedding.date = value;
              })
            }
          />
          <AdminField
            label="首页主视觉图片 URL"
            value={contentByLocale.zh.hero.image}
            onChange={(value) =>
              updateShared((draft) => {
                draft.hero.image = value;
              })
            }
          />
          <AdminField
            label="酒店官网"
            type="url"
            value={contentByLocale.zh.wedding.hotelUrl}
            onChange={(value) =>
              updateShared((draft) => {
                draft.wedding.hotelUrl = value;
              })
            }
          />
          <AdminField
            label="地图导航链接"
            type="url"
            value={contentByLocale.zh.wedding.mapUrl}
            onChange={(value) =>
              updateShared((draft) => {
                draft.wedding.mapUrl = value;
              })
            }
          />
          <label className="flex items-center gap-3 text-sm md:col-span-2">
            <input
              type="checkbox"
              checked={contentByLocale.zh.memories.enabled}
              onChange={(event) =>
                updateShared((draft) => {
                  draft.memories.enabled = event.target.checked;
                })
              }
              className="size-4 accent-[var(--color-champagne)]"
            />
            开启婚礼回顾页面
          </label>
        </div>
      </section>

      <div
        className="flex rounded-2xl bg-white p-2"
        role="tablist"
        aria-label="网站内容语言"
      >
        {(["zh", "en"] as const).map((locale) => (
          <button
            key={locale}
            type="button"
            role="tab"
            aria-selected={activeLocale === locale}
            onClick={() => setActiveLocale(locale)}
            className={`flex-1 rounded-xl px-4 py-3 text-sm transition ${
              activeLocale === locale
                ? "bg-[#2d2924] text-white"
                : "text-black/55"
            }`}
          >
            {localeLabels[locale].tab}
          </button>
        ))}
      </div>

      <ContentEditor
        key={activeLocale}
        content={content}
        locale={activeLocale}
        labels={labels}
        update={(change) => updateLocale(activeLocale, change)}
        updateShared={updateShared}
      />

      <div className="sticky bottom-4 z-10 flex items-center gap-4 rounded-2xl border border-black/5 bg-white/95 p-4 shadow-lg backdrop-blur">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-[#2d2924] px-6 py-3 text-sm text-white disabled:opacity-50"
        >
          {submitting ? "保存中..." : "保存全部内容"}
        </button>
        <span className="text-sm text-black/45" aria-live="polite">
          {status}
        </span>
      </div>
    </form>
  );
}

function ContentEditor({
  content,
  locale,
  labels,
  update,
  updateShared,
}: {
  content: SiteContent;
  locale: Locale;
  labels: (typeof localeLabels)[Locale];
  update: (change: (draft: SiteContent) => void) => void;
  updateShared: (change: (draft: SiteContent) => void) => void;
}) {
  return (
    <div className="space-y-6">
      <EditorSection title="首页与新人信息" open>
        <div className="grid gap-5 md:grid-cols-2">
          <AdminField
            label={labels.groom}
            value={content.identity.groom}
            onChange={(value) =>
              update((draft) => {
                draft.identity.groom = value;
                draft.identity.title = `${value} & ${draft.identity.bride}`;
              })
            }
          />
          <AdminField
            label={labels.bride}
            value={content.identity.bride}
            onChange={(value) =>
              update((draft) => {
                draft.identity.bride = value;
                draft.identity.title = `${draft.identity.groom} & ${value}`;
              })
            }
          />
          <AdminField
            label={labels.subtitle}
            value={content.identity.subtitle}
            onChange={(value) =>
              update((draft) => {
                draft.identity.subtitle = value;
              })
            }
          />
          <AdminField
            label={labels.heroEyebrow}
            value={content.hero.eyebrow}
            onChange={(value) =>
              update((draft) => {
                draft.hero.eyebrow = value;
              })
            }
          />
          <AdminField
            label={labels.invitationLabel}
            value={content.hero.invitationLabel}
            onChange={(value) =>
              update((draft) => {
                draft.hero.invitationLabel = value;
              })
            }
          />
        </div>
      </EditorSection>

      <EditorSection title="婚礼信息与流程">
        <div className="grid gap-5 md:grid-cols-2">
          {(
            [
              ["农历或日期补充", "lunarDate"],
              ["仪式时间", "ceremonyTime"],
              ["午宴时间", "receptionTime"],
              ["城市", "city"],
              ["酒店名称", "venue"],
              ["详细地址", "address"],
            ] as const
          ).map(([label, key]) => (
            <AdminField
              key={key}
              label={locale === "en" ? `${label} (English)` : label}
              value={content.wedding[key]}
              onChange={(value) =>
                update((draft) => {
                  draft.wedding[key] = value;
                })
              }
            />
          ))}
        </div>
        <ItemList title="婚礼流程">
          {content.wedding.schedule.map((item, index) => (
            <ItemCard key={index} title={`流程 ${index + 1}`}>
              <AdminField
                label="时间"
                value={item.time}
                onChange={(value) =>
                  update((draft) => {
                    draft.wedding.schedule[index].time = value;
                  })
                }
              />
              <AdminField
                label="标题"
                value={item.title}
                onChange={(value) =>
                  update((draft) => {
                    draft.wedding.schedule[index].title = value;
                  })
                }
              />
              <AdminTextArea
                label="说明"
                value={item.description}
                onChange={(value) =>
                  update((draft) => {
                    draft.wedding.schedule[index].description = value;
                  })
                }
              />
            </ItemCard>
          ))}
        </ItemList>
      </EditorSection>

      <EditorSection title="我们的故事">
        <div className="grid gap-5 lg:grid-cols-2">
          {content.story.map((item, index) => (
            <ItemCard key={index} title={`故事 ${index + 1}`}>
              <AdminField
                label="日期"
                value={item.date}
                onChange={(value) =>
                  update((draft) => {
                    draft.story[index].date = value;
                  })
                }
              />
              <AdminField
                label="标题"
                value={item.title}
                onChange={(value) =>
                  update((draft) => {
                    draft.story[index].title = value;
                  })
                }
              />
              <AdminTextArea
                label="故事内容"
                value={item.description}
                onChange={(value) =>
                  update((draft) => {
                    draft.story[index].description = value;
                  })
                }
              />
              <AdminField
                label="图片 URL（中英文共用）"
                value={item.image}
                onChange={(value) => {
                  update((draft) => {
                    draft.story[index].image = value;
                  });
                  updateShared((draft) => {
                    if (draft.story[index]) draft.story[index].image = value;
                  });
                }}
              />
            </ItemCard>
          ))}
        </div>
      </EditorSection>

      <EditorSection title="宾客指南">
        <div className="grid gap-5 lg:grid-cols-2">
          {content.guide.map((item, index) => (
            <ItemCard key={item.kind} title={`指南 ${index + 1}`}>
              <AdminField
                label="标题"
                value={item.title}
                onChange={(value) =>
                  update((draft) => {
                    draft.guide[index].title = value;
                  })
                }
              />
              <AdminTextArea
                label="说明"
                value={item.description}
                onChange={(value) =>
                  update((draft) => {
                    draft.guide[index].description = value;
                  })
                }
              />
            </ItemCard>
          ))}
        </div>
      </EditorSection>

      <RecommendationEditor
        title="旅游推荐"
        items={content.travel}
        update={update}
        updateShared={updateShared}
        collection="travel"
      >
        <AdminTextArea
          label="票价与开放信息说明"
          value={content.travelDisclaimer}
          onChange={(value) =>
            update((draft) => {
              draft.travelDisclaimer = value;
            })
          }
        />
      </RecommendationEditor>

      <RecommendationEditor
        title="美食推荐"
        items={content.food}
        update={update}
        updateShared={updateShared}
        collection="food"
      />

      <EditorSection title="交通信息">
        <AdminTextArea
          label="假期拥堵致歉说明"
          value={content.holidayTravelNote}
          onChange={(value) =>
            update((draft) => {
              draft.holidayTravelNote = value;
            })
          }
        />
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {content.transport.map((item, index) => (
            <ItemCard key={item.kind} title={`交通方式 ${index + 1}`}>
              <AdminField
                label="标题"
                value={item.title}
                onChange={(value) =>
                  update((draft) => {
                    draft.transport[index].title = value;
                  })
                }
              />
              <AdminTextArea
                label="说明"
                value={item.description}
                onChange={(value) =>
                  update((draft) => {
                    draft.transport[index].description = value;
                  })
                }
              />
              {item.action ? (
                <>
                  <AdminField
                    label="按钮文案"
                    value={item.action.label}
                    onChange={(value) =>
                      update((draft) => {
                        if (draft.transport[index].action) {
                          draft.transport[index].action.label = value;
                        }
                      })
                    }
                  />
                  <AdminField
                    label="按钮链接（中英文共用）"
                    value={item.action.href}
                    onChange={(value) =>
                      updateShared((draft) => {
                        if (draft.transport[index].action) {
                          draft.transport[index].action.href = value;
                        }
                      })
                    }
                  />
                </>
              ) : null}
            </ItemCard>
          ))}
        </div>
      </EditorSection>

      <EditorSection title="婚礼回顾与导航">
        <div className="grid gap-5 md:grid-cols-2">
          <AdminField
            label="回顾页面标题"
            value={content.memories.title}
            onChange={(value) =>
              update((draft) => {
                draft.memories.title = value;
              })
            }
          />
          <AdminTextArea
            label="回顾页面说明"
            value={content.memories.description}
            onChange={(value) =>
              update((draft) => {
                draft.memories.description = value;
              })
            }
          />
        </div>
        <ItemList title="导航名称">
          {content.navigation.map((item, index) => (
            <ItemCard key={item.href} title={item.href}>
              <AdminField
                label="显示名称"
                value={item.label}
                onChange={(value) =>
                  update((draft) => {
                    draft.navigation[index].label = value;
                  })
                }
              />
            </ItemCard>
          ))}
        </ItemList>
      </EditorSection>
    </div>
  );
}

function RecommendationEditor({
  title,
  items,
  update,
  updateShared,
  collection,
  children,
}: {
  title: string;
  items: SiteContent["travel"];
  update: (change: (draft: SiteContent) => void) => void;
  updateShared: (change: (draft: SiteContent) => void) => void;
  collection: "travel" | "food";
  children?: React.ReactNode;
}) {
  return (
    <EditorSection title={title}>
      {children}
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {items.map((item, index) => (
          <ItemCard key={index} title={`${title} ${index + 1}`}>
            <AdminField
              label="标题"
              value={item.title}
              onChange={(value) =>
                update((draft) => {
                  draft[collection][index].title = value;
                })
              }
            />
            <AdminTextArea
              label="说明"
              value={item.description}
              onChange={(value) =>
                update((draft) => {
                  draft[collection][index].description = value;
                })
              }
            />
            <AdminField
              label="补充信息"
              value={item.meta ?? ""}
              onChange={(value) =>
                update((draft) => {
                  draft[collection][index].meta = value;
                })
              }
            />
            <AdminField
              label="图片 URL（中英文共用）"
              value={item.image}
              onChange={(value) =>
                updateShared((draft) => {
                  if (draft[collection][index]) {
                    draft[collection][index].image = value;
                  }
                })
              }
            />
            {item.action ? (
              <>
                <AdminField
                  label="按钮文案"
                  value={item.action.label}
                  onChange={(value) =>
                    update((draft) => {
                      if (draft[collection][index].action) {
                        draft[collection][index].action.label = value;
                      }
                    })
                  }
                />
                <AdminField
                  label="按钮链接（中英文共用）"
                  value={item.action.href}
                  onChange={(value) =>
                    updateShared((draft) => {
                      if (draft[collection][index].action) {
                        draft[collection][index].action.href = value;
                      }
                    })
                  }
                />
              </>
            ) : null}
          </ItemCard>
        ))}
      </div>
    </EditorSection>
  );
}

function EditorSection({
  title,
  open = false,
  children,
}: {
  title: string;
  open?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details open={open} className="rounded-2xl bg-white p-6">
      <summary className="cursor-pointer font-serif text-2xl tracking-[0.06em]">
        {title}
      </summary>
      <div className="mt-6">{children}</div>
    </details>
  );
}

function ItemList({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-8">
      <h3 className="text-sm font-medium tracking-[0.12em] text-black/55">
        {title}
      </h3>
      <div className="mt-4 grid gap-5 lg:grid-cols-2">{children}</div>
    </div>
  );
}

function ItemCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4 rounded-xl border border-black/10 p-4">
      <p className="text-xs tracking-[0.14em] text-black/40">{title}</p>
      {children}
    </div>
  );
}

function AdminField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: React.HTMLInputTypeAttribute;
}) {
  return (
    <label className="block text-sm">
      <span className="text-black/55">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3"
      />
    </label>
  );
}

function AdminTextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-sm">
      <span className="text-black/55">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        className="mt-2 w-full resize-y rounded-xl border border-black/10 px-4 py-3 leading-6"
      />
    </label>
  );
}
