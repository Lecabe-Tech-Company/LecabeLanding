import type { Router } from 'vue-router'

type AnalyticsWindow = Window & {
  dataLayer?: unknown[][]
  gtag?: (...args: unknown[]) => void
}

const measurementId = (import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-LG0SBB77X6').trim()
const consentKey = 'lecabe_analytics_consent'
let initialized = false

export type AnalyticsConsent = 'accepted' | 'rejected' | null

/** Consent is opt-in: analytics scripts and events never load before acceptance. */
export function getAnalyticsConsent(): AnalyticsConsent {
  try {
    const value = localStorage.getItem(consentKey)
    return value === 'accepted' || value === 'rejected' ? value : null
  } catch {
    return null
  }
}

/** Saves user choice, enabling tracking only for explicit acceptance. */
export function setAnalyticsConsent(choice: Exclude<AnalyticsConsent, null>, router: Router): void {
  try {
    localStorage.setItem(consentKey, choice)
  } catch {
    // If storage is blocked, acceptance applies only for this session.
  }

  if (choice === 'accepted') {
    if (initialized) {
      ;(window as AnalyticsWindow).gtag?.('consent', 'update', { analytics_storage: 'granted' })
    } else {
      enableAnalytics(router)
    }
  } else if (initialized) {
    // Prevent further collection. An existing script cannot be unloaded safely;
    // users should also be directed to browser controls to clear existing cookies.
    ;(window as AnalyticsWindow).gtag?.('consent', 'update', {
      analytics_storage: 'denied'
    })
  }
}

/** Initializes GA4 only once after consent; tracks SPA route changes. */
export function enableAnalytics(router: Router): void {
  if (initialized || getAnalyticsConsent() !== 'accepted' || !/^G-[A-Z0-9]+$/i.test(measurementId)) return

  initialized = true
  const analyticsWindow = window as AnalyticsWindow
  analyticsWindow.dataLayer = analyticsWindow.dataLayer ?? []
  analyticsWindow.gtag = (...args: unknown[]) => {
    analyticsWindow.dataLayer?.push(args)
  }

  analyticsWindow.gtag('consent', 'default', { analytics_storage: 'granted' })
  analyticsWindow.gtag('js', new Date())
  analyticsWindow.gtag('config', measurementId, { send_page_view: false })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
  document.head.appendChild(script)

  const trackPageView = (path: string): void => {
    if (getAnalyticsConsent() !== 'accepted') return
    analyticsWindow.gtag?.('event', 'page_view', {
      page_location: window.location.origin + path,
      page_path: path,
      page_title: document.title
    })
  }

  router.afterEach((to, _from, failure) => {
    if (!failure) trackPageView(to.fullPath)
  })

  if (router.currentRoute.value.name) {
    trackPageView(router.currentRoute.value.fullPath)
  }
}
