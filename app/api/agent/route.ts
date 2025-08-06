import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { GoogleCustomSearch } from "@langchain/community/tools/google_custom_search";
import { ChatOpenRouter } from "@/lib/openrouter";
import { AgentExecutor, createReactAgent } from "langchain/agents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Together } from "together-ai/client";

export async function POST(req: NextRequest) {
  try {
    const { niche } = await req.json();

    const api_key = process.env.OPENROUTER_API_KEY;

    // Check if API key is available
    if (!process.env.TOGETHER_API_KEY) {
      console.log("No Together AI API key provided");
      return { imageUrl: null, error: "No API key configured" };
    }

    if (!api_key) {
      return NextResponse.json(
        { error: "API key is missing" },
        { status: 500 }
      );
    }

    const search = new GoogleCustomSearch({
      apiKey: process.env.GOOGLE_API_KEY,
      googleCSEId: process.env.GOOGLE_CSE_ID,
    });

    const together = new Together({
      apiKey: process.env.TOGETHER_API_KEY,
    });

    // Define the Google search tool
    const searchTool = tool(
      async (query) => {
        try {
          console.log("Performing Google search for:", query);

          const results = await search.invoke({ query });
          console.log("Google search results:", results);
          return results;
        } catch (error) {
          console.error("Error during Google search:", error);
          return { error: "Failed to perform Google search" };
        }
      },
      {
        name: "google_search",
        description:
          "Searches Google for the given query and returns the top results.",
        schema: z.string().describe("The search query to look for on Google."),
      }
    );

    const generateImageTool = tool(
      async (prompt: string) => {
        try {
          const response = await together.images.create({
            model: "black-forest-labs/FLUX.1-schnell-Free",
            prompt: `${prompt}`,
          });
          if (response.data && response.data[0]) {
            const imageData = response.data[0];

            // Check if it's base64 format
            if ("b64_json" in imageData && imageData.b64_json) {
              const base64Image = imageData.b64_json;
              const imageUrl = `data:image/png;base64,${base64Image}`;
              return `Image generated successfully: ${imageUrl}`;
            }

            // Check if it's URL format
            if ("url" in imageData && imageData.url) {
              return `Image generated successfully: ${imageData.url}`;
            }
          } else {
            console.error("No image data in Together AI response");
            return "Failed to generate image: No image data received";
          }
        } catch (error) {
          console.error("Error generating image:", error);
          return (
            "Failed to generate image: " +
            (error instanceof Error ? error.message : "Unknown error")
          );
        }
      },
      {
        name: "generate_image",
        description:
          "Generates an image based on the given prompt. Returns a message with the image URL or error.",
        schema: z.string().describe("The prompt to generate an image."),
      }
    );

    const tools = [searchTool, generateImageTool];

    const llm = ChatOpenRouter({
      modelName: "google/gemini-2.0-flash-exp:free",
      apiKey: api_key,
    });

    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        "You are a Social Media Expert that MUST use tools to complete tasks.\n\nYour workflow:\n1. FIRST: Use google_search tool to find trending topics\n2. SECOND: Use generate_image tool to create an image\n3. THIRD: Provide Final Answer with ONLY the Facebook post content\n\nYou have access to the following tools: {tools}\nTool names: {tool_names}\n\nYou MUST follow this EXACT format:\n\nThought: I need to search for trending topics first\nAction: google_search\nAction Input: trending topics query here\nObservation: [search results will appear here]\nThought: Now I need to generate an image\nAction: generate_image\nAction Input: image prompt here\nObservation: [image result will appear here]\nThought: Now I can create the Facebook post\nFinal Answer: [ONLY the Facebook post text - DO NOT include image URLs or generation messages]\n\nIMPORTANT: Your Final Answer should ONLY contain the Facebook post content. Do NOT include any image URLs, generation messages, or references to the image in the Final Answer. The image is handled separately.",
      ],
      ["placeholder", "{chat_history}"],
      ["human", "{input}"],
      ["placeholder", "{agent_scratchpad}"],
    ]);

    const agent = await createReactAgent({
      llm,
      tools,
      prompt,
    });

    const agentExecutor = new AgentExecutor({
      agent,
      tools,
      maxIterations: 5, // Increased to allow for both search and image generation
      returnIntermediateSteps: true, // Enable to capture tool outputs
      verbose: true, // Enable verbose logging
    });

    const result = await agentExecutor.invoke({
      input: `Search for trending topics in ${niche} and create a Facebook post about the most interesting one. You MUST also generate an image for the post using the generate_image tool.`,
    });
    console.log("Agent execution result:", result);
    console.log(
      "Intermediate steps:",
      JSON.stringify(result.intermediateSteps, null, 2)
    );

    // Extract image URL from intermediate steps
    let imageUrl = null;
    if (result.intermediateSteps) {
      for (const step of result.intermediateSteps) {
        if (step.action?.tool === "generate_image" && step.observation) {
          const observation = step.observation;
          // Extract URL from the observation string
          const urlMatch = observation.match(
            /Image generated successfully: (.*)/
          );
          if (urlMatch && urlMatch[1]) {
            imageUrl = urlMatch[1];
            break;
          }
        }
      }
    }

    return NextResponse.json({
      post: result.output,
      imageUrl: imageUrl,
    });
  } catch (error) {
    console.error("Error in agent route:", error);
    return NextResponse.json(
      {
        error: "Failed to generate post",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
