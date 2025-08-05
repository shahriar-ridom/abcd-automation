import GenerateImage from "@/lib/functions/GenerateImage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { post } = await req.json();
    const response = await GenerateImage(post);
    return NextResponse.json({ content: { output: response }, status: 200 });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json({
      content: { error: "Failed to generate image" },
      status: 500,
    });
  }
}
