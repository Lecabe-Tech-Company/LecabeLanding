import { watchEffect, onScopeDispose, type Ref } from 'vue'
import type { FAQ } from '@/types/service'

const SITE_URL = 'https://www.lecabe.com.br'
const SITE_NAME = 'Lecabe'
const ORGANIZATION = {
  '@type': 'Organization',
  name: 'Lecabe Tech',
  url: `${SITE_URL}/`,
  telephone: '+55-11-99413-2821'
} as const

const LD_SCRIPT_ID = 'lecabe-service-jsonld'

export interface ServiceSeoInput {
  /** Service name, e.g. "Automação Personalizada" */
  name: string
  /** Route slug, e.g. "desenvolvimento-software" */
  slug: string
  /**
   * Page title without the brand suffix. Locale strings must not contain a
   * literal `|` — vue-i18n reads it as the plural separator and would silently
   * truncate the message — so the ` | Lecabe` suffix is appended here instead.
   */
  title: string
  description: string
  faq: FAQ[]
  breadcrumbLabels: { home: string; services: string }
}

const upsertMeta = (selector: string, attrs: Record<string, string>): void => {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    document.head.appendChild(el)
  }
  Object.entries(attrs).forEach(([key, value]) => el!.setAttribute(key, value))
}

const upsertCanonical = (href: string): void => {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.href = href
}

/**
 * Keeps document title, meta description, canonical URL, Open Graph tags and
 * the JSON-LD graph in sync with the service currently being rendered.
 *
 * The JSON-LD graph is what answer engines and agentic crawlers read: it
 * declares the Service itself, where the page sits in the site hierarchy
 * (BreadcrumbList) and the questions the page answers (FAQPage).
 */
export const useServiceSeo = (seo: Ref<ServiceSeoInput>): void => {
  watchEffect(() => {
    const { name, slug, title, description, faq, breadcrumbLabels } = seo.value
    const url = `${SITE_URL}/servicos/${slug}`
    const pageTitle = `${title} | ${SITE_NAME}`

    document.title = pageTitle
    upsertMeta('meta[name="description"]', { name: 'description', content: description })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: pageTitle })
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: url })
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
    upsertCanonical(url)

    const graph: Record<string, unknown>[] = [
      {
        '@type': 'Service',
        name,
        description,
        url,
        serviceType: name,
        areaServed: 'BR',
        provider: ORGANIZATION
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: breadcrumbLabels.home, item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: breadcrumbLabels.services, item: `${SITE_URL}/servicos` },
          { '@type': 'ListItem', position: 3, name, item: url }
        ]
      }
    ]

    if (faq.length > 0) {
      graph.push({
        '@type': 'FAQPage',
        mainEntity: faq.map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer }
        }))
      })
    }

    let script = document.getElementById(LD_SCRIPT_ID) as HTMLScriptElement | null
    if (!script) {
      script = document.createElement('script')
      script.id = LD_SCRIPT_ID
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
  })

  onScopeDispose(() => {
    document.getElementById(LD_SCRIPT_ID)?.remove()
  })
}
