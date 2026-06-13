import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { updateSetting } = vi.hoisted(() => ({
  updateSetting: vi.fn(),
}));

vi.mock("@/lib/domain/auth", () => ({
  getAdminIdentity: vi.fn().mockResolvedValue({
    email: "owner@example.com",
  }),
}));

vi.mock("@/lib/repositories", () => ({
  getRepository: () => ({ updateSetting }),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

import { PATCH } from "@/app/api/admin/settings/route";

function settingsRequest(key: string, value: unknown) {
  return new NextRequest("http://localhost:3000/api/admin/settings", {
    method: "PATCH",
    headers: {
      origin: "http://localhost:3000",
      host: "localhost:3000",
      "content-type": "application/json",
    },
    body: JSON.stringify({ key, value }),
  });
}

beforeEach(() => {
  updateSetting.mockReset();
});

describe("PATCH /api/admin/settings", () => {
  it("accepts localized English content keys", async () => {
    const response = await PATCH(
      settingsRequest("site.transport.en", {
        items: [],
        holidayNote: "Thank you for making the journey.",
      }),
    );

    expect(response.status).toBe(200);
    expect(updateSetting).toHaveBeenCalledWith("site.transport.en", {
      items: [],
      holidayNote: "Thank you for making the journey.",
    });
  });

  it("rejects unknown setting keys", async () => {
    const response = await PATCH(
      settingsRequest("site.private", { enabled: true }),
    );

    expect(response.status).toBe(400);
    expect(updateSetting).not.toHaveBeenCalled();
  });
});
