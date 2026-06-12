import { summarizeGuests } from "@/lib/domain/admin-summary";
import { getRepository } from "@/lib/repositories";

export default async function AdminDashboardPage() {
  const repository = getRepository();
  const [guests, messages, photos] = await Promise.all([
    repository.listGuests(),
    repository.listMessages(),
    repository.listPhotos(),
  ]);
  const summary = summarizeGuests(guests);
  const cards = [
    ["参加总人数", summary.attendingPeople],
    ["RSVP 回复", summary.responses],
    ["确认参加", summary.attendingResponses],
    ["遗憾缺席", summary.declinedResponses],
    ["待审核留言", messages.filter((item) => !item.isApproved).length],
    ["照片数量", photos.length],
  ];

  return (
    <div>
      <p className="text-xs tracking-[0.16em] text-black/45">OVERVIEW</p>
      <h1 className="mt-2 font-serif text-4xl tracking-[0.08em]">婚礼概览</h1>
      <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-white p-6">
            <p className="text-sm text-black/45">{label}</p>
            <p className="mt-4 font-serif text-4xl">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-6">
          <h2 className="font-serif text-2xl">现场准备提示</h2>
          <dl className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-black/50">需要停车位</dt>
              <dd>{summary.parkingSpaces} 辆</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-black/50">携带儿童的家庭</dt>
              <dd>{summary.childrenGroups} 组</dd>
            </div>
          </dl>
        </div>
        <div className="rounded-2xl bg-[#2d2924] p-6 text-white">
          <h2 className="font-serif text-2xl">下一步</h2>
          <p className="mt-5 text-sm leading-7 text-white/60">
            定期审核宾客留言，并在婚礼前一周导出最终 RSVP 名单交给酒店。
          </p>
        </div>
      </div>
    </div>
  );
}
