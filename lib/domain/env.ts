export type DataMode = "demo" | "supabase";

type Environment = Record<string, string | undefined>;

export function getDataMode(environment: Environment): DataMode {
  return environment.NEXT_PUBLIC_SUPABASE_URL &&
    environment.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    environment.SUPABASE_SERVICE_ROLE_KEY
    ? "supabase"
    : "demo";
}

export function isDemoMode(): boolean {
  return getDataMode(process.env) === "demo";
}
