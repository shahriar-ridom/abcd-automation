import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { GoogleCustomSearch } from "@langchain/community/tools/google_custom_search";
import { ChatOpenRouter } from "@/lib/openrouter";
import { AgentExecutor, createReactAgent } from "langchain/agents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Together } from "together-ai/client";

// Simple in-memory cache and rate limiting
const cache = new Map();
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3; // Max 3 requests per minute
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes cache

// Rate limiting function
function checkRateLimit(clientId: string): boolean {
  const now = Date.now();
  const clientData = rateLimitMap.get(clientId) || {
    requests: [],
    lastReset: now,
  };

  // Remove old requests outside the window
  clientData.requests = clientData.requests.filter(
    (timestamp: number) => now - timestamp < RATE_LIMIT_WINDOW
  );

  // Check if under limit
  if (clientData.requests.length >= MAX_REQUESTS_PER_WINDOW) {
    return false; // Rate limit exceeded
  }

  // Add current request
  clientData.requests.push(now);
  rateLimitMap.set(clientId, clientData);
  return true;
}

// Cache function
function getCachedResult(key: string) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
}

function setCachedResult(key: string, data: any) {
  cache.set(key, { data, timestamp: Date.now() });
}

export async function POST(request: NextRequest) {
  try {
    // Get IP address for rate limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded
      ? forwarded.split(",")[0]
      : request.headers.get("x-real-ip") || "unknown";

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          error:
            "Rate limit exceeded. Please wait before making another request.",
          retryAfter: "3 minutes",
        },
        { status: 429 }
      );
    }

    const { niche } = await request.json();

    if (!niche) {
      return NextResponse.json({ error: "Niche is required" }, { status: 400 });
    }

    // Check if we have cached results for this niche
    const cacheKey = `niche_${niche.toLowerCase().replace(/\s+/g, "_")}`;
    const cachedResult = getCachedResult(cacheKey);

    if (cachedResult) {
      console.log("Returning cached result for niche:", niche);
      return NextResponse.json(cachedResult);
    }

    console.log("Processing new request for niche:", niche);

    // Initialize API clients
    const api_key = process.env.OPENROUTER_API_KEY;
    const google_api_key = process.env.GOOGLE_API_KEY;
    const google_cse_id = process.env.GOOGLE_CSE_ID;
    const together_api_key = process.env.TOGETHER_API_KEY;

    if (!api_key || !google_api_key || !google_cse_id || !together_api_key) {
      return NextResponse.json(
        { error: "Missing required API keys" },
        { status: 500 }
      );
    }

    const search = new GoogleCustomSearch({
      apiKey: google_api_key,
      googleCSEId: google_cse_id,
    });

    const together = new Together({
      apiKey: together_api_key,
    });

    // Define the Google search tool with enhanced caching
    const searchTool = tool(
      async (query) => {
        try {
          // Check cache for search results
          const searchCacheKey = `search_${query
            .toLowerCase()
            .replace(/\s+/g, "_")}`;
          const cachedSearch = getCachedResult(searchCacheKey);
          if (cachedSearch) {
            console.log("Using cached search results for:", query);
            return cachedSearch;
          }

          console.log("Performing Google search for:", query);

          // Calculate date range for last 3 days
          const today = new Date();
          const threeDaysAgo = new Date(today);
          threeDaysAgo.setDate(today.getDate() - 3);

          const formatDate = (date: Date) => {
            return date.toISOString().split("T")[0]; // YYYY-MM-DD format
          };

          const results = await search.invoke({
            query: query,
            // Limit to last 3 days using date range
            dateRestrict: "d3", // Last 3 days
            // Limit number of results to save API quota
            num: 3, // Reduced from 5 to 3 to save quota
            // Sort by date to get most recent first
            sort: "date",
          });

          console.log("Google search results (limited):", results);

          // Further trim the results to keep only essential info
          let processedResults;
          if (typeof results === "string") {
            // If results is a string, truncate it to save token usage
            processedResults =
              results.length > 800
                ? results.substring(0, 800) + "... (truncated for efficiency)"
                : results;
          } else {
            processedResults = results;
          }

          // Cache the search results
          setCachedResult(searchCacheKey, processedResults);

          return processedResults;
        } catch (error) {
          console.error("Error during Google search:", error);
          return "Failed to perform Google search. Please try a different query.";
        }
      },
      {
        name: "google_search",
        description:
          "Searches Google for trending topics from the last 3 days only. Returns recent, relevant results to save API quota.",
        schema: z
          .string()
          .describe(
            "The search query to look for recent trending topics on Google."
          ),
      }
    );

    const generateImageTool = tool(
      async (prompt: string) => {
        try {
          // Check cache for image generation results
          const imageCacheKey = `image_${prompt
            .toLowerCase()
            .replace(/\s+/g, "_")
            .substring(0, 50)}`;
          const cachedImage = getCachedResult(imageCacheKey);
          if (cachedImage) {
            console.log("Using cached image generation result");
            return cachedImage;
          }

          console.log("Generating image for prompt:", prompt);

          // Add a small delay to prevent hitting rate limits
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const response = await together.images.create({
            model: "black-forest-labs/FLUX.1-schnell-Free",
            prompt: `${prompt}`,
          });

          if (response.data && response.data[0]) {
            const imageData = response.data[0];
            let result;

            // Check if it's base64 format
            if ("b64_json" in imageData && imageData.b64_json) {
              const base64Image = imageData.b64_json;
              const imageUrl = `data:image/png;base64,${base64Image}`;
              result = `Image generated successfully: ${imageUrl}`;
            }
            // Check if it's URL format
            else if ("url" in imageData && imageData.url) {
              result = `Image generated successfully: ${imageData.url}`;
            }

            if (result) {
              // Cache the successful result
              setCachedResult(imageCacheKey, result);
              return result;
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
      maxIterations: 10,
      verbose: true,
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

    const response = {
      content: result.output || "No content generated",
      imageUrl: imageUrl,
      niche: niche,
    };

    // Cache the successful result
    setCachedResult(cacheKey, response);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
