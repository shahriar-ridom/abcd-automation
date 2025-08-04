import CreatePostAgent from "@/lib/functions/CreatePostAgent";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const response = await CreatePostAgent(messages);
    return NextResponse.json({ content: { output: response }, status: 200 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({
      content: { error: "Failed to create post" },
      status: 500,
    });
  }
}
