import { isDemoMode } from "@/lib/domain/env";

import { DemoRepository } from "./demo-repository";
import { SupabaseRepository } from "./supabase-repository";
import type { WeddingRepository } from "./types";

let repository: WeddingRepository | undefined;

export function getRepository(): WeddingRepository {
  if (!repository) {
    repository = isDemoMode()
      ? new DemoRepository()
      : new SupabaseRepository();
  }
  return repository;
}
