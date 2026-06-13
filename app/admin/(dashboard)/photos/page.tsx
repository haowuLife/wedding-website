import { PhotoManager } from "@/components/admin/photo-manager";
import { getDisplayAllPhotos } from "@/lib/repositories/photo-service";

export default async function PhotosPage() {
  const photos = await getDisplayAllPhotos();
  return (
    <div>
      <p className="text-xs tracking-[0.16em] text-black/45">MEDIA</p>
      <h1 className="mt-2 font-serif text-4xl tracking-[0.08em]">
        照片管理
      </h1>
      <p className="mt-3 text-sm leading-7 text-black/50">
        英文标题与说明均为可选；留空时英文页面会自动显示中文内容。
      </p>
      <PhotoManager photos={photos} />
    </div>
  );
}
