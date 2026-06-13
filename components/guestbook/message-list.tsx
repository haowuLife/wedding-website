import { getRepository } from "@/lib/repositories";

export async function MessageList() {
  const messages = await getRepository().listPublicMessages();

  return (
    <div className="grid gap-5">
      {messages.map((message) => (
        <article
          key={message.id}
          className="romantic-card border border-[var(--color-line)] bg-white p-6 sm:p-8"
        >
          <p className="font-serif text-xl leading-9 tracking-[0.04em]">
            “{message.message}”
          </p>
          <p className="mt-5 text-sm tracking-[0.14em] text-[var(--color-coral-deep)]">
            — {message.name}
          </p>
        </article>
      ))}
    </div>
  );
}
