// js/utils.js

/* ── Toast ───────────────────────────────── */
function getToastContainer() {
  let c = document.getElementById('toast-container')
  if (!c) {
    c = document.createElement('div')
    c.id = 'toast-container'
    c.className = 'toast-container'
    document.body.appendChild(c)
  }
  return c
}

export function toast(message, type = 'success', duration = 3000) {
  const icons = {
    success: `<svg viewBox="0 0 24 24" fill="none" stroke="#2BAF8A" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`,
    error:   `<svg viewBox="0 0 24 24" fill="none" stroke="#E05252" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    info:    `<svg viewBox="0 0 24 24" fill="none" stroke="#F5A623" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  }
  const el = document.createElement('div')
  el.className = `toast toast-${type}`
  el.innerHTML = `${icons[type]} <span>${message}</span>`
  getToastContainer().appendChild(el)
  setTimeout(() => el.remove(), duration)
}

/* ── Avatar initials + color ─────────────── */
const COLORS = ['#2BAF8A','#1A6B74','#6366F1','#D97706','#E05252','#8B5CF6','#0891B2']
export function avatarHTML(name = '', size = 40, src = null) {
  if (src) return `<img src="${src}" alt="${name}" style="width:${size}px;height:${size}px;border-radius:50%;object-fit:cover;">`
  const initials = name.trim().split(' ').slice(0,2).map(w => w[0]||'').join('').toUpperCase() || '?'
  const color    = COLORS[(name.charCodeAt(0)||0) % COLORS.length]
  return `<div class="avatar" style="width:${size}px;height:${size}px;background:${color};font-size:${Math.floor(size*0.36)}px;">${initials}</div>`
}

/* ── Stars ───────────────────────────────── */
export function starsHTML(value = 0, max = 5) {
  let html = ''
  for (let i = 0; i < max; i++)
    html += `<span style="color:${i < Math.round(value) ? '#F5A623' : '#E2E6EA'}">★</span>`
  return html
}

/* ── Relative time ───────────────────────── */
export function relativeTime(dateStr) {
  const diff = Date.now() - new Date(dateStr)
  const mins = Math.floor(diff / 60000)
  if (mins < 1)  return 'agora'
  if (mins < 60) return `${mins}min atrás`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24)  return `${hrs}h atrás`
  return new Date(dateStr).toLocaleDateString('pt-BR')
}

/* ── Guard: redirect if not logged in ────── */
export async function requireAuth(supabase) {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) { window.location.href = '/index.html'; return null }
  return session.user
}

/* ── Get current user profile ────────────── */
export async function getProfile(supabase, userId) {
  const { data } = await supabase.from('profiles').select('*').eq('id', userId).single()
  return data
}

/* ── Active nav item ─────────────────────── */
export function setActiveNav(page) {
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page)
  })
}

/* ── Logo SVG snippet ────────────────────── */
export const LOGO_SVG = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 3C9 3 6.5 5 6 8C4 8.5 2.5 10.2 2.5 12.3C2.5 14.8 4.5 16.8 7 16.8H17.5C19.4 16.8 21 15.2 21 13.3C21 11.6 19.8 10.2 18.2 9.8C18.1 6 15.4 3 12 3Z" fill="#2BAF8A"/>
  <path d="M9 13L11 15L15 11" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

export const LOGO_SVG_WHITE = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 3C9 3 6.5 5 6 8C4 8.5 2.5 10.2 2.5 12.3C2.5 14.8 4.5 16.8 7 16.8H17.5C19.4 16.8 21 15.2 21 13.3C21 11.6 19.8 10.2 18.2 9.8C18.1 6 15.4 3 12 3Z" fill="white"/>
  <path d="M9 13L11 15L15 11" stroke="#2BAF8A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

/* ── Nav HTML ────────────────────────────── */
export function navHTML(active) {
  const items = [
    { page: 'dashboard',  href: 'dashboard.html',  label: 'Início',   icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>` },
    { page: 'services',   href: 'services.html',   label: 'Serviços', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>` },
    { page: 'trades',     href: 'trades.html',     label: 'Trocas',   icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>` },
    { page: 'ranking',    href: 'ranking.html',    label: 'Ranking',  icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>` },
    { page: 'profile',    href: 'profile.html',    label: 'Perfil',   icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>` },
  ]
  return `<nav class="bottom-nav">
    ${items.map(i => `<a href="${i.href}" class="nav-item ${active===i.page?'active':''}" data-page="${i.page}">${i.icon}<span>${i.label}</span></a>`).join('')}
  </nav>`
}

/* ── Topbar HTML ─────────────────────────── */
export function topbarHTML({ back, title, showIcons = true } = {}) {
  const logoSection = back
    ? `<div class="topbar-back">
        <a href="${back}" class="back-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg></a>
        <span class="topbar-page-title">${title||''}</span>
       </div>`
    : `<div class="topbar-logo">
        <div class="topbar-logo-icon">${LOGO_SVG}</div>
        <div><div class="topbar-brand">Time4Skills</div><div class="topbar-sub">Acadêmico</div></div>
       </div>`
  const icons = showIcons
    ? `<div class="topbar-icons">
        <a href="chat.html" class="topbar-icon-btn" title="Mensagens"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></a>
        <a href="notifications.html" class="topbar-icon-btn" title="Notificações"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></a>
       </div>`
    : ''
  return `<header class="topbar">${logoSection}${icons}</header>`
}
