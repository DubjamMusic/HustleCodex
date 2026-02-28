import { ArrowRight, Zap, Grid3x3, Code2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-gray-100 overflow-hidden">
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(0,217,255,0.05)_25%,rgba(0,217,255,0.05)_26%,transparent_27%,transparent_74%,rgba(0,217,255,0.05)_75%,rgba(0,217,255,0.05)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(0,217,255,0.05)_25%,rgba(0,217,255,0.05)_26%,transparent_27%,transparent_74%,rgba(0,217,255,0.05)_75%,rgba(0,217,255,0.05)_76%,transparent_77%,transparent)]"
          style={{ backgroundSize: "60px 60px" }}
        />
      </div>

      {/* Glowing orbs */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-cyan-500/20 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-cyan-400" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                HustleCodex
              </h1>
            </div>
            <nav className="hidden md:flex gap-8">
              <a href="/features.html" className="text-sm text-gray-400 hover:text-cyan-400 transition">Features</a>
              <a href="#pages" className="text-sm text-gray-400 hover:text-cyan-400 transition">Explore</a>
              <a href="/forum" className="text-sm text-gray-400 hover:text-cyan-400 transition">Forum</a>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-6 py-20 md:py-32">
          <div className="text-center mb-20">
            <div className="inline-block mb-6 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
              <span className="text-sm text-cyan-400 font-medium">Strategic Intelligence Platform</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                HustleCodex Strategic Dashboard
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Navigate the intersection of business strategy and technical excellence. Explore our business model canvas and technical architecture to understand how HustleCodex operates at scale.
            </p>
          </div>

          {/* Navigation Cards */}
          <div id="pages" className="grid md:grid-cols-3 gap-8 mb-20">
            {/* Business Model Card */}
            <a href="/business-model.html" className="group relative overflow-hidden rounded-xl border border-cyan-500/20 bg-gradient-to-br from-slate-900/50 to-slate-800/50 p-8 hover:border-cyan-500/60 transition-all duration-300 cursor-pointer block">
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/10 group-hover:to-cyan-500/5 transition-all duration-300" />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition">
                    <Grid3x3 className="w-6 h-6 text-cyan-400" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-cyan-400 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-white">Business Model Canvas</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Discover the strategic framework behind HustleCodex. Explore our value propositions, customer segments, revenue streams, and key partnerships.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 text-xs bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/30">Strategy</span>
                  <span className="px-3 py-1 text-xs bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/30">Business Model</span>
                  <span className="px-3 py-1 text-xs bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/30">Revenue</span>
                </div>
              </div>
            </a>

            {/* Feature Playbook Card */}
            <a href="/features.html" className="group relative overflow-hidden rounded-xl border border-emerald-500/20 bg-gradient-to-br from-slate-900/50 to-slate-800/50 p-8 hover:border-emerald-500/60 transition-all duration-300 cursor-pointer block">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/10 group-hover:to-emerald-500/5 transition-all duration-300" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition">
                    <Zap className="w-6 h-6 text-emerald-400" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-emerald-400 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                </div>

                <h3 className="text-2xl font-bold mb-3 text-white">Feature Playbook</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Public page with feature highlights, demo-ready use cases, implementation steps, and recommended upgrades.
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 text-xs bg-emerald-500/20 text-emerald-200 rounded-full border border-emerald-500/30">Use Cases</span>
                  <span className="px-3 py-1 text-xs bg-emerald-500/20 text-emerald-200 rounded-full border border-emerald-500/30">Steps</span>
                  <span className="px-3 py-1 text-xs bg-emerald-500/20 text-emerald-200 rounded-full border border-emerald-500/30">Upgrades</span>
                </div>
              </div>
            </a>

            {/* Technical Architecture Card */}
            <a href="/architecture.html" className="group relative overflow-hidden rounded-xl border border-purple-500/20 bg-gradient-to-br from-slate-900/50 to-slate-800/50 p-8 hover:border-purple-500/60 transition-all duration-300 cursor-pointer block">
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:to-purple-500/5 transition-all duration-300" />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition">
                    <Code2 className="w-6 h-6 text-purple-400" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-purple-400 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-white">Technical Architecture</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Deep dive into the technical infrastructure. Understand our system design, technology stack, and architectural decisions that power HustleCodex.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">Architecture</span>
                  <span className="px-3 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">Infrastructure</span>
                  <span className="px-3 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">Tech Stack</span>
                </div>
              </div>
            </a>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            <div className="p-6 rounded-lg border border-gray-800 bg-slate-900/30 hover:border-cyan-500/30 transition">
              <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-5 h-5 text-cyan-400" />
              </div>
              <h4 className="font-bold mb-2 text-white">Strategic Insight</h4>
              <p className="text-sm text-gray-400">Comprehensive business model analysis grounded in real implementation status.</p>
            </div>
            <div className="p-6 rounded-lg border border-gray-800 bg-slate-900/30 hover:border-cyan-500/30 transition">
              <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <Code2 className="w-5 h-5 text-cyan-400" />
              </div>
              <h4 className="font-bold mb-2 text-white">Technical Excellence</h4>
              <p className="text-sm text-gray-400">Detailed architecture documentation for developers and stakeholders.</p>
            </div>
            <div className="p-6 rounded-lg border border-gray-800 bg-slate-900/30 hover:border-cyan-500/30 transition">
              <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <Grid3x3 className="w-5 h-5 text-cyan-400" />
              </div>
              <h4 className="font-bold mb-2 text-white">Integrated Platform</h4>
              <p className="text-sm text-gray-400">Seamless navigation between strategy and implementation details.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h5 className="font-bold text-white mb-4">HustleCodex</h5>
                <p className="text-sm text-gray-400">Strategic dashboard for business and technical intelligence.</p>
              </div>
              <div>
                <h5 className="font-semibold text-gray-300 mb-4">Explore</h5>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-cyan-400 transition">Business Model</a></li>
                  <li><a href="#" className="hover:text-cyan-400 transition">Architecture</a></li>
                  <li><a href="#" className="hover:text-cyan-400 transition">Dashboard</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-gray-300 mb-4">Resources</h5>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-cyan-400 transition">Documentation</a></li>
                  <li><a href="#" className="hover:text-cyan-400 transition">Support</a></li>
                  <li><a href="#" className="hover:text-cyan-400 transition">Contact</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-gray-300 mb-4">Legal</h5>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-cyan-400 transition">Privacy</a></li>
                  <li><a href="#" className="hover:text-cyan-400 transition">Terms</a></li>
                  <li><a href="#" className="hover:text-cyan-400 transition">License</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800/50 pt-8 flex justify-between items-center">
              <p className="text-sm text-gray-500">© 2026 HustleCodex. All rights reserved.</p>
              <p className="text-sm text-gray-500">Strategic Intelligence Platform</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
