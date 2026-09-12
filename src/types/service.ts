/**
 * Service types for Lecabe services pages
 */

export interface Service {
  id: string
  slug: string
  route: string
  gradient: string
  accentColor: string
  icon: 'code' | 'cloud' | 'design' | 'ai'
}

export interface ServiceFeature {
  /** Matches the key under `servicesPages.<service>.features` in the locale files */
  id: string
  icon: string
  title: string
  description: string
}

export interface ProcessStep {
  title: string
  description: string
}

export interface FAQ {
  question: string
  answer: string
}

export type ServiceId = 'software' | 'cloud' | 'ux' | 'ai'
