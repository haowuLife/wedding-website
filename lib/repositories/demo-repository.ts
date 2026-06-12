import type {
  Guest,
  GuestbookMessage,
  GuestInput,
  MessageInput,
  MessageUpdate,
  Photo,
  PhotoInput,
  PhotoUpdate,
  SiteSetting,
  WeddingRepository,
} from "./types";

type DemoSeed = {
  guests?: Guest[];
  messages?: GuestbookMessage[];
  photos?: Photo[];
  settings?: SiteSetting[];
};

const now = "2026-06-12T00:00:00.000Z";

const demoGuests: Guest[] = [
  {
    id: "guest-1",
    name: "周清",
    phone: "138****1024",
    phoneNormalized: "13800001024",
    attending: true,
    guestCount: 2,
    needParking: true,
    message: "期待见证你们的重要时刻。",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "guest-2",
    name: "许山",
    phone: "139****2208",
    phoneNormalized: "13900002208",
    attending: false,
    guestCount: 0,
    needParking: false,
    message: "人在远方，也会一直祝福你们。",
    createdAt: now,
    updatedAt: now,
  },
];

const demoMessages: GuestbookMessage[] = [
  {
    id: "message-1",
    name: "阿禾",
    message: "愿你们往后的每一天，都有今天一样明亮的笑容。",
    isApproved: true,
    isHidden: false,
    createdAt: "2026-06-08T10:00:00.000Z",
  },
  {
    id: "message-2",
    name: "小满",
    message: "长长久久，岁岁欢愉。",
    isApproved: true,
    isHidden: false,
    createdAt: "2026-06-09T10:00:00.000Z",
  },
];

const demoPhotos: Photo[] = [
  {
    id: "photo-1",
    title: "晨光",
    description: "山谷里的第一束光",
    imageUrl: "/images/gallery/story-04-clean.webp",
    category: "晨光",
    sortOrder: 1,
    isPublic: true,
    collection: "gallery",
    mediaType: "image",
    createdAt: now,
  },
  {
    id: "photo-2",
    title: "相望",
    description: "风从湖面吹来",
    imageUrl: "/images/gallery/story-03-clean.webp",
    category: "山野",
    sortOrder: 2,
    isPublic: true,
    collection: "gallery",
    mediaType: "image",
    createdAt: now,
  },
  {
    id: "photo-3",
    title: "并肩",
    description: "把普通的日子走成风景",
    imageUrl: "/images/gallery/story-02-clean.webp",
    category: "日常",
    sortOrder: 3,
    isPublic: true,
    collection: "gallery",
    mediaType: "image",
    createdAt: now,
  },
  {
    id: "photo-4",
    title: "书页之间",
    description: "故事开始的地方",
    imageUrl: "/images/gallery/story-01.jpg",
    category: "日常",
    sortOrder: 4,
    isPublic: true,
    collection: "gallery",
    mediaType: "image",
    createdAt: now,
  },
];

export class DemoRepository implements WeddingRepository {
  private guests: Guest[];
  private messages: GuestbookMessage[];
  private photos: Photo[];
  private settings: SiteSetting[];

  constructor(seed: DemoSeed = {}) {
    this.guests = structuredClone(seed.guests ?? demoGuests);
    this.messages = structuredClone(seed.messages ?? demoMessages);
    this.photos = structuredClone(seed.photos ?? demoPhotos);
    this.settings = structuredClone(seed.settings ?? []);
  }

  async listPublicMessages() {
    return this.messages
      .filter((message) => message.isApproved && !message.isHidden)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async createMessage(input: MessageInput) {
    this.messages.unshift({
      id: crypto.randomUUID(),
      ...input,
      isApproved: false,
      isHidden: false,
      createdAt: new Date().toISOString(),
    });
  }

  async upsertGuest(input: GuestInput) {
    const existingIndex = this.guests.findIndex(
      (guest) => guest.phoneNormalized === input.phoneNormalized,
    );
    const timestamp = new Date().toISOString();
    if (existingIndex >= 0) {
      const existing = this.guests[existingIndex];
      this.guests[existingIndex] = {
        ...existing,
        ...input,
        updatedAt: timestamp,
      };
      return;
    }
    this.guests.unshift({
      id: crypto.randomUUID(),
      ...input,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  }

  async listGuests() {
    return [...this.guests].sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt),
    );
  }

  async listMessages() {
    return [...this.messages].sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt),
    );
  }

  async updateMessage(id: string, update: MessageUpdate) {
    this.messages = this.messages.map((message) =>
      message.id === id ? { ...message, ...update } : message,
    );
  }

  async deleteMessage(id: string) {
    this.messages = this.messages.filter((message) => message.id !== id);
  }

  async listPhotos(collection?: Photo["collection"]) {
    return this.photos
      .filter((photo) => !collection || photo.collection === collection)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async listPublicPhotos(collection?: Photo["collection"]) {
    const photos = await this.listPhotos(collection);
    return photos.filter((photo) => photo.isPublic);
  }

  async createPhoto(input: PhotoInput) {
    const photo: Photo = {
      id: crypto.randomUUID(),
      ...input,
      createdAt: new Date().toISOString(),
    };
    this.photos.push(photo);
    return photo;
  }

  async updatePhoto(id: string, update: PhotoUpdate) {
    this.photos = this.photos.map((photo) =>
      photo.id === id ? { ...photo, ...update } : photo,
    );
  }

  async deletePhoto(id: string) {
    this.photos = this.photos.filter((photo) => photo.id !== id);
  }

  async listSettings() {
    return [...this.settings];
  }

  async updateSetting(key: string, value: unknown) {
    const existing = this.settings.find((setting) => setting.key === key);
    if (existing) {
      existing.value = value;
      existing.updatedAt = new Date().toISOString();
      return;
    }
    this.settings.push({
      key,
      value,
      updatedAt: new Date().toISOString(),
    });
  }
}
