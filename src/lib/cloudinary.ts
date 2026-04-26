const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export type CloudinaryTransforms = {
  width?: number;
  height?: number;
  quality?: number | "auto";
  format?: "auto" | "webp" | "jpg" | "png" | "avif";
  crop?: "fill" | "fit" | "scale" | "thumb" | "limit";
  gravity?: "auto" | "face" | "faces" | "center";
  dpr?: number | "auto";
};

/**
 * Construit une URL Cloudinary optimisée.
 * Exemple: cloudinaryUrl("bruux/hero-night-class", { width: 1920, height: 1080 })
 */
export function cloudinaryUrl(
  publicId: string,
  transforms: CloudinaryTransforms = {},
): string {
  if (!CLOUD_NAME) {
    throw new Error(
      "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME n'est pas défini dans .env.local",
    );
  }

  const {
    width,
    height,
    quality = "auto",
    format = "auto",
    crop = "fill",
    gravity = "auto",
    dpr = "auto",
  } = transforms;

  const parts: string[] = [`f_${format}`, `q_${quality}`, `dpr_${dpr}`];
  if (width) parts.push(`w_${width}`);
  if (height) parts.push(`h_${height}`);
  if (width || height) parts.push(`c_${crop}`, `g_${gravity}`);

  const cleanId = publicId.replace(/^\/+/, "");
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${parts.join(",")}/${cleanId}`;
}

/**
 * Loader pour <Image> de Next.js. Usage:
 *   <Image src="bruux/hero.jpg" loader={cloudinaryLoader} ... />
 */
export function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  return cloudinaryUrl(src, {
    width,
    quality: quality ?? "auto",
  });
}
