<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { useWhatsapp } from '@/composables/useWhatsapp'
import { useFounderSeo } from '@/composables/useFounderSeo'
import TechBackground from '@/components/TechBackground.vue'

const { t } = useI18n()
const { whatsappLink } = useWhatsapp()

const LINKEDIN_URL = 'https://www.linkedin.com/in/patrick-bonaretti-grilanda/'

/**
 * Drop a square photo under `public/` and point this at it (for example
 * `/assets/images/patrick-grilanda.jpg`) to replace the initials monogram.
 * Left empty on purpose: a missing file would 404 on every page load.
 */
const PHOTO_URL = ''

// Scroll animations
const heroSection = useScrollAnimation({}, true)
const statsSection = useScrollAnimation()
const storySection = useScrollAnimation()
const companiesSection = useScrollAnimation()
const timelineSection = useScrollAnimation()
const skillsSection = useScrollAnimation()
const beliefsSection = useScrollAnimation()
const educationSection = useScrollAnimation()
const ctaSection = useScrollAnimation()

const stats = computed(() =>
  (['experience', 'founded', 'companies', 'erp'] as const).map((id) => ({
    id,
    value: t(`companyPages.founder.stats.${id}.value`),
    label: t(`companyPages.founder.stats.${id}.label`)
  }))
)

const storyParagraphs = computed(() =>
  (['first', 'second', 'third'] as const).map((id) =>
    t(`companyPages.founder.story.paragraphs.${id}`)
  )
)

/**
 * The four companies the page is built around. `context` carries the group or
 * the role — never a job title we cannot back up — so the cards stay factual.
 */
const companies = computed(() =>
  (['nttdata', 'ze', 'bees', 'gag'] as const).map((id) => ({
    id,
    company: t(`companyPages.founder.companies.items.${id}.company`),
    context: t(`companyPages.founder.companies.items.${id}.context`),
    description: t(`companyPages.founder.companies.items.${id}.description`)
  }))
)

const timeline = computed(() =>
  (['lecabe', 'proz', 'gagAnalyst', 'gagFullstack', 'gagTech', 'tel'] as const).map((id, index) => ({
    id,
    isCurrent: index === 0,
    period: t(`companyPages.founder.timeline.items.${id}.period`),
    role: t(`companyPages.founder.timeline.items.${id}.role`),
    company: t(`companyPages.founder.timeline.items.${id}.company`),
    description: t(`companyPages.founder.timeline.items.${id}.description`)
  }))
)

const skillGroups = computed(() =>
  (['ai', 'backend', 'frontend', 'process'] as const).map((id) => ({
    id,
    title: t(`companyPages.founder.skills.groups.${id}.title`),
    items: t(`companyPages.founder.skills.groups.${id}.items`)
      .split('·')
      .map((item) => item.trim())
      .filter(Boolean)
  }))
)

const beliefs = computed(() =>
  (['problem', 'measurable', 'direct'] as const).map((id) => ({
    id,
    title: t(`companyPages.founder.beliefs.items.${id}.title`),
    description: t(`companyPages.founder.beliefs.items.${id}.description`)
  }))
)

const education = computed(() =>
  (['fiap', 'anhanguera'] as const).map((id) => ({
    id,
    degree: t(`companyPages.founder.education.items.${id}.degree`),
    school: t(`companyPages.founder.education.items.${id}.school`),
    period: t(`companyPages.founder.education.items.${id}.period`)
  }))
)

const certifications = computed(() =>
  (['designThinking', 'storytelling', 'lgpd', 'prd'] as const).map((id) =>
    t(`companyPages.founder.education.certifications.${id}`)
  )
)

const whatsappUrl = computed(() => whatsappLink(t('companyPages.founder.cta.whatsappMessage')))

/** "Patrick Bonaretti Grilanda" -> "PG" */
const initials = computed(() => {
  const parts = t('companyPages.founder.hero.name').trim().split(/\s+/)
  const first = parts[0]?.charAt(0) ?? ''
  const last = parts.length > 1 ? (parts[parts.length - 1]?.charAt(0) ?? '') : ''
  return `${first}${last}`.toUpperCase()
})

