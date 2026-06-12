import { describe, expect, it } from "vitest";

import { DemoRepository } from "@/lib/repositories/demo-repository";

describe("DemoRepository", () => {
  it("returns only approved and visible messages to public readers", async () => {
    const repository = new DemoRepository({
      messages: [
        {
          id: "approved",
          name: "清清",
          message: "祝福你们",
          isApproved: true,
          isHidden: false,
          createdAt: "2026-06-01T00:00:00.000Z",
        },
        {
          id: "pending",
          name: "阿山",
          message: "等待审核",
          isApproved: false,
          isHidden: false,
          createdAt: "2026-06-02T00:00:00.000Z",
        },
        {
          id: "hidden",
          name: "小叶",
          message: "已隐藏",
          isApproved: true,
          isHidden: true,
          createdAt: "2026-06-03T00:00:00.000Z",
        },
      ],
    });

    await expect(repository.listPublicMessages()).resolves.toEqual([
      expect.objectContaining({ id: "approved" }),
    ]);
  });
});
