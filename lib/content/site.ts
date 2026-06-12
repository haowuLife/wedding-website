export type NavigationItem = {
  label: string;
  href: string;
};

export type StoryItem = {
  date: string;
  title: string;
  description: string;
  image: string;
};

export type ScheduleItem = {
  time: string;
  title: string;
  description: string;
};

export type GuideItem = {
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
};

export type SiteContent = {
  identity: {
    groom: string;
    bride: string;
    title: string;
    subtitle: string;
  };
  hero: {
    image: string;
    eyebrow: string;
    invitationLabel: string;
  };
  wedding: {
    date: string;
    displayDate: string;
    lunarDate: string;
    ceremonyTime: string;
    receptionTime: string;
    venue: string;
    address: string;
    mapUrl: string;
    schedule: ScheduleItem[];
  };
  story: StoryItem[];
  guide: GuideItem[];
  navigation: NavigationItem[];
  memories: {
    enabled: boolean;
    title: string;
    description: string;
  };
  gallery: {
    accessCodeEnabled: boolean;
    categories: string[];
  };
  music: {
    enabled: boolean;
    src: string;
    title: string;
  };
};

export const defaultSiteContent: SiteContent = {
  identity: {
    groom: "陈屿",
    bride: "林晚",
    title: "陈屿 & 林晚",
    subtitle: "诚邀您见证我们的婚礼",
  },
  hero: {
    image: "/images/hero-wedding.png",
    eyebrow: "OUR WEDDING DAY",
    invitationLabel: "查看邀请",
  },
  wedding: {
    date: "2026-10-18T10:28:00+08:00",
    displayDate: "2026.10.18",
    lunarDate: "农历九月初八 · 星期日",
    ceremonyTime: "10:28",
    receptionTime: "12:08",
    venue: "杭州木守西溪酒店",
    address: "浙江省杭州市西湖区西溪湿地龙舌嘴入口",
    mapUrl:
      "https://uri.amap.com/search?keyword=%E6%9D%AD%E5%B7%9E%E6%9C%A8%E5%AE%88%E8%A5%BF%E6%BA%AA%E9%85%92%E5%BA%97",
    schedule: [
      {
        time: "09:30",
        title: "宾客签到",
        description: "在湖畔草坪相见，领取座位卡并合影留念。",
      },
      {
        time: "10:28",
        title: "婚礼仪式",
        description: "请提前十分钟入席，一同见证我们的誓言。",
      },
      {
        time: "11:28",
        title: "花园酒会",
        description: "短暂休憩，享用香槟与轻食。",
      },
      {
        time: "12:08",
        title: "午宴开始",
        description: "移步宴会厅，共享午宴与祝福。",
      },
    ],
  },
  story: [
    {
      date: "2019.04",
      title: "初次相遇",
      description:
        "春雨刚停的傍晚，我们在一间小小的书店里，因为同一本旅行摄影集开始交谈。",
      image: "/images/gallery/story-01.jpg",
    },
    {
      date: "2020.10",
      title: "第一次远行",
      description:
        "沿着海岸开了很久的车，也是在那次旅途中，我们开始认真想象共同生活的模样。",
      image: "/images/gallery/story-02.jpg",
    },
    {
      date: "2024.05",
      title: "山顶的约定",
      description:
        "晨雾散去时，他拿出戒指。没有排练好的台词，只有一句笃定的“我们回家吧”。",
      image: "/images/gallery/story-03.jpg",
    },
    {
      date: "2026.10",
      title: "婚礼将至",
      description:
        "我们想把最珍贵的一天分享给一路陪伴的人，期待在西溪的秋日与你相见。",
      image: "/images/gallery/story-04.jpg",
    },
  ],
  guide: [
    {
      title: "公共交通",
      description:
        "地铁 3 号线至西溪湿地南站，B 出口乘坐接驳车约 8 分钟抵达酒店。",
    },
    {
      title: "停车信息",
      description:
        "酒店提供免费停车位。自驾宾客请在 RSVP 中勾选停车需求，以便预留。",
    },
    {
      title: "住宿建议",
      description:
        "酒店为外地宾客预留协议房，建议在 2026 年 9 月 18 日前联系新人预订。",
    },
    {
      title: "着装建议",
      description:
        "花园半正式着装。推荐米白、浅棕、雾灰与柔和绿色，请避免全黑或大面积正红。",
    },
    {
      title: "婚礼联系人",
      description: "如需接驳或临时协助，请联系婚礼管家周女士。",
      action: {
        label: "联系管家",
        href: "tel:+8613800000000",
      },
    },
  ],
  navigation: [
    { label: "首页", href: "/" },
    { label: "我们的故事", href: "/story" },
    { label: "婚礼信息", href: "/details" },
    { label: "宾客指南", href: "/guide" },
    { label: "婚纱照", href: "/gallery" },
    { label: "祝福留言", href: "/guestbook" },
    { label: "RSVP", href: "/rsvp" },
  ],
  memories: {
    enabled: false,
    title: "婚礼回顾",
    description: "婚礼结束后，我们会在这里收藏那天的照片与影像。",
  },
  gallery: {
    accessCodeEnabled: false,
    categories: ["全部", "晨光", "山野", "日常"],
  },
  music: {
    enabled: false,
    src: "",
    title: "婚礼背景音乐",
  },
};
