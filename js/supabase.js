// js/supabase.js
// Configuração do Supabase — edite o .env.js com suas chaves
import { CONFIG } from './config.js'
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

export const supabase = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY)
