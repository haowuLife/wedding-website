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

export type RecommendationItem = {
  title: string;
  description: string;
  image: string;
  meta?: string;
  action?: {
    label: string;
    href: string;
  };
};

export type TransportItem = {
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
  travel: RecommendationItem[];
  travelDisclaimer: string;
  food: RecommendationItem[];
  transport: TransportItem[];
  holidayTravelNote: string;
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
      image: "/images/gallery/story-02-clean.webp",
    },
    {
      date: "待补充",
      title: "决定同行",
      description:
        "从两个人到一个家，这段重要的约定将在这里被珍藏。",
      image: "/images/gallery/story-03-clean.webp",
    },
    {
      date: "2026.10.06",
      title: "婚礼将至",
      description:
        "我们想把最珍贵的一天分享给一路陪伴的人，期待在泰兴的金秋与你相见。",
      image: "/images/gallery/story-04-clean.webp",
    },
  ],
  guide: [
    {
      title: "住宿建议",
      description:
        "外地宾客可优先咨询泰州泰兴希尔顿欢朋酒店，房态与价格请以酒店实时信息为准。",
    },
    {
      title: "天气提醒",
      description:
        "十月泰兴早晚可能偏凉，请根据当天气温增减衣物；如遇降雨，建议随身携带雨具。",
    },
    {
      title: "婚礼联系人",
      description: "如需接驳或临时协助，请联系新人；具体联络方式将在确认后更新。",
    },
  ],
  travel: [
    {
      title: "泰兴国家古银杏森林公园",
      description:
        "成片古银杏在秋日铺开金色林荫，适合散步、拍照，也适合在婚礼行程之外留一段安静时光。",
      image: "/images/guide/taixing-ginkgo-forest.webp",
      meta: "免费开放",
      action: {
        label: "地图查看",
        href: "https://uri.amap.com/search?keyword=%E6%B3%B0%E5%85%B4%E5%9B%BD%E5%AE%B6%E5%8F%A4%E9%93%B6%E6%9D%8F%E6%A3%AE%E6%9E%97%E5%85%AC%E5%9B%AD",
      },
    },
    {
      title: "溱湖国家湿地公园",
      description:
        "湖面、芦苇与湿地水乡相映成景，可以乘船慢游，也适合安排半日感受泰州的自然气息。",
      image: "/images/guide/qin-lake-wetland.webp",
      meta: "成人票参考约 ¥78",
      action: {
        label: "地图查看",
        href: "https://uri.amap.com/search?keyword=%E6%BA%B1%E6%B9%96%E5%9B%BD%E5%AE%B6%E6%B9%BF%E5%9C%B0%E5%85%AC%E5%9B%AD",
      },
    },
    {
      title: "凤城河风景区与望海楼",
      description:
        "沿凤城河漫步，可以一并看看望海楼与水城夜景，适合在泰州市区安排轻松的傍晚行程。",
      image: "/images/guide/fengcheng-river-wanghai-tower.webp",
      meta: "望海楼日场成人票参考约 ¥35",
      action: {
        label: "地图查看",
        href: "https://uri.amap.com/search?keyword=%E6%B3%B0%E5%B7%9E%E5%87%A4%E5%9F%8E%E6%B2%B3%E9%A3%8E%E6%99%AF%E5%8C%BA%E6%9C%9B%E6%B5%B7%E6%A5%BC",
      },
    },
  ],
  travelDisclaimer:
    "票价、开放时间及预约要求可能调整，请以景区当日公示为准。",
  food: [
    {
      title: "黄桥烧饼",
      description:
        "酥香分层、芝麻气息浓郁，是泰兴很有代表性的传统点心，适合作为伴手礼慢慢品尝。",
      image: "/images/guide/huangqiao-sesame-cake.webp",
    },
    {
      title: "宣堡小馄饨",
      description:
        "皮薄馅嫩，清汤鲜香，一碗热乎的小馄饨，是当地朴素又舒服的早餐与夜宵选择。",
      image: "/images/guide/xuanbao-wontons.webp",
    },
    {
      title: "曲霞汤包",
      description:
        "薄皮包裹鲜美汤汁，趁热轻轻提起、先开口再品汤，是到泰兴值得尝试的一口鲜香。",
      image: "/images/guide/quxia-soup-dumplings.webp",
    },
  ],
  transport: [
    {
      title: "泰州站",
      description:
        "乘出租车或网约车前往酒店，车程约 1 小时，参考费用约 60 元。建议好友同行，路上也能彼此照应。",
    },
    {
      title: "扬州泰州国际机场",
      description:
        "乘出租车或网约车前往酒店，车程约 1 小时 10 分钟，参考费用约 130 元。",
    },
    {
      title: "泰兴汽车客运站",
      description:
        "距酒店约 4.7 公里，可直接打车前往；实际时间和费用请以实时地图及平台计价为准。",
    },
    {
      title: "自驾前往",
      description:
        "直接导航至“泰州泰兴希尔顿欢朋酒店”。酒店提供免费现场停车，抵达后请按现场指引停放。",
      action: {
        label: "打开地图导航",
        href: "https://uri.amap.com/search?keyword=%E6%B3%B0%E5%B7%9E%E6%B3%B0%E5%85%B4%E5%B8%8C%E5%B0%94%E9%A1%BF%E6%AC%A2%E6%9C%8B%E9%85%92%E5%BA%97",
      },
    },
  ],
  holidayTravelNote:
    "婚礼恰逢国庆假期尾声，返程车流可能较多，路途也会比平日辛苦。很抱歉让大家舟车劳顿，也格外感谢你们愿意跨越路途，来见证我们的重要时刻。",
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
