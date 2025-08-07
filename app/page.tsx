'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Brain,
  Send,
  FolderOpen,
  Menu,
  X,
  Home as HomeIcon,
  Database,
  Settings,
  HelpCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react'

export default function Home() {
  const [query, setQuery] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock submission - nothing happens for now
    console.log('Query submitted:', query)
  }

  const projects = [
    {
      id: 'brain-space',
      name: 'brain.space',
      description: 'Neurotech & BCI investors database',
      stats: {
        investors: 150,
        verified: 89,
        lastUpdated: '2 days ago'
      },
      href: '/projects/brain-space',
      color: 'purple'
    }
  ]

  const sidebarItems = [
    { icon: HomeIcon, label: 'Home', href: '/', active: true },
    { icon: Database, label: 'Projects', href: '#', badge: '1' },
    { icon: Settings, label: 'Settings', href: '#' },
    { icon: HelpCircle, label: 'Help', href: '#' }
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-950/20 via-black to-blue-950/20 pointer-events-none" />
      
      {/* Animated gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-6 left-6 z-50 p-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg lg:hidden"
      >
        {sidebarOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <Menu className="w-5 h-5 text-white" />
        )}
      </button>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-black/50 backdrop-blur-xl border-r border-white/10 z-40 transform transition-transform lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg">
              <Brain className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Anna's</h2>
              <p className="text-xs text-gray-500">Superbrain</p>
            </div>
          </div>

          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${
                  item.active 
                    ? 'bg-white/10 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="p-4 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-medium text-white">Pro Tip</span>
            </div>
            <p className="text-xs text-gray-400">
              Describe your ideal investor profile for AI-powered matching
            </p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="relative min-h-screen flex flex-col items-center justify-center px-6 transition-all lg:ml-64">
        {/* Hero Section */}
        <div className="w-full max-w-4xl mx-auto">
          {/* Logo and title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl">
                <Brain className="w-8 h-8 text-purple-400" />
              </div>
              <h1 className="text-4xl font-bold text-white">
                Anna's Superbrain
              </h1>
            </div>
            <p className="text-gray-400 text-lg">
              AI-powered investor discovery for your startup
            </p>
          </div>

          {/* Chat Interface */}
          <form onSubmit={handleSubmit} className="relative mb-16">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/50 to-blue-500/50 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
              <div className="relative bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <label className="block text-white font-medium mb-3">
                  Who are you looking for?
                </label>
                <p className="text-sm text-gray-400 mb-6">
                  Describe what company you are currently supporting with fundraising and we will find top 100 Investors
                </p>
                <div className="relative">
                  <textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g., We're building a brain-computer interface for medical applications, looking for Series A investors with deep tech experience..."
                    className="w-full h-32 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 resize-none focus:outline-none focus:border-purple-400/50 focus:bg-white/[0.07] transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute bottom-3 right-3 p-2.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all group/btn"
                  >
                    <Send className="w-4 h-4 text-white group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Existing Projects */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-gray-400" />
                Existing Projects
              </h2>
              <span className="text-xs text-gray-500">
                {projects.length} project{projects.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="grid gap-4">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={project.href}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-300" />
                  <div className="relative bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-white/20 rounded-xl p-6 transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-purple-500/10 rounded-lg">
                            <Brain className="w-5 h-5 text-purple-400" />
                          </div>
                          <h3 className="text-lg font-semibold text-white">
                            {project.name}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">
                          {project.description}
                        </p>
                        <div className="flex items-center gap-6 text-xs">
                          <div>
                            <span className="text-gray-500">Investors:</span>
                            <span className="ml-2 text-white font-medium">{project.stats.investors}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Verified:</span>
                            <span className="ml-2 text-emerald-400 font-medium">{project.stats.verified}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Updated:</span>
                            <span className="ml-2 text-gray-300">{project.stats.lastUpdated}</span>
                          </div>
                        </div>
                      </div>
                      <div className={`p-2 transition-all ${
                        hoveredProject === project.id ? 'translate-x-1' : ''
                      }`}>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}