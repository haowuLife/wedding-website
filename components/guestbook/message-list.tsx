import { getRepository } from "@/lib/repositories";

export async function MessageList() {
  const messages = await getRepository().listPublicMessages();

  return (
    <div className="grid gap-x-14 gap-y-0 md:grid-cols-2">
      {messages.map((message) => (
        <article
          key={message.id}
          className="border-b border-[var(--color-line)] py-8"
        >
          <p className="font-serif text-xl leading-9 tracking-[0.04em]">
            “{message.message}”
          </p>
          <p className="mt-4 text-sm tracking-[0.14em] text-[var(--color-champagne)]">
            — {message.name}
          </p>
        </article>
      ))}
    </div>
  );
}
