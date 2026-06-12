import { MessageManager } from "@/components/admin/message-manager";
import { getRepository } from "@/lib/repositories";

export default async function MessagesPage() {
  const messages = await getRepository().listMessages();
  return (
    <div>
      <p className="text-xs tracking-[0.16em] text-black/45">GUESTBOOK</p>
      <h1 className="mt-2 font-serif text-4xl tracking-[0.08em]">留言审核</h1>
      <MessageManager initialMessages={messages} />
    </div>
  );
}
