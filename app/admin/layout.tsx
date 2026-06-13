import { DocumentLocale } from "@/components/i18n/document-locale";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DocumentLocale locale="zh" />
      <div lang="zh-CN">{children}</div>
    </>
  );
}
