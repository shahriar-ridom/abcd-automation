// Generate trending topics based on the input topic
export default async function fetchTrendingTopics(
  topic: string
): Promise<string> {
  // This simulates finding trending topics related to the input
  const trendingTopics = [
    `Latest ${topic} frameworks and tools gaining popularity`,
    `${topic} best practices and optimization techniques`,
    `Emerging trends in ${topic} development`,
    `${topic} industry news and updates`,
    `Popular ${topic} projects and innovations`,
  ];

  return `TRENDING TOPICS:\n${trendingTopics
    .slice(0, 3)
    .map((topic: string, i: number) => `${i + 1}. ${topic}`)
    .join("\n")}`;
}
