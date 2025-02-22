import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://www.minimalpricing.com/"; // Change to your actual domain

  // Define the static pages
  const staticPages = ["/", "/overview", "/profit", "/tasks", "/users"];

  // Generate the sitemap XML content
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map(
          (path) => `
        <url>
          <loc>${baseUrl}${path}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <priority>${path === "/" ? 1.0 : 0.8}</priority>
        </url>`
        )
        .join("")}
    </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
