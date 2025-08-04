import { ChatOpenAI } from "@langchain/openai";

interface ChatOpenRouterProps {
  modelName: string;
  apiKey: string;
}

export const ChatOpenRouter = ({ modelName, apiKey }: ChatOpenRouterProps) => {
  return new ChatOpenAI({
    modelName: modelName,
    apiKey: apiKey,
    configuration: {
      baseURL: "https://openrouter.ai/api/v1",
    },
  });
};
