import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { updatePhoto } = vi.hoisted(() => ({
  updatePhoto: vi.fn(),
}));

vi.mock("@/lib/domain/auth", () => ({
  getAdminIdentity: vi.fn().mockResolvedValue({
    email: "owner@example.com",
  }),
}));

vi.mock("@/lib/repositories", () => ({
  getRepository: () => ({ updatePhoto }),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

import { PATCH } from "@/app/api/admin/photos/[id]/route";

beforeEach(() => {
  updatePhoto.mockReset();
});

describe("PATCH /api/admin/photos/:id", () => {
  it("accepts optional English metadata including null fallbacks", async () => {
    const request = new NextRequest(
      "http://localhost:3000/api/admin/photos/photo-1",
      {
        method: "PATCH",
        headers: {
          origin: "http://localhost:3000",
          host: "localhost:3000",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          titleEn: "Morning Light",
          descriptionEn: null,
        }),
      },
    );

    const response = await PATCH(request, {
      params: Promise.resolve({ id: "photo-1" }),
    });

    expect(response.status).toBe(200);
    expect(updatePhoto).toHaveBeenCalledWith("photo-1", {
      titleEn: "Morning Light",
      descriptionEn: null,
    });
  });
});
