export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6 lg:p-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg transform rotate-45 animate-spin-slow"></div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
            Utomate
          </span>
        </div>
        <div className="hidden md:flex space-x-8">
          <a
            href="#features"
            className="hover:text-blue-300 transition-colors duration-300"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="hover:text-blue-300 transition-colors duration-300"
          >
            How it Works
          </a>
          <a
            href="#pricing"
            className="hover:text-blue-300 transition-colors duration-300"
          >
            Pricing
          </a>
        </div>
        <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25">
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent animate-gradient-x">
              Automate
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent animate-gradient-x delay-500">
              Your Social
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-slate-400 bg-clip-text text-transparent animate-gradient-x delay-1000">
              Media Magic
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-300">
            Transform trending topics into viral content with AI-powered post
            generation and stunning visuals.
            <span className="text-blue-300 font-semibold">
              10x your engagement
            </span>{" "}
            in minutes, not hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-500">
            <button className="group bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-blue-500/50">
              <span className="flex items-center justify-center space-x-2">
                <span>Start Creating</span>
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
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
              </span>
            </button>
            <button className="border-2 border-blue-400 hover:bg-blue-400/10 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto pt-12 animate-fade-in-up delay-700">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300">10x</div>
              <div className="text-sm text-gray-400">Faster Content</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-300">AI</div>
              <div className="text-sm text-gray-400">Powered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-300">24/7</div>
              <div className="text-sm text-gray-400">Trending Topics</div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-32 right-16 w-3 h-3 bg-cyan-400 rounded-full animate-bounce delay-1500"></div>
        <div className="absolute bottom-40 left-20 w-5 h-5 bg-blue-300 rounded-full animate-bounce delay-2000"></div>
        <div className="absolute bottom-60 right-12 w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-2500"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
            Powerful Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl mb-6 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">
                Smart Research
              </h3>
              <p className="text-gray-300 leading-relaxed">
                AI-powered trend detection finds the hottest topics in your
                niche from the last 3 days for maximum relevance.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl mb-6 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">
                Viral Content
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Generate engaging Facebook posts with perfect tone, hashtags,
                and emojis that drive real engagement.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-slate-400 rounded-xl mb-6 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">
                AI Visuals
              </h3>
              <p className="text-gray-300 leading-relaxed">
                FLUX.1-powered image generation creates stunning, contextual
                visuals that perfectly match your content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section
        id="how-it-works"
        className="relative z-10 py-20 px-6 bg-white/5 backdrop-blur-lg"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
            How Utomate Works
          </h2>

          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-2xl font-semibold mb-4">
                  Enter Your Niche
                </h3>
                <p className="text-gray-300">
                  Simply type your topic or industry, and our AI begins
                  researching the latest trends.
                </p>
              </div>
              <div className="flex-1 p-6 rounded-2xl bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border border-blue-500/30">
                <div className="h-16 bg-white/10 rounded-lg flex items-center px-4">
                  <span className="text-gray-400">Enter niche: "Next.js"</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="flex-1 text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-2xl font-semibold mb-4">
                  AI Magic Happens
                </h3>
                <p className="text-gray-300">
                  Our agents research trends, create engaging content, and
                  generate matching visuals automatically.
                </p>
              </div>
              <div className="flex-1 p-6 rounded-2xl bg-gradient-to-r from-cyan-900/50 to-blue-900/50 border border-cyan-500/30">
                <div className="space-y-2">
                  <div className="h-4 bg-white/20 rounded animate-pulse"></div>
                  <div className="h-4 bg-white/15 rounded animate-pulse delay-100"></div>
                  <div className="h-4 bg-white/10 rounded animate-pulse delay-200"></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-slate-500 rounded-full text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-2xl font-semibold mb-4">Ready to Post</h3>
                <p className="text-gray-300">
                  Get your viral-ready post with stunning visuals in seconds.
                  Copy, paste, and watch engagement soar!
                </p>
              </div>
              <div className="flex-1 p-6 rounded-2xl bg-gradient-to-r from-blue-900/50 to-slate-900/50 border border-blue-500/30">
                <div className="bg-white/10 rounded-lg p-4 text-left">
                  <p className="text-sm text-gray-300">
                    🚀 Level Up Your Next.js Game...
                  </p>
                  <div className="mt-2 h-20 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded border-2 border-dashed border-white/20 flex items-center justify-center">
                    <span className="text-xs text-gray-400">
                      Generated Image
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
            Ready to Go Viral?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of creators who've transformed their social media
            game with Utomate's AI-powered content creation.
          </p>
          <button className="group bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-12 py-6 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-blue-500/50">
            <span className="flex items-center justify-center space-x-3">
              <span>Start Creating Now</span>
              <svg
                className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300"
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
            </span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg transform rotate-45"></div>
            <span className="text-lg font-semibold">Utomate</span>
          </div>
          <div className="flex space-x-6 text-gray-400">
            <a
              href="#"
              className="hover:text-blue-300 transition-colors duration-300"
            >
              Privacy
            </a>
            <a
              href="#"
              className="hover:text-blue-300 transition-colors duration-300"
            >
              Terms
            </a>
            <a
              href="#"
              className="hover:text-blue-300 transition-colors duration-300"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
