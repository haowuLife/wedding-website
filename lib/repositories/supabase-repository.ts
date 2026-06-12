import { createSupabaseAdminClient } from "@/lib/supabase/admin";

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

function assertNoError(error: { message: string } | null) {
  if (error) throw new Error(error.message);
}

function mapGuest(row: Record<string, unknown>): Guest {
  return {
    id: String(row.id),
    name: String(row.name),
    phone: String(row.phone),
    phoneNormalized: String(row.phone_normalized),
    attending: Boolean(row.attending),
    guestCount: Number(row.guest_count),
    message: String(row.message ?? ""),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

function mapMessage(row: Record<string, unknown>): GuestbookMessage {
  return {
    id: String(row.id),
    name: String(row.name),
    message: String(row.message),
    isApproved: Boolean(row.is_approved),
    isHidden: Boolean(row.is_hidden),
    createdAt: String(row.created_at),
  };
}

function mapPhoto(row: Record<string, unknown>): Photo {
  return {
    id: String(row.id),
    title: String(row.title),
    description: String(row.description ?? ""),
    imageUrl: String(row.image_url),
    category: String(row.category),
    sortOrder: Number(row.sort_order),
    isPublic: Boolean(row.is_public),
    collection: row.collection as Photo["collection"],
    mediaType: row.media_type as Photo["mediaType"],
    createdAt: String(row.created_at),
  };
}

export class SupabaseRepository implements WeddingRepository {
  private client = createSupabaseAdminClient();

  async listPublicMessages() {
    const { data, error } = await this.client
      .from("messages")
      .select("*")
      .eq("is_approved", true)
      .eq("is_hidden", false)
      .order("created_at", { ascending: false });
    assertNoError(error);
    return (data ?? []).map(mapMessage);
  }

  async createMessage(input: MessageInput) {
    const { error } = await this.client.from("messages").insert({
      name: input.name,
      message: input.message,
    });
    assertNoError(error);
  }

  async upsertGuest(input: GuestInput) {
    const { error } = await this.client.from("guests").upsert(
      {
        name: input.name,
        phone: input.phone,
        phone_normalized: input.phoneNormalized,
        attending: input.attending,
        guest_count: input.guestCount,
        has_children: false,
        need_parking: false,
        dietary_restrictions: null,
        message: input.message,
      },
      { onConflict: "phone_normalized" },
    );
    assertNoError(error);
  }

  async listGuests() {
    const { data, error } = await this.client
      .from("guests")
      .select("*")
      .order("created_at", { ascending: false });
    assertNoError(error);
    return (data ?? []).map(mapGuest);
  }

  async listMessages() {
    const { data, error } = await this.client
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });
    assertNoError(error);
    return (data ?? []).map(mapMessage);
  }

  async updateMessage(id: string, update: MessageUpdate) {
    const { error } = await this.client
      .from("messages")
      .update({
        ...(update.isApproved === undefined
          ? {}
          : { is_approved: update.isApproved }),
        ...(update.isHidden === undefined
          ? {}
          : { is_hidden: update.isHidden }),
      })
      .eq("id", id);
    assertNoError(error);
  }

  async deleteMessage(id: string) {
    const { error } = await this.client.from("messages").delete().eq("id", id);
    assertNoError(error);
  }

  async listPhotos(collection?: Photo["collection"]) {
    let query = this.client
      .from("photos")
      .select("*")
      .order("sort_order", { ascending: true });
    if (collection) query = query.eq("collection", collection);
    const { data, error } = await query;
    assertNoError(error);
    return (data ?? []).map(mapPhoto);
  }

  async listPublicPhotos(collection?: Photo["collection"]) {
    let query = this.client
      .from("photos")
      .select("*")
      .eq("is_public", true)
      .order("sort_order", { ascending: true });
    if (collection) query = query.eq("collection", collection);
    const { data, error } = await query;
    assertNoError(error);
    return (data ?? []).map(mapPhoto);
  }

  async createPhoto(input: PhotoInput) {
    const { data, error } = await this.client
      .from("photos")
      .insert({
        title: input.title,
        description: input.description,
        image_url: input.imageUrl,
        category: input.category,
        sort_order: input.sortOrder,
        is_public: input.isPublic,
        collection: input.collection,
        media_type: input.mediaType,
      })
      .select()
      .single();
    assertNoError(error);
    return mapPhoto(data as Record<string, unknown>);
  }

  async updatePhoto(id: string, update: PhotoUpdate) {
    const { error } = await this.client
      .from("photos")
      .update({
        ...(update.title === undefined ? {} : { title: update.title }),
        ...(update.description === undefined
          ? {}
          : { description: update.description }),
        ...(update.category === undefined
          ? {}
          : { category: update.category }),
        ...(update.sortOrder === undefined
          ? {}
          : { sort_order: update.sortOrder }),
        ...(update.isPublic === undefined
          ? {}
          : { is_public: update.isPublic }),
      })
      .eq("id", id);
    assertNoError(error);
  }

  async deletePhoto(id: string) {
    const { error } = await this.client.from("photos").delete().eq("id", id);
    assertNoError(error);
  }

  async listSettings() {
    const { data, error } = await this.client
      .from("site_settings")
      .select("*")
      .order("key");
    assertNoError(error);
    return (data ?? []).map(
      (row): SiteSetting => ({
        key: row.key,
        value: row.value,
        updatedAt: row.updated_at,
      }),
    );
  }

  async updateSetting(key: string, value: unknown) {
    const { error } = await this.client
      .from("site_settings")
      .upsert({ key, value }, { onConflict: "key" });
    assertNoError(error);
  }
}
