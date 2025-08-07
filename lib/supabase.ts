import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface VCPartner {
  id: number
  url: string
  name: string
  company: string
  job_title: string
  is_partner: boolean
  partner_reasoning: string
  leads_series_a_b: boolean
  series_reasoning: string
  has_neurotech_investment: boolean
  neurotech_reasoning: string
  based_na_eu_israel: boolean
  location_reasoning: string
  has_notable_exits: boolean
  exits_reasoning: string
  role_current: string
  role_reasoning: string
  created_at: string
}