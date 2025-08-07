import React from "react";
import Image from "next/image";

interface CardProps {
  image: string;
  imageAlt?: string;
  content: string;
  niche: string;
  createdAt?: string;
  className?: string;
}

export default function Card({
  image,
  imageAlt = "Post thumbnail",
  content,
  niche,
  createdAt,
  className = "",
}: CardProps) {
  // Truncate content if it's too long
  const truncatedContent =
    content.length > 200 ? content.substring(0, 200) + "..." : content;

  // Format date if provided
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div
      className={`group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 animate-fade-in-up ${className}`}
    >
      {/* Image Thumbnail */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/80 backdrop-blur-sm text-white border border-blue-400/30">
            <svg
              className="w-3 h-3 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            {niche}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Post Content */}
        <div className="mb-4">
          <p className="text-gray-200 leading-relaxed text-sm group-hover:text-white transition-colors duration-300">
            {truncatedContent}
          </p>
        </div>

        {/* Footer with Date and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          {/* Date */}
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{createdAt ? formatDate(createdAt) : "Recently"}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* View Button */}
            <button className="group/btn flex items-center space-x-1 text-xs text-gray-400 hover:text-blue-300 transition-colors duration-300">
              <svg
                className="w-3 h-3 group-hover/btn:scale-110 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span>View</span>
            </button>

            {/* Copy Button */}
            <button className="group/btn flex items-center space-x-1 text-xs text-gray-400 hover:text-cyan-300 transition-colors duration-300">
              <svg
                className="w-3 h-3 group-hover/btn:scale-110 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>Copy</span>
            </button>

            {/* Share Button */}
            <button className="group/btn flex items-center space-x-1 text-xs text-gray-400 hover:text-blue-400 transition-colors duration-300">
              <svg
                className="w-3 h-3 group-hover/btn:scale-110 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                />
              </svg>
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-cyan-500/5 group-hover:to-blue-500/10 transition-all duration-500 pointer-events-none"></div>
    </div>
  );
}

// Example usage component for demonstration
export function CardExample() {
  const sampleCards = [
    {
      image: "/api/placeholder/400/300",
      content:
        "🚀 Exciting news! Next.js 15 just dropped with incredible new features that will revolutionize how we build modern web applications. The App Router improvements are game-changing! #NextJS #WebDev #React",
      niche: "Web Development",
      createdAt: "2024-12-20",
    },
    {
      image: "/api/placeholder/400/300",
      content:
        "AI is transforming the way we create content. Here's how to leverage machine learning for your next social media campaign and boost engagement by 300%! 🤖✨ #AI #Marketing #SocialMedia",
      niche: "AI & Technology",
      createdAt: "2024-12-19",
    },
    {
      image: "/api/placeholder/400/300",
      content:
        "The future of design is here! These minimalist UI trends are taking over 2024. Clean layouts, subtle animations, and perfect typography create amazing user experiences. 🎨",
      niche: "Design",
      createdAt: "2024-12-18",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
          Generated Posts
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleCards.map((card, index) => (
            <Card
              key={index}
              image={card.image}
              content={card.content}
              niche={card.niche}
              createdAt={card.createdAt}
              className={`delay-${index * 200}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
