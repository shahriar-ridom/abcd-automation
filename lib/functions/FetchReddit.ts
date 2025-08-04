// Fetch content from Reddit API
export default async function fetchRedditContent(
  topic: string
): Promise<string> {
  try {
    const searchUrl = `https://www.reddit.com/r/programming/search.json?q=${encodeURIComponent(
      topic
    )}&sort=hot&limit=5`;
    const response = await fetch(searchUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch from Reddit");
    }

    const data = await response.json();
    const posts = data.data?.children || [];

    if (posts.length === 0) {
      return "";
    }

    return `REDDIT DISCUSSIONS:\n${posts
      .map(
        (post: any, i: number) =>
          `${i + 1}. ${post.data.title} (Score: ${post.data.score})`
      )
      .join("\n")}`;
  } catch (error) {
    console.log("Reddit API failed:", error);
    return "";
  }
}
