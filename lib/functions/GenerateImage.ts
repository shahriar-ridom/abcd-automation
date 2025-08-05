import Together from "together-ai";
import { ChatOpenRouter } from "../openrouter";

export default async function GenerateImage(post: string) {
  try {
    // Check if API key is available
    if (!process.env.TOGETHER_API_KEY) {
      console.log("No Together AI API key provided");
      return { imageUrl: null, error: "No API key configured" };
    }

    const together = new Together({
      apiKey: process.env.TOGETHER_API_KEY,
    });
    const llm = ChatOpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY || "",
      modelName: "deepseek/deepseek-r1-0528:free",
    });
    const prompt = `What is the topic of this social media post: ${post}? Create a prompt to generate a thumbnail image related to this post. Output should be only the prompt, not any additional text or explanations.`;

    console.log("Generating topic prompt for Together AI...");

    const topicResponse = await llm.invoke(prompt);
    const topicContent = topicResponse.content;

    console.log("Topic Response:", topicContent);

    console.log("Generating image with Together AI FLUX model...");

    const response = await together.images.create({
      model: "black-forest-labs/FLUX.1-schnell-Free",
      prompt: `${topicContent}`,
    });

    console.log("Together AI Response:", response);

    if (response.data && response.data[0]) {
      const imageData = response.data[0];

      // Check if it's base64 format
      if ("b64_json" in imageData && imageData.b64_json) {
        const base64Image = imageData.b64_json;
        const imageUrl = `data:image/png;base64,${base64Image}`;
        return { imageUrl };
      }

      // Check if it's URL format
      if ("url" in imageData && imageData.url) {
        return { imageUrl: imageData.url };
      }
    } else {
      console.error("No image data in Together AI response");
      return { imageUrl: null, error: "No image data received" };
    }
  } catch (error) {
    console.error("Error generating image with Together AI:", error);
    return { imageUrl: null, error: "Failed to generate image" };
  }
}
