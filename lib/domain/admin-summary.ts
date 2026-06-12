import type { Guest } from "@/lib/repositories/types";

export function summarizeGuests(guests: Guest[]) {
  return guests.reduce(
    (summary, guest) => ({
      responses: summary.responses + 1,
      attendingResponses:
        summary.attendingResponses + (guest.attending ? 1 : 0),
      declinedResponses:
        summary.declinedResponses + (guest.attending ? 0 : 1),
      attendingPeople:
        summary.attendingPeople + (guest.attending ? guest.guestCount : 0),
      parkingSpaces: summary.parkingSpaces + (guest.needParking ? 1 : 0),
      childrenGroups: summary.childrenGroups + (guest.hasChildren ? 1 : 0),
    }),
    {
      responses: 0,
      attendingResponses: 0,
      declinedResponses: 0,
      attendingPeople: 0,
      parkingSpaces: 0,
      childrenGroups: 0,
    },
  );
}
