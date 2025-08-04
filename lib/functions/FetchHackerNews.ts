// Fetch content from Hacker News API
export default async function fetchHackerNewsContent(topic: string): Promise<string> {
  try {
    const searchUrl = `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(
      topic
    )}&tags=story&hitsPerPage=5`;
    const response = await fetch(searchUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch from Hacker News");
    }

    const data = await response.json();
    const stories = data.hits || [];

    if (stories.length === 0) {
      return "";
    }

    return `HACKER NEWS STORIES:\n${stories
      .map(
        (story: any, i: number) =>
          `${i + 1}. ${story.title} (Score: ${story.points})`
      )
      .join("\n")}`;
  } catch (error) {
    console.log("Hacker News API failed:", error);
    return "";
  }
}
