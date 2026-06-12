export function isAllowedVideoUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      /\.(mp4|webm|m4v)$/i.test(url.pathname)
    );
  } catch {
    return false;
  }
}
