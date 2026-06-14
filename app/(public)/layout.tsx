import { DocumentLocale } from "@/components/i18n/document-locale";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getSiteContent } from "@/lib/content/settings";
import { getLocale } from "@/lib/i18n/locale";
import { getMessages } from "@/lib/i18n/messages";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const content = await getSiteContent(locale);
  const messages = getMessages(locale);

  return (
    <div className="public-site">
      <DocumentLocale locale={locale} />
      <SiteHeader
        locale={locale}
        navigation={content.navigation}
        messages={messages}
      />
      {children}
      <SiteFooter content={content} messages={messages} />
    </div>
  );
}
