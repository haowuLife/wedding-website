import { getAdminIdentity } from "@/lib/domain/auth";
import { createGuestsCsv } from "@/lib/domain/csv";
import { getRepository } from "@/lib/repositories";

export async function GET() {
  if (!(await getAdminIdentity())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const csv = createGuestsCsv(await getRepository().listGuests());
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="wedding-rsvp.csv"',
      "Cache-Control": "no-store",
    },
  });
}
