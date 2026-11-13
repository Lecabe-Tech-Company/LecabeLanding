import type { Router } from 'vue-router'

type AnalyticsWindow = Window & {
  dataLayer?: unknown[][]
  gtag?: (...args: unknown[]) => void
}

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim()

/**
 * Sets up GA4 page view tracking for a Vue single-page application.
 * No tracking script is loaded unless a valid measurement ID is configured.
 * Ensure analytics consent requirements are met before enabling this in production.
 */
export function initializeAnalytics(router: Router): void {
  if (!measurementId || !/^G-[A-Z0-9]+$/i.test(measurementId)) return

  const analyticsWindow = window as AnalyticsWindow
  analyticsWindow.dataLayer = analyticsWindow.dataLayer ?? []
  analyticsWindow.gtag = (...args: unknown[]) => {
    analyticsWindow.dataLayer?.push(args)
  }

  analyticsWindow.gtag('js', new Date())
  analyticsWindow.gtag('config', measurementId, { send_page_view: false })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
  document.head.appendChild(script)

  // afterEach includes the initial navigation and subsequent client-side navigations.
  router.afterEach((to, _from, failure) => {
    if (failure) return

    analyticsWindow.gtag?.('event', 'page_view', {
      page_location: window.location.origin + to.fullPath,
      page_path: to.fullPath,
      page_title: document.title
    })
  })
}
