/**
 * Cloudinary Media Management Utility
 * Allows the agency to store, optimize, and serve high-resolution campaign assets,
 * video reels, and client logos with automatic responsive sizing and WebP/AVIF delivery.
 */

export interface CloudinaryConfig {
  cloudName?: string;
  apiKey?: string;
  apiSecret?: string;
}

export function getCloudinaryImageUrl(
  publicIdOrUrl: string,
  options?: {
    width?: number;
    height?: number;
    quality?: string | number;
    crop?: "fill" | "scale" | "fit" | "thumb";
    format?: "auto" | "webp" | "avif";
  }
): string {
  // If it's already an absolute URL (like Unsplash), return as is
  if (publicIdOrUrl.startsWith("http://") || publicIdOrUrl.startsWith("https://")) {
    return publicIdOrUrl;
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "snapsee-agency";
  const { width, height, quality = "auto", crop = "fill", format = "auto" } = options || {};

  const transformations: string[] = [];
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop) transformations.push(`c_${crop}`);
  if (quality) transformations.push(`q_${quality}`);
  if (format) transformations.push(`f_${format}`);

  const transformString = transformations.length > 0 ? transformations.join(",") + "/" : "";
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}${publicIdOrUrl}`;
}

