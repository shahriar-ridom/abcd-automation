import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenRouter } from "@/lib/openrouter";
import fetchHackerNewsContent from "./FetchHackerNews";
import fetchRedditContent from "./FetchReddit";
import fetchTrendingTopics from "./FetchTrends";

export default async function CreatePostAgent(topic: string) {
  const openRouterApiKey = process.env.OPENROUTER_API_KEY;
  if (!openRouterApiKey) {
    throw new Error("OPENROUTER_API_KEY is not set");
  }

  // Initialize the LLM with the OpenRouter API key and model
  const llm = ChatOpenRouter({
    apiKey: openRouterApiKey,
    modelName: "deepseek/deepseek-r1-0528:free",
  });

  console.log(`Starting content fetching for topic: ${topic}`);

  try {
    // Fetch content from multiple sources in parallel
    const contentResults = await Promise.allSettled([
      // Fetch from Hacker News API
      fetchHackerNewsContent(topic),
      // Fetch from Reddit (programming subreddit)
      fetchRedditContent(topic),
      // Simple search simulation
      fetchTrendingTopics(topic),
    ]);

    // Extract successful results
    const allContent: string[] = [];
    contentResults.forEach((result, index) => {
      if (result.status === "fulfilled" && result.value) {
        allContent.push(result.value);
      } else {
        console.log(
          `Content fetching failed for source ${index}:`,
          result.status === "rejected" ? result.reason : "No content"
        );
      }
    });

    const combinedContent = allContent.join("\n\n");
    console.log("Combined fetched content:", combinedContent);

    if (!combinedContent.trim()) {
      throw new Error("No content found from any source");
    }

    // Use combined fetched data to generate the post
    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        "You are an expert social media manager and trend researcher. Your task is to analyze content about a topic, then create a compelling Facebook post based on the most interesting trending information you find. Output should be only the post. Not any additional text or explanations or anything else. Also you won't include any links in the post.",
      ],
      [
        "user",
        `I found these trending discussions and news about "${topic}":

${combinedContent}

Please:
1. Analyze the content to identify the most interesting/trending topic
2. Pick the most compelling trend from the content
3. Create an engaging Facebook post about that trending topic
4. Include relevant hashtags and a call to action
5. Make it suitable for a Facebook audience
6. Output only the post content without any additional text or explanations
7. Ensure the post is concise, engaging, and encourages interaction
8. Use a friendly and approachable tone
9. Use emojis to enhance engagement
10. The post should be in English
11. Output should be only the post. Not any additional text or explanations or anything else.`,
      ],
    ]);

    const formattedPrompt = await prompt.format({});
    const response = await llm.invoke(formattedPrompt);
    return response;
  } catch (error) {
    console.error("Error in CreatePostAgent:", error);
    throw error;
  }
}
