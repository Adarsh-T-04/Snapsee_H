
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.snapseeh.site";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/admin/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
