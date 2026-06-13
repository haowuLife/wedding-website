import type { Locale } from "./locale";

export type PublicMessages = {
  metadata: {
    siteTitle: string;
    description: string;
    titleTemplate: string;
    pages: {
      story: string;
      details: string;
      guide: string;
      gallery: string;
      guestbook: string;
      rsvp: string;
      memories: string;
    };
  };
  languageSwitcher: {
    label: string;
    chinese: string;
    english: string;
    error: string;
  };
  header: {
    homeQuickNavigationLabel: string;
    returnHomeLabel: string;
    mainNavigationLabel: string;
    mobileNavigationLabel: string;
    openMenuLabel: string;
    closeMenuLabel: string;
    musicDisabledLabel: string;
  };
  footer: {
    guestbookLabel: string;
    adminLabel: string;
  };
  hero: {
    imageAlt: string;
    scrollLabel: string;
    scrollLine1: string;
    scrollLine2: string;
  };
  countdown: {
    ariaLabel: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
  home: {
    invitationEyebrow: string;
    invitationTitle: string;
    invitationDescription: string;
    previews: Array<{
      eyebrow: string;
      title: string;
      description: string;
      actionLabel: string;
    }>;
    rsvpEyebrow: string;
    rsvpTitle: string;
    rsvpDescription: string;
    rsvpAction: string;
  };
  story: {
    eyebrow: string;
    title: string;
    introduction: string;
  };
  details: {
    eyebrow: string;
    title: string;
    dateLabel: string;
    luncheonLabel: string;
    luncheonValue: string;
    receptionPrefix: string;
    venueLabel: string;
    locationEyebrow: string;
    locationDescription: string;
    mapAction: string;
    hotelAction: string;
    timelineEyebrow: string;
    citySuffix: string;
  };
  guide: {
    eyebrow: string;
    title: string;
    introduction: string;
    travelEyebrow: string;
    travelTitle: string;
    travelDescription: string;
    foodEyebrow: string;
    foodTitle: string;
    foodDescription: string;
    transportEyebrow: string;
    transportTitle: string;
    transportDescription: string;
    noteEyebrow: string;
  };
  rsvp: {
    eyebrow: string;
    title: string;
    introduction: string;
    datePrefix: string;
    venuePrefix: string;
    nameLabel: string;
    phoneLabel: string;
    attendingLegend: string;
    attendingYes: string;
    attendingNo: string;
    guestCountLabel: string;
    guestCountSuffix: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitLabel: string;
    submittingLabel: string;
    successTitle: string;
    successDescription: string;
    submitError: string;
    networkError: string;
  };
  guestbook: {
    eyebrow: string;
    title: string;
    introduction: string;
    formEyebrow: string;
    formTitle: string;
    messagesEyebrow: string;
    messagesTitle: string;
    nameLabel: string;
    messageLabel: string;
    submitLabel: string;
    submittingLabel: string;
    successTitle: string;
    successDescription: string;
    submitError: string;
    networkError: string;
  };
  gallery: {
    eyebrow: string;
    title: string;
    introduction: string;
    allCategory: string;
    categoryNames: Record<string, string>;
    categoryLabel: string;
    filterPrefix: string;
    viewPrefix: string;
    previewLabel: string;
    closePreviewLabel: string;
    previousPhotoLabel: string;
    nextPhotoLabel: string;
    accessTitle: string;
    accessDescription: string;
    accessCodeLabel: string;
    accessSubmit: string;
    accessSubmitting: string;
    accessError: string;
  };
  memories: {
    eyebrow: string;
    emptyLabel: string;
  };
};

export const publicMessages = {
  zh: {
    metadata: {
      siteTitle: "吴昊 & 王璐的婚礼",
      description:
        "诚邀您见证吴昊与王璐于 2026 年 10 月 6 日在泰兴举行的婚礼。",
      titleTemplate: "%s · 吴昊 & 王璐",
      pages: {
        story: "我们的故事",
        details: "婚礼信息",
        guide: "宾客指南",
        gallery: "婚纱照",
        guestbook: "祝福留言",
        rsvp: "RSVP",
        memories: "婚礼回顾",
      },
    },
    languageSwitcher: {
      label: "选择语言",
      chinese: "中文",
      english: "EN",
      error: "语言切换失败，请稍后再试",
    },
    header: {
      homeQuickNavigationLabel: "首页快捷导航",
      returnHomeLabel: "返回首页",
      mainNavigationLabel: "主导航",
      mobileNavigationLabel: "移动导航",
      openMenuLabel: "打开菜单",
      closeMenuLabel: "关闭菜单",
      musicDisabledLabel: "背景音乐暂未启用",
    },
    footer: {
      guestbookLabel: "留下祝福",
      adminLabel: "管理",
    },
    hero: {
      imageAlt: "新人在晨光山野中的婚纱照",
      scrollLabel: "向下浏览",
      scrollLine1: "向上滑动",
      scrollLine2: "探索更多",
    },
    countdown: {
      ariaLabel: "婚礼倒计时",
      days: "天",
      hours: "时",
      minutes: "分",
      seconds: "秒",
    },
    home: {
      invitationEyebrow: "Dear Family & Friends",
      invitationTitle: "我们要结婚了",
      invitationDescription:
        "从相遇到相爱，我们走过许多平凡而珍贵的日子。如今想邀请最重要的你，在金秋的泰兴，一同见证新的开始。",
      previews: [
        {
          eyebrow: "Our Story",
          title: "从一次偶遇，到一生同行",
          description:
            "那些被时间温柔收藏的瞬间，组成了我们想与你分享的故事。",
          actionLabel: "阅读我们的故事",
        },
        {
          eyebrow: "Wedding Details",
          title: "相约泰兴的金秋",
          description:
            "婚礼日期、午宴地点与当天流程，都已为你整理在婚礼信息中。",
          actionLabel: "查看婚礼信息",
        },
        {
          eyebrow: "Guest Guide",
          title: "宾客指南",
          description:
            "交通、住宿、天气，以及泰州旅行与泰兴美食推荐，都整理在完整宾客指南中。",
          actionLabel: "查看完整宾客指南",
        },
      ],
      rsvpEyebrow: "Will You Join Us?",
      rsvpTitle: "期待与你相见",
      rsvpDescription:
        "请尽早告诉我们，你是否能来到现场，方便我们为你准备席位。",
      rsvpAction: "填写 RSVP",
    },
    story: {
      eyebrow: "Our Story",
      title: "我们的故事",
      introduction:
        "爱情并不是某一个盛大的瞬间，而是许多平凡日子里，一次又一次选择彼此。",
    },
    details: {
      eyebrow: "Wedding Details",
      title: "婚礼信息",
      dateLabel: "Date",
      luncheonLabel: "Luncheon",
      luncheonValue: "午宴",
      receptionPrefix: "开席时间",
      venueLabel: "Venue",
      locationEyebrow: "Location",
      locationDescription:
        "午宴地点位于泰兴市文昌中路，详细交通方式与周边行程可在宾客指南中查看。",
      mapAction: "地图导航",
      hotelAction: "酒店官网",
      timelineEyebrow: "Timeline",
      citySuffix: "泰州",
    },
    guide: {
      eyebrow: "Guest Guide",
      title: "宾客指南",
      introduction:
        "除了婚礼当天的信息，我们也整理了几处风景与泰兴味道，希望这趟秋日之行多一些轻松的小停留。",
      travelEyebrow: "Around Taizhou",
      travelTitle: "泰州旅行推荐",
      travelDescription:
        "如果时间允许，可以在泰兴与泰州市区慢慢走走。以下行程适合半日或一日轻松安排。",
      foodEyebrow: "Taste of Taixing",
      foodTitle: "泰兴美食推荐",
      foodDescription:
        "从酥香点心到一碗热汤，挑几样本地味道，也算把这趟相聚好好记在味蕾里。",
      transportEyebrow: "Getting Here",
      transportTitle: "交通信息",
      transportDescription:
        "以下车程与费用均为参考，可能因实时路况、车型和平台计价有所变化。",
      noteEyebrow: "A Note From Us",
    },
    rsvp: {
      eyebrow: "Répondez S'il Vous Plaît",
      title: "期待你的回复",
      introduction:
        "请尽早完成回复。你的信息只用于婚礼安排，不会公开展示。",
      datePrefix: "婚礼日期：",
      venuePrefix: "婚礼地点：",
      nameLabel: "姓名",
      phoneLabel: "手机号",
      attendingLegend: "是否参加婚礼",
      attendingYes: "欣然参加",
      attendingNo: "遗憾缺席",
      guestCountLabel: "参加人数",
      guestCountSuffix: "人",
      messageLabel: "祝福留言",
      messagePlaceholder: "想对我们说的话",
      submitLabel: "提交 RSVP",
      submittingLabel: "提交中...",
      successTitle: "谢谢你的回复",
      successDescription:
        "我们已经收到你的 RSVP。期待在泰兴的金秋与你相见。",
      submitError: "提交失败，请稍后再试",
      networkError: "网络连接失败，请稍后再试",
    },
    guestbook: {
      eyebrow: "Guestbook",
      title: "祝福留言",
      introduction:
        "无论你是否来到现场，都欢迎在这里留下想对我们说的话。",
      formEyebrow: "Leave A Note",
      formTitle: "写下你的祝福",
      messagesEyebrow: "With Love",
      messagesTitle: "来自亲友的心意",
      nameLabel: "姓名",
      messageLabel: "祝福留言",
      submitLabel: "送上祝福",
      submittingLabel: "提交中...",
      successTitle: "祝福已收到",
      successDescription:
        "留言会在新人审核后公开展示，谢谢你的祝福。",
      submitError: "提交失败，请稍后再试",
      networkError: "网络连接失败，请稍后再试",
    },
    gallery: {
      eyebrow: "Gallery",
      title: "婚纱照",
      introduction:
        "晨光、山野与一起走过的寻常日子，都成为我们想长久保存的画面。",
      allCategory: "全部",
      categoryNames: {
        晨光: "晨光",
        山野: "山野",
        日常: "日常",
      },
      categoryLabel: "照片分类",
      filterPrefix: "筛选",
      viewPrefix: "查看",
      previewLabel: "照片预览",
      closePreviewLabel: "关闭照片预览",
      previousPhotoLabel: "上一张照片",
      nextPhotoLabel: "下一张照片",
      accessTitle: "输入相册访问码",
      accessDescription: "这是一份只与亲友分享的影像记录。",
      accessCodeLabel: "相册访问码",
      accessSubmit: "进入相册",
      accessSubmitting: "验证中...",
      accessError: "访问码错误",
    },
    memories: {
      eyebrow: "Memories",
      emptyLabel: "婚礼影像正在整理中，稍后再来看看。",
    },
  },
  en: {
    metadata: {
      siteTitle: "The Wedding of Hao Wu & Lu Wang",
      description:
        "You are warmly invited to celebrate the wedding of Hao Wu and Lu Wang in Taixing on October 6, 2026.",
      titleTemplate: "%s · Hao Wu & Lu Wang",
      pages: {
        story: "Our Story",
        details: "Wedding Details",
        guide: "Guest Guide",
        gallery: "Gallery",
        guestbook: "Guestbook",
        rsvp: "RSVP",
        memories: "Wedding Memories",
      },
    },
    languageSwitcher: {
      label: "Choose language",
      chinese: "中文",
      english: "EN",
      error: "Unable to change language. Please try again.",
    },
    header: {
      homeQuickNavigationLabel: "Home quick navigation",
      returnHomeLabel: "Return home",
      mainNavigationLabel: "Main navigation",
      mobileNavigationLabel: "Mobile navigation",
      openMenuLabel: "Open menu",
      closeMenuLabel: "Close menu",
      musicDisabledLabel: "Background music is not available yet",
    },
    footer: {
      guestbookLabel: "Leave Your Wishes",
      adminLabel: "管理",
    },
    hero: {
      imageAlt: "The couple in a sunlit mountain landscape",
      scrollLabel: "Explore the invitation",
      scrollLine1: "Swipe up",
      scrollLine2: "Discover more",
    },
    countdown: {
      ariaLabel: "Countdown to the wedding",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
    },
    home: {
      invitationEyebrow: "Dear Family & Friends",
      invitationTitle: "We Are Getting Married",
      invitationDescription:
        "From meeting to falling in love, we have shared many ordinary and precious days. Now we would love to invite you to Taixing in autumn to witness our new beginning.",
      previews: [
        {
          eyebrow: "Our Story",
          title: "From a Chance Meeting to a Lifetime Together",
          description:
            "The moments gently held by time have become the story we would love to share with you.",
          actionLabel: "Read Our Story",
        },
        {
          eyebrow: "Wedding Details",
          title: "An Autumn Celebration in Taixing",
          description:
            "Find the wedding date, luncheon venue, and schedule for the day.",
          actionLabel: "View Wedding Details",
        },
        {
          eyebrow: "Guest Guide",
          title: "Guest Guide",
          description:
            "Transport, accommodation, weather, Taizhou travel ideas, and local Taixing food are collected in one guide.",
          actionLabel: "View the Complete Guest Guide",
        },
      ],
      rsvpEyebrow: "Will You Join Us?",
      rsvpTitle: "We Hope to See You",
      rsvpDescription:
        "Please let us know whether you can join us so we can prepare your place at the celebration.",
      rsvpAction: "Complete RSVP",
    },
    story: {
      eyebrow: "Our Story",
      title: "Our Story",
      introduction:
        "Love is not only one grand moment, but the quiet choice to choose each other again and again through ordinary days.",
    },
    details: {
      eyebrow: "Wedding Details",
      title: "Wedding Details",
      dateLabel: "Date",
      luncheonLabel: "Luncheon",
      luncheonValue: "Wedding Luncheon",
      receptionPrefix: "Lunch begins",
      venueLabel: "Venue",
      locationEyebrow: "Location",
      locationDescription:
        "The luncheon will be held on Wenchang Middle Road in Taixing. Detailed transport and nearby travel ideas are available in the Guest Guide.",
      mapAction: "Open Map",
      hotelAction: "Hotel Website",
      timelineEyebrow: "Timeline",
      citySuffix: "Taizhou",
    },
    guide: {
      eyebrow: "Guest Guide",
      title: "Guest Guide",
      introduction:
        "Alongside the wedding-day details, we have gathered a few landscapes and local Taixing flavours for a gentler autumn journey.",
      travelEyebrow: "Around Taizhou",
      travelTitle: "Places to Visit in Taizhou",
      travelDescription:
        "If time allows, enjoy a relaxed walk through Taixing or central Taizhou. These ideas work well for an easy half-day or full-day outing.",
      foodEyebrow: "Taste of Taixing",
      foodTitle: "Local Food in Taixing",
      foodDescription:
        "From flaky pastries to a warm bowl of soup, these local favourites are a delicious way to remember the trip.",
      transportEyebrow: "Getting Here",
      transportTitle: "Transport",
      transportDescription:
        "Travel times and prices are estimates and may vary with traffic, vehicle type, and platform pricing.",
      noteEyebrow: "A Note From Us",
    },
    rsvp: {
      eyebrow: "Répondez S'il Vous Plaît",
      title: "Your Reply",
      introduction:
        "Please reply when you can. Your information will only be used for wedding arrangements and will not be displayed publicly.",
      datePrefix: "Wedding date: ",
      venuePrefix: "Wedding venue: ",
      nameLabel: "Name",
      phoneLabel: "Phone Number",
      attendingLegend: "Will you attend the wedding?",
      attendingYes: "Joyfully Accept",
      attendingNo: "Regretfully Decline",
      guestCountLabel: "Number of Guests",
      guestCountSuffix: "guest(s)",
      messageLabel: "Message for the Couple",
      messagePlaceholder: "Share a wish or note with us",
      submitLabel: "Submit RSVP",
      submittingLabel: "Submitting...",
      successTitle: "Thank You for Your Reply",
      successDescription:
        "We have received your RSVP and look forward to seeing you in autumnal Taixing.",
      submitError: "Unable to submit. Please try again.",
      networkError: "Unable to connect. Please try again.",
    },
    guestbook: {
      eyebrow: "Guestbook",
      title: "Guestbook",
      introduction:
        "Whether or not you can join us in person, you are warmly invited to leave a message here.",
      formEyebrow: "Leave A Note",
      formTitle: "Share Your Wishes",
      messagesEyebrow: "With Love",
      messagesTitle: "Messages From Family & Friends",
      nameLabel: "Name",
      messageLabel: "Your Message",
      submitLabel: "Send Your Wishes",
      submittingLabel: "Submitting...",
      successTitle: "Your Wishes Have Been Received",
      successDescription:
        "Your message will appear after the couple reviews it. Thank you for celebrating with us.",
      submitError: "Unable to submit. Please try again.",
      networkError: "Unable to connect. Please try again.",
    },
    gallery: {
      eyebrow: "Gallery",
      title: "Gallery",
      introduction:
        "Morning light, open landscapes, and the ordinary days we have shared have become photographs we hope to keep for years.",
      allCategory: "All",
      categoryNames: {
        晨光: "Morning Light",
        山野: "Outdoors",
        日常: "Everyday",
      },
      categoryLabel: "Photo categories",
      filterPrefix: "Filter by ",
      viewPrefix: "View ",
      previewLabel: "Photo preview",
      closePreviewLabel: "Close photo preview",
      previousPhotoLabel: "Previous photo",
      nextPhotoLabel: "Next photo",
      accessTitle: "Enter Gallery Access Code",
      accessDescription:
        "This collection is shared privately with our family and friends.",
      accessCodeLabel: "Gallery Access Code",
      accessSubmit: "Enter Gallery",
      accessSubmitting: "Checking...",
      accessError: "The access code is incorrect",
    },
    memories: {
      eyebrow: "Memories",
      emptyLabel:
        "We are still gathering photographs and films from the wedding. Please visit again soon.",
    },
  },
} satisfies Record<Locale, PublicMessages>;

export function getMessages(locale: Locale): PublicMessages {
  return publicMessages[locale];
}
