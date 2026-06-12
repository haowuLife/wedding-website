export type Guest = {
  id: string;
  name: string;
  phone: string;
  phoneNormalized: string;
  attending: boolean;
  guestCount: number;
  message: string;
  createdAt: string;
  updatedAt: string;
};

export type GuestInput = Omit<
  Guest,
  "id" | "createdAt" | "updatedAt"
>;

export type GuestbookMessage = {
  id: string;
  name: string;
  message: string;
  isApproved: boolean;
  isHidden: boolean;
  createdAt: string;
};

export type MessageInput = Pick<GuestbookMessage, "name" | "message">;

export type Photo = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  sortOrder: number;
  isPublic: boolean;
  collection: "gallery" | "memories";
  mediaType: "image" | "video";
  createdAt: string;
};

export type PhotoInput = Omit<Photo, "id" | "createdAt">;
export type PhotoUpdate = Partial<
  Pick<
    Photo,
    "title" | "description" | "category" | "sortOrder" | "isPublic"
  >
>;

export type SiteSetting = {
  key: string;
  value: unknown;
  updatedAt: string;
};

export type MessageUpdate = Partial<
  Pick<GuestbookMessage, "isApproved" | "isHidden">
>;

export interface WeddingRepository {
  listPublicMessages(): Promise<GuestbookMessage[]>;
  createMessage(input: MessageInput): Promise<void>;
  upsertGuest(input: GuestInput): Promise<void>;
  listGuests(): Promise<Guest[]>;
  listMessages(): Promise<GuestbookMessage[]>;
  updateMessage(id: string, update: MessageUpdate): Promise<void>;
  deleteMessage(id: string): Promise<void>;
  listPhotos(collection?: Photo["collection"]): Promise<Photo[]>;
  listPublicPhotos(collection?: Photo["collection"]): Promise<Photo[]>;
  createPhoto(input: PhotoInput): Promise<Photo>;
  updatePhoto(id: string, update: PhotoUpdate): Promise<void>;
  deletePhoto(id: string): Promise<void>;
  listSettings(): Promise<SiteSetting[]>;
  updateSetting(key: string, value: unknown): Promise<void>;
}