useFounderSeo(
  computed(() => ({
    title: t('companyPages.founder.meta.title'),
    description: t('companyPages.founder.meta.description'),
    name: t('companyPages.founder.hero.name'),
    jobTitle: t('companyPages.founder.hero.role'),
    bio: storyParagraphs.value.join(' '),
    sameAs: [LINKEDIN_URL],
    worksFor: companies.value.map(({ company }) => ({ name: company })),
    alumniOf: education.value.map(({ school }) => ({ name: school })),
    knowsAbout: skillGroups.value.flatMap(({ items }) => items),
    breadcrumbLabels: {
      home: t('breadcrumb.home'),
      company: t('nav.company'),
      founder: t('companyPages.founder.hero.role')
    }
  }))
)
</script>

<template>
  <div class="flex flex-1 flex-col relative">
    <!-- Animated Tech Background -->
    <TechBackground />

    <!-- Hero -->
    <section
      :ref="heroSection.target"
      class="relative py-16 md:py-24 overflow-hidden"
      :class="heroSection.isVisible.value ? 'animate-fade-in' : 'opacity-0'"
    >
      <div class="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div class="grid lg:grid-cols-[minmax(0,1fr)_auto] gap-12 lg:gap-16 items-center">
          <!-- Identity -->
          <div class="text-center lg:text-left">
            <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-500 text-sm font-semibold mb-6">
              <span class="w-1.5 h-1.5 rounded-full bg-purple-500" />
              {{ t('companyPages.founder.hero.eyebrow') }}
            </span>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-3">
              {{ t('companyPages.founder.hero.name') }}
            </h1>
            <p class="text-lg md:text-xl font-semibold text-brand-primary dark:text-brand-light-primary mb-6">
              {{ t('companyPages.founder.hero.role') }}
            </p>
            <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8">
              {{ t('companyPages.founder.hero.subtitle') }}
            </p>

            <div class="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a
                :href="whatsappUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-dark-primary hover:scale-[1.02] transition-all shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {{ t('companyPages.founder.hero.contact') }}
              </a>
              <a
                :href="LINKEDIN_URL"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-gray-200 dark:border-brand-medium-dark-primary text-gray-700 dark:text-gray-200 rounded-xl font-bold hover:border-brand-primary dark:hover:border-brand-light-primary hover:text-brand-primary dark:hover:text-brand-light-primary transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
                {{ t('companyPages.founder.hero.linkedin') }}
              </a>
            </div>

            <p class="mt-6 text-sm text-gray-500 dark:text-gray-400">
              {{ t('companyPages.founder.hero.location') }}
            </p>
          </div>

          <!-- Portrait -->
          <div class="flex justify-center lg:justify-end">
            <div class="relative">
              <div class="absolute -inset-4 rounded-full bg-gradient-to-br from-brand-primary/30 via-purple-500/20 to-brand-alternative/20 blur-2xl" />
              <div class="relative w-56 h-56 md:w-72 md:h-72 rounded-full p-[3px] bg-gradient-to-br from-brand-primary via-purple-500 to-brand-alternative">
                <img
                  v-if="PHOTO_URL"
                  :src="PHOTO_URL"
                  :alt="t('companyPages.founder.hero.photoAlt')"
                  class="w-full h-full rounded-full object-cover"
                >
                <div
                  v-else
                  class="w-full h-full rounded-full bg-white dark:bg-[#1e202d] flex items-center justify-center"
                  :aria-label="t('companyPages.founder.hero.photoAlt')"
                  role="img"
                >
                  <span class="text-5xl md:text-6xl font-bold bg-gradient-to-br from-brand-primary to-purple-500 bg-clip-text text-transparent">
                    {{ initials }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section
      :ref="statsSection.target"
      class="pb-8 md:pb-12 px-6 md:px-12"
      :class="statsSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'"
    >
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 bg-white/70 dark:bg-[#1e202d]/70 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-brand-primary/20 p-8">
          <div
            v-for="stat in stats"
            :key="stat.id"
            class="text-center"
          >
            <div class="text-3xl md:text-4xl font-bold text-brand-primary dark:text-brand-light-primary mb-2">
              {{ stat.value }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400 leading-snug">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Story -->
    <section
      :ref="storySection.target"
      class="py-16 md:py-24 px-6 md:px-12"
      :class="storySection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'"
    >
      <div class="max-w-3xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          {{ t('companyPages.founder.story.title') }}
        </h2>
        <div class="space-y-5">
          <p
            v-for="(paragraph, index) in storyParagraphs"
            :key="index"
            class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
          >
            {{ paragraph }}
          </p>
        </div>
      </div>
    </section>

    <!-- Companies -->
    <section
      :ref="companiesSection.target"
      class="py-16 md:py-24 px-6 md:px-12 bg-gray-50/80 dark:bg-[#1e202d]/40"
      :class="companiesSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'"
    >
      <div class="max-w-7xl mx-auto">
        <div class="max-w-3xl mx-auto text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {{ t('companyPages.founder.companies.title') }}
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {{ t('companyPages.founder.companies.subtitle') }}
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6 md:gap-8">
          <div
            v-for="company in companies"
            :key="company.id"
            class="bg-white dark:bg-[#1e202d]/90 rounded-2xl p-8 border border-gray-100 dark:border-brand-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div class="flex items-start justify-between gap-4 mb-4">
              <h3 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                {{ company.company }}
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 256 256"
                class="text-brand-primary/40 dark:text-brand-light-primary/40 flex-shrink-0"
              >
                <path d="M240,208H224V96a16,16,0,0,0-16-16H144V32a16,16,0,0,0-24.88-13.28L39.12,72A16,16,0,0,0,32,85.34V208H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM48,85.34l80-53.33V208H48ZM208,208H144V96h64Z" />
              </svg>
            </div>
            <span class="inline-block px-3 py-1 rounded-lg bg-purple-500/10 text-purple-500 text-xs font-semibold mb-4">
              {{ company.context }}
            </span>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ company.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section
      :ref="timelineSection.target"
      class="py-16 md:py-24 px-6 md:px-12"
      :class="timelineSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'"
    >
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {{ t('companyPages.founder.timeline.title') }}
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            {{ t('companyPages.founder.timeline.subtitle') }}
          </p>
        </div>

        <ol class="relative">
          <li
            v-for="(entry, index) in timeline"
            :key="entry.id"
            class="relative pl-12 md:pl-16"
            :class="index === timeline.length - 1 ? 'pb-0' : 'pb-10'"
          >
            <!-- Rail -->
            <span
              v-if="index !== timeline.length - 1"
              class="absolute left-[15px] md:left-[19px] top-8 bottom-0 w-px bg-gradient-to-b from-brand-primary/40 to-transparent dark:from-brand-light-primary/40"
              aria-hidden="true"
            />
            <!-- Dot -->
            <span
              class="absolute left-0 top-1.5 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center"
              :class="entry.isCurrent
                ? 'bg-brand-primary text-white'
                : 'bg-brand-primary/10 text-brand-primary dark:text-brand-light-primary'"
              aria-hidden="true"
            >
              <span class="w-2 h-2 rounded-full bg-current" />
            </span>

            <div class="flex flex-wrap items-center gap-3 mb-1">
              <span class="text-sm font-semibold text-gray-500 dark:text-gray-400">
                {{ entry.period }}
              </span>
              <span
                v-if="entry.isCurrent"
                class="px-2.5 py-0.5 rounded-md bg-brand-alternative/15 text-brand-alternative text-xs font-bold uppercase tracking-wide"
              >
                {{ t('companyPages.founder.timeline.current') }}
              </span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              {{ entry.role }}
            </h3>
            <p class="text-brand-primary dark:text-brand-light-primary font-semibold mb-3">
              {{ entry.company }}
            </p>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ entry.description }}
            </p>
          </li>
        </ol>
      </div>
    </section>

    <!-- Skills -->
    <section
      :ref="skillsSection.target"
      class="py-16 md:py-24 px-6 md:px-12 bg-gray-50/80 dark:bg-[#1e202d]/40"
      :class="skillsSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'"
    >
      <div class="max-w-7xl mx-auto">
        <div class="max-w-3xl mx-auto text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {{ t('companyPages.founder.skills.title') }}
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {{ t('companyPages.founder.skills.subtitle') }}
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="group in skillGroups"
            :key="group.id"
            class="bg-white dark:bg-[#1e202d]/90 rounded-2xl p-6 border border-gray-100 dark:border-brand-primary/20"
          >
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">
              {{ group.title }}
            </h3>
            <ul class="flex flex-wrap gap-2">
              <li
                v-for="item in group.items"
                :key="item"
                class="px-3 py-1.5 rounded-lg bg-brand-primary/5 dark:bg-brand-light-primary/10 text-sm text-gray-700 dark:text-gray-200"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Beliefs -->
    <section
      :ref="beliefsSection.target"
      class="py-16 md:py-24 px-6 md:px-12"
      :class="beliefsSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'"
    >
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          {{ t('companyPages.founder.beliefs.title') }}
        </h2>
        <div class="grid md:grid-cols-3 gap-6 md:gap-8">
          <div
            v-for="(belief, index) in beliefs"
            :key="belief.id"
            class="bg-white dark:bg-[#1e202d]/90 rounded-2xl p-8 border border-gray-100 dark:border-brand-primary/20"
          >
            <div class="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-5">
              <span class="text-purple-500 font-bold text-lg">{{ index + 1 }}</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {{ belief.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ belief.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Education & certifications -->
    <section
      :ref="educationSection.target"
      class="py-16 md:py-24 px-6 md:px-12 bg-gray-50/80 dark:bg-[#1e202d]/40"
      :class="educationSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'"
    >
      <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {{ t('companyPages.founder.education.title') }}
          </h2>
          <div class="space-y-4">
            <div
              v-for="item in education"
              :key="item.id"
              class="bg-white dark:bg-[#1e202d]/90 rounded-xl p-6 border border-gray-100 dark:border-brand-primary/20"
            >
              <h3 class="font-bold text-gray-900 dark:text-white mb-1">
                {{ item.degree }}
              </h3>
              <p class="text-brand-primary dark:text-brand-light-primary text-sm font-semibold">
                {{ item.school }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {{ item.period }}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {{ t('companyPages.founder.education.certificationsTitle') }}
          </h2>
          <ul class="space-y-3">
            <li
              v-for="certification in certifications"
              :key="certification"
              class="flex items-start gap-3 text-gray-600 dark:text-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 256 256"
                class="text-brand-alternative flex-shrink-0 mt-0.5"
              >
                <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" />
              </svg>
              <span>{{ certification }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section
      :ref="ctaSection.target"
      class="py-16 md:py-24 px-6 md:px-12 relative overflow-hidden"
      :class="ctaSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'"
    >
      <div class="absolute inset-0 bg-gradient-to-br from-brand-primary to-purple-500 opacity-10" />
      <div class="max-w-3xl mx-auto text-center relative z-10">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          {{ t('companyPages.founder.cta.title') }}
        </h2>
        <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          {{ t('companyPages.founder.cta.description') }}
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-primary text-white rounded-xl font-bold text-lg hover:bg-brand-dark-primary hover:scale-105 transition-all shadow-lg"
          >
            {{ t('companyPages.founder.cta.whatsapp') }}
          </a>
          <a
            :href="LINKEDIN_URL"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-200 dark:border-brand-medium-dark-primary text-gray-700 dark:text-gray-200 rounded-xl font-bold text-lg hover:border-brand-primary dark:hover:border-brand-light-primary transition-all"
          >
            {{ t('companyPages.founder.cta.linkedin') }}
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
