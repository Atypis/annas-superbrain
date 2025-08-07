'use client'

import { useEffect, useState } from 'react'
import { supabase, VCPartner } from '@/lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Building2, 
  User, 
  Globe2, 
  Rocket, 
  TrendingUp, 
  Brain,
  CheckCircle2,
  ExternalLink,
  Search,
  Activity,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'

export default function BrainSpaceProject() {
  const [partners, setPartners] = useState<VCPartner[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterBy, setFilterBy] = useState<string>('all')
  const [selectedPartner, setSelectedPartner] = useState<VCPartner | null>(null)

  useEffect(() => {
    fetchPartners()
  }, [])

  const fetchPartners = async () => {
    const { data, error } = await supabase
      .from('vc_partners')
      .select('*')
      .order('name')

    if (!error && data) {
      console.log('Fetched partners:', data)
      console.log('First partner data:', data[0])
      setPartners(data)
    } else if (error) {
      console.error('Error fetching partners:', error)
    }
    setLoading(false)
  }

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          partner.company.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (filterBy === 'all') return matchesSearch
    if (filterBy === 'neurotech') return matchesSearch && partner.has_neurotech_investment
    if (filterBy === 'exits') return matchesSearch && partner.has_notable_exits
    if (filterBy === 'series') return matchesSearch && partner.leads_series_a_b
    
    return matchesSearch
  })

  const stats = {
    total: partners.length,
    neurotech: partners.filter(p => p.has_neurotech_investment).length,
    exits: partners.filter(p => p.has_notable_exits).length,
    series: partners.filter(p => p.leads_series_a_b).length,
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="fixed inset-0 bg-gradient-to-b from-purple-950/10 via-black to-black pointer-events-none" />
      
      <div className="relative">
        <header className="border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link 
                  href="/"
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-400" />
                </Link>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/5 rounded-lg">
                    <Brain className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-white">brain.space</h1>
                    <p className="text-xs text-gray-500">Neurotech VC Network</p>
                  </div>
                </div>
              </div>
              
              <div className="hidden md:flex items-center gap-8">
                <div className="text-center">
                  <div className="text-xl font-semibold text-white">{stats.total}</div>
                  <div className="text-xs text-gray-500">Partners</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-semibold text-purple-400">{stats.neurotech}</div>
                  <div className="text-xs text-gray-500">Neurotech</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-semibold text-emerald-400">{stats.series}</div>
                  <div className="text-xs text-gray-500">Series A/B</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-semibold text-orange-400">{stats.exits}</div>
                  <div className="text-xs text-gray-500">Exits</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search partners or companies..."
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-400/50 focus:bg-white/[0.07] transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              {[
                { id: 'all', label: 'All' },
                { id: 'neurotech', label: 'Neurotech' },
                { id: 'series', label: 'Series A/B' },
                { id: 'exits', label: 'Exits' }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setFilterBy(filter.id)}
                  className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                    filterBy === filter.id
                      ? 'bg-white/10 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-12">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-purple-400 animate-pulse" />
                <span className="text-gray-400">Loading network...</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPartners.map((partner) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => {
                    console.log('Selected partner:', partner)
                    setSelectedPartner(partner)
                  }}
                  className="group bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 rounded-xl p-5 cursor-pointer transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-white mb-1">
                        {partner.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {partner.job_title}
                      </p>
                    </div>
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-md hover:bg-white/5 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
                    </a>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-xs text-gray-400">
                      {partner.company}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {partner.leads_series_a_b && (
                      <span className="px-2 py-0.5 bg-emerald-400/10 text-emerald-400 rounded text-xs">
                        Series A/B
                      </span>
                    )}
                    {partner.has_neurotech_investment && (
                      <span className="px-2 py-0.5 bg-purple-400/10 text-purple-400 rounded text-xs">
                        Neurotech
                      </span>
                    )}
                    {partner.has_notable_exits && (
                      <span className="px-2 py-0.5 bg-orange-400/10 text-orange-400 rounded text-xs">
                        Exits
                      </span>
                    )}
                    {partner.based_na_eu_israel && (
                      <span className="px-2 py-0.5 bg-blue-400/10 text-blue-400 rounded text-xs">
                        NA/EU/IL
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedPartner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPartner(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-gray-950 border border-white/10 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-2">{selectedPartner.name}</h2>
                  <p className="text-sm text-gray-400">{selectedPartner.job_title}</p>
                  <p className="text-sm text-gray-300 mt-1">{selectedPartner.company}</p>
                </div>
                <a
                  href={selectedPartner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                <div className={`p-3 rounded-lg border ${selectedPartner.is_partner ? 'bg-emerald-400/5 border-emerald-400/20' : 'bg-white/5 border-white/10'}`}>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className={`w-4 h-4 ${selectedPartner.is_partner ? 'text-emerald-400' : 'text-gray-600'}`} />
                    <span className="text-xs text-gray-300">VC Partner</span>
                  </div>
                </div>
                
                <div className={`p-3 rounded-lg border ${selectedPartner.leads_series_a_b ? 'bg-emerald-400/5 border-emerald-400/20' : 'bg-white/5 border-white/10'}`}>
                  <div className="flex items-center gap-2">
                    <TrendingUp className={`w-4 h-4 ${selectedPartner.leads_series_a_b ? 'text-emerald-400' : 'text-gray-600'}`} />
                    <span className="text-xs text-gray-300">Series A/B</span>
                  </div>
                </div>
                
                <div className={`p-3 rounded-lg border ${selectedPartner.has_neurotech_investment ? 'bg-purple-400/5 border-purple-400/20' : 'bg-white/5 border-white/10'}`}>
                  <div className="flex items-center gap-2">
                    <Brain className={`w-4 h-4 ${selectedPartner.has_neurotech_investment ? 'text-purple-400' : 'text-gray-600'}`} />
                    <span className="text-xs text-gray-300">Neurotech</span>
                  </div>
                </div>
                
                <div className={`p-3 rounded-lg border ${selectedPartner.has_notable_exits ? 'bg-orange-400/5 border-orange-400/20' : 'bg-white/5 border-white/10'}`}>
                  <div className="flex items-center gap-2">
                    <Rocket className={`w-4 h-4 ${selectedPartner.has_notable_exits ? 'text-orange-400' : 'text-gray-600'}`} />
                    <span className="text-xs text-gray-300">Exits</span>
                  </div>
                </div>
              </div>

              {selectedPartner.role_current && (
                <div className="mb-6">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Current Role</h3>
                  <p className="text-white">{selectedPartner.role_current}</p>
                  {selectedPartner.role_reasoning && (
                    <p className="text-sm text-gray-400 mt-2">{selectedPartner.role_reasoning}</p>
                  )}
                </div>
              )}

              <div className="space-y-6">
                {selectedPartner.partner_reasoning && (
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <User className="w-3.5 h-3.5" />
                      Partner Verification
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">{selectedPartner.partner_reasoning}</p>
                  </div>
                )}

                {selectedPartner.series_reasoning && (
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <TrendingUp className="w-3.5 h-3.5" />
                      Series A/B Investments
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">{selectedPartner.series_reasoning}</p>
                  </div>
                )}

                {selectedPartner.neurotech_reasoning && (
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Brain className="w-3.5 h-3.5" />
                      Neurotech & Deep Tech
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">{selectedPartner.neurotech_reasoning}</p>
                  </div>
                )}

                {selectedPartner.exits_reasoning && (
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Rocket className="w-3.5 h-3.5" />
                      Notable Exits
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">{selectedPartner.exits_reasoning}</p>
                  </div>
                )}

                {selectedPartner.location_reasoning && (
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Globe2 className="w-3.5 h-3.5" />
                      Location
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">{selectedPartner.location_reasoning}</p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedPartner(null)}
                className="mt-8 w-full py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}