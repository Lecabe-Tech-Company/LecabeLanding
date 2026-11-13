import { watchEffect, onScopeDispose, type Ref } from 'vue'

const SITE_URL = 'https://www.lecabe.com.br'
const SITE_NAME = 'Lecabe'
const ORG_ID = `${SITE_URL}/#org`
const PERSON_ID = `${SITE_URL}/empresa/fundador#person`
const LD_SCRIPT_ID = 'lecabe-founder-jsonld'

export interface FounderSeoInput {
  /**
   * Page title without the brand suffix. Locale strings must not contain a
   * literal `|` — vue-i18n reads it as the plural separator — so the
   * ` | Lecabe` suffix is appended here instead.
   */
  title: string
  description: string
  /** Full name, as it should appear to answer engines. */
  name: string
  /** Job title, e.g. "Fundador e Engenheiro de Software". */
  jobTitle: string
  /** One-paragraph bio used as the Person description. */
  bio: string
  /** Profiles that corroborate the person: LinkedIn, GitHub, … */
  sameAs: string[]
  /** Companies the founder worked at, in the order the page lists them. */
  worksFor: { name: string }[]
  /** Degrees and schools, for `alumniOf`. */
  alumniOf: { name: string }[]
  /** Tools and domains, for `knowsAbout`. */
  knowsAbout: string[]
  breadcrumbLabels: { home: string; company: string; founder: string }
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
 * Head management for the founder page.
 *
 * The JSON-LD graph is a `ProfilePage` about a `Person` — the shape search and
 * answer engines read when someone asks who is behind Lecabe. Declaring the
 * person, where they worked and what they know is what lets those engines
 * connect the company to a named, verifiable human instead of guessing.
 */
export const useFounderSeo = (seo: Ref<FounderSeoInput>): void => {
  watchEffect(() => {
    const {
      title,
      description,
      name,
      jobTitle,
      bio,
      sameAs,
      worksFor,
      alumniOf,
      knowsAbout,
      breadcrumbLabels
    } = seo.value

    const url = `${SITE_URL}/empresa/fundador`
    const pageTitle = `${title} | ${SITE_NAME}`

    document.title = pageTitle
    upsertMeta('meta[name="description"]', { name: 'description', content: description })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: pageTitle })
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: url })
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'profile' })
    upsertCanonical(url)

    const graph: Record<string, unknown>[] = [
      {
        '@type': 'ProfilePage',
        url,
        name: pageTitle,
        description,
        mainEntity: { '@id': PERSON_ID }
      },
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name,
        jobTitle,
        description: bio,
        url,
        sameAs,
        nationality: 'BR',
        worksFor: [
          { '@type': 'Organization', '@id': ORG_ID, name: 'Lecabe Tech', url: `${SITE_URL}/` },
          ...worksFor.map((org) => ({ '@type': 'Organization', name: org.name }))
        ],
        alumniOf: alumniOf.map((school) => ({ '@type': 'EducationalOrganization', name: school.name })),
        knowsAbout
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: breadcrumbLabels.home, item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: breadcrumbLabels.company, item: `${SITE_URL}/empresa` },
          { '@type': 'ListItem', position: 3, name: breadcrumbLabels.founder, item: url }
        ]
      }
    ]

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
