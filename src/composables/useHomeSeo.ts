import { watchEffect, onScopeDispose, type Ref } from 'vue'
import type { FAQ } from '@/types/service'

const SITE_URL = 'https://www.lecabe.com.br'
const ORG_ID = `${SITE_URL}/#org`
const LD_SCRIPT_ID = 'lecabe-home-jsonld'

export interface HomeSeoInput {
  title: string
  description: string
  organizationDescription: string
  services: { name: string; description: string; slug: string }[]
  /** Must mirror the FAQ rendered on the page — search engines penalise schema that has no visible counterpart. */
  faq: FAQ[]
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
 * Home page head management. The JSON-LD graph declares who Lecabe is
 * (Organization), the site itself (WebSite), each service offered, and the
 * questions the page answers — the shape answer engines and agentic crawlers
 * read when they summarise the company without rendering the layout.
 */
export const useHomeSeo = (seo: Ref<HomeSeoInput>): void => {
  watchEffect(() => {
    const { title, description, organizationDescription, services, faq } = seo.value

    document.title = title
    upsertMeta('meta[name="description"]', { name: 'description', content: description })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title })
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: `${SITE_URL}/` })
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
    upsertCanonical(`${SITE_URL}/`)

    const graph: Record<string, unknown>[] = [
      {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: 'Lecabe Tech',
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/assets/logos/simbolo-gradient.png`,
        email: 'contato@lecabe.com.br',
        telephone: '+55-11-99413-2821',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Aguaí',
          addressRegion: 'SP',
          addressCountry: 'BR'
        },
        areaServed: 'BR',
        description: organizationDescription
      },
      {
        '@type': 'WebSite',
        url: `${SITE_URL}/`,
        name: 'Lecabe',
        inLanguage: document.documentElement.lang || 'pt-BR',
        publisher: { '@id': ORG_ID }
      },
      ...services.map(service => ({
        '@type': 'Service',
        name: service.name,
        description: service.description,
        url: `${SITE_URL}/servicos/${service.slug}`,
        areaServed: 'BR',
        provider: { '@id': ORG_ID }
      }))
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
