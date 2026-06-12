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
    city: string;
    venue: string;
    address: string;
    mapUrl: string;
    hotelUrl: string;
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
    groom: "吴昊",
    bride: "王璐",
    title: "吴昊 & 王璐",
    subtitle: "诚邀您见证我们的婚礼",
  },
  hero: {
    image: "/images/hero-wedding-photo.png",
    eyebrow: "OUR WEDDING DAY",
    invitationLabel: "查看邀请",
  },
  wedding: {
    date: "2026-10-06T12:00:00+08:00",
    displayDate: "2026.10.06",
    lunarDate: "星期二 · 午宴",
    ceremonyTime: "待确认",
    receptionTime: "待确认",
    city: "泰兴",
    venue: "泰州泰兴希尔顿欢朋酒店",
    address: "江苏省泰州市泰兴市文昌中路1号",
    mapUrl:
      "https://uri.amap.com/search?keyword=%E6%B3%B0%E5%B7%9E%E6%B3%B0%E5%85%B4%E5%B8%8C%E5%B0%94%E9%A1%BF%E6%AC%A2%E6%9C%8B%E9%85%92%E5%BA%97",
    hotelUrl:
      "https://www.hilton.com/zh-hans/hotels/ytytxhx-hampton-taizhou-taixing/",
    schedule: [
      {
        time: "上午",
        title: "宾客签到",
        description: "抵达酒店后签到入场，具体时间将在婚礼前另行通知。",
      },
      {
        time: "午宴前",
        title: "合影留念",
        description: "与新人和亲友合影，记录相聚的珍贵时刻。",
      },
      {
        time: "午间",
        title: "午宴开始",
        description: "共同入席，分享喜悦、佳肴与祝福。",
      },
      {
        time: "宴后",
        title: "自由交流",
        description: "与亲友叙旧留影，慢慢收藏这一天的温暖。",
      },
    ],
  },
  story: [
    {
      date: "待补充",
      title: "初次相遇",
      description:
        "属于吴昊与王璐的初见故事，将在这里慢慢写下。",
      image: "/images/gallery/story-01.jpg",
    },
    {
      date: "待补充",
      title: "相知相伴",
      description:
        "那些平凡却闪闪发光的日子，等待你们补充真实的回忆。",
      image: "/images/gallery/story-02.jpg",
    },
    {
      date: "待补充",
      title: "决定同行",
      description:
        "从两个人到一个家，这段重要的约定将在这里被珍藏。",
      image: "/images/gallery/story-03.jpg",
    },
    {
      date: "2026.10.06",
      title: "婚礼将至",
      description:
        "我们想把最珍贵的一天分享给一路陪伴的人，期待在泰兴的金秋与你相见。",
      image: "/images/gallery/story-04.jpg",
    },
  ],
  guide: [
    {
      title: "公共交通",
      description:
        "建议使用实时地图导航至泰州泰兴希尔顿欢朋酒店，出发前留意当天路况。",
    },
    {
      title: "停车信息",
      description:
        "酒店提供免费现场停车。自驾宾客请在 RSVP 中勾选停车需求，便于提前统计。",
    },
    {
      title: "住宿建议",
      description:
        "外地宾客可优先咨询泰州泰兴希尔顿欢朋酒店，房态与价格请以酒店实时信息为准。",
    },
    {
      title: "着装建议",
      description:
        "推荐简洁雅致的半正式着装，可选择米白、浅棕、雾灰或柔和低饱和色。",
    },
    {
      title: "婚礼联系人",
      description: "如需接驳或临时协助，请联系新人；具体联络方式将在确认后更新。",
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
