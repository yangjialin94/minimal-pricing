import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "project-data.json");
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const projectData = JSON.parse(fileContent);

    return NextResponse.json(projectData);
  } catch (error) {
    console.error("Error loading project data:", error);
    return new NextResponse("Failed to load project data", { status: 500 });
  }
}
