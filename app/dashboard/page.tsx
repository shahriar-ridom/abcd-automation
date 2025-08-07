"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/card";
import { getPostsFromDB, savePostToDB } from "@/lib/db";

const Dashboard = () => {
  const [niche, setNiche] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPosts, setGeneratedPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPostsFromDB();
      setGeneratedPosts(posts);
    };
    fetchPosts();
  }, []);

  const handleGeneratePost = async () => {
    if (!niche.trim()) {
      alert("Please enter a niche or topic to generate content.");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ niche }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate post");
      }

      const data = await response.json();
      savePostToDB({
        niche,
        content: data.post,
        imageUrl: data.imageUrl,
      });
    } catch (error) {
      console.error("Error generating post:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 text-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Navigation Header */}
      <nav className="relative z-10 flex justify-between items-center p-6 lg:p-8 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg transform rotate-45 animate-spin-slow"></div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
            Utomate
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-gray-300">Dashboard</span>
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto p-6 lg:p-8">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
            Content Dashboard
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Generate viral social media content with AI-powered insights and
            stunning visuals
          </p>
        </div>

        {/* Generation Section */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 mb-12 animate-fade-in-up delay-300">
          <div className="max-w-2xl mx-auto">
            {/* Niche Input */}
            <div className="mb-6">
              <label
                htmlFor="niche"
                className="block text-sm font-medium text-gray-300 mb-3"
              >
                Enter Your Niche or Topic
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
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
                </div>
                <input
                  id="niche"
                  type="text"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleGeneratePost()}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-lg"
                  placeholder="e.g., Web Development, AI Technology, Digital Marketing..."
                />
              </div>
              <p className="mt-2 text-sm text-gray-400">
                💡 Tip: Be specific about your topic for better content
                generation
              </p>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGeneratePost}
              disabled={isGenerating}
              className={`group relative w-full flex justify-center items-center py-4 px-6 border border-transparent text-lg font-semibold rounded-xl text-white transition-all duration-300 transform shadow-xl ${
                isGenerating
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 hover:scale-105 hover:shadow-blue-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
              }`}
            >
              <span className="flex items-center space-x-3">
                {isGenerating ? (
                  <>
                    <svg
                      className="h-5 w-5 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Generating Amazing Content...</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="h-5 w-5 group-hover:scale-110 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <span>Generate Viral Post</span>
                    <svg
                      className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </div>
        </div>

        {/* Generated Posts Section */}
        <div className="animate-fade-in-up delay-500">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
              Generated Posts
            </h2>
            <div className="flex items-center space-x-2 text-gray-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <span>{generatedPosts.length} posts created</span>
            </div>
          </div>

          {/* Posts Grid */}
          {generatedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {generatedPosts.map((post, index) => (
                <Card
                  key={post.$id}
                  image={post.imageUrl}
                  content={post.content}
                  niche={post.niche}
                  createdAt={post.createdAt}
                  className={`animate-fade-in-up delay-${index * 100}`}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-blue-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                No posts generated yet
              </h3>
              <p className="text-gray-400">
                Enter a niche above and click generate to create your first
                viral post!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-36 left-8 w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-1000 z-0"></div>
      <div className="absolute top-80 right-20 w-3 h-3 bg-cyan-400 rounded-full animate-bounce delay-1500 z-0"></div>
      <div className="absolute bottom-32 left-16 w-5 h-5 bg-blue-300 rounded-full animate-bounce delay-2000 z-0"></div>
      <div className="absolute bottom-20 right-8 w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-2500 z-0"></div>
    </div>
  );
};

export default Dashboard;
