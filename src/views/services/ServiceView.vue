<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useServices } from '@/composables/useServices'
import { useServiceSeo } from '@/composables/useServiceSeo'
import { useWhatsapp } from '@/composables/useWhatsapp'
import type { FAQ, ProcessStep, ServiceFeature, ServiceId } from '@/types/service'
import ServiceTabs from '@/components/services/ServiceTabs.vue'
import ServiceHero from '@/components/services/ServiceHero.vue'
import ServiceFeatureGrid from '@/components/services/ServiceFeatureGrid.vue'
import ServiceProcessGrid from '@/components/services/ServiceProcessGrid.vue'
import FaqAccordion from '@/components/ui/FaqAccordion.vue'
import ServiceContactCard from '@/components/services/ServiceContactCard.vue'

const route = useRoute()
const { t, tm } = useI18n()
const { getServiceById } = useServices()
const { whatsappLink } = useWhatsapp()

const serviceId = computed(() => route.meta.serviceId as ServiceId)
const service = computed(() => getServiceById(serviceId.value))
const base = computed(() => `servicesPages.${serviceId.value}`)

/**
 * The content blocks below are keyed objects in the locale files where every
 * entry except `title` is an item. Deriving the item ids from the messages
 * keeps content editable in i18n alone — adding a feature or a process step no
 * longer means touching a component.
 */
const itemKeys = (block: string): string[] => {
  const messages = tm(`${base.value}.${block}`) as Record<string, unknown> | undefined
  if (!messages) return []
  return Object.keys(messages).filter(key => key !== 'title')
}

const serviceName = computed(() => t(`megamenu.services.items.${serviceId.value}.title`))

const heroHighlights = computed(() => {
  const metrics = tm(`${base.value}.hero.visualMetrics`) as unknown[]
  return (metrics ?? []).map((_, index) => t(`${base.value}.hero.visualMetrics[${index}]`))
})

const metrics = computed(() => {
  const items = tm(`${base.value}.metrics.items`) as unknown[]
  return (items ?? []).map((_, index) => ({
    value: t(`${base.value}.metrics.items[${index}].value`),
    label: t(`${base.value}.metrics.items[${index}].label`)
  }))
})

const features = computed<ServiceFeature[]>(() =>
  itemKeys('features').map(id => ({
    id,
    icon: id,
    title: t(`${base.value}.features.${id}.title`),
    description: t(`${base.value}.features.${id}.description`)
  }))
)

const processSteps = computed<ProcessStep[]>(() =>
  itemKeys('process').map(id => ({
    title: t(`${base.value}.process.${id}.title`),
    description: t(`${base.value}.process.${id}.description`)
  }))
)

const faqItems = computed<FAQ[]>(() =>
  itemKeys('faq').map(id => ({
    question: t(`${base.value}.faq.${id}.question`),
    answer: t(`${base.value}.faq.${id}.answer`)
  }))
)

const whatsappUrl = computed(() => whatsappLink(t(`${base.value}.cta.whatsappMessage`)))

useServiceSeo(
  computed(() => ({
    name: serviceName.value,
    slug: service.value?.slug ?? '',
    title: t(`${base.value}.meta.title`),
    description: t(`${base.value}.meta.description`),
    faq: faqItems.value,
    breadcrumbLabels: { home: t('breadcrumb.home'), services: t('nav.services') }
  }))
)
</script>

<template>
  <div class="flex flex-1 flex-col">
    <ServiceTabs :current="serviceId" />

    <ServiceHero
      :service-name="serviceName"
      :title="t(`${base}.hero.title`)"
      :subtitle="t(`${base}.hero.subtitle`)"
      :cta-text="t(`${base}.hero.cta`)"
      :whatsapp-url="whatsappUrl"
      :highlights="heroHighlights"
      :metrics="metrics"
    />

    <!-- Overview + what we deliver -->
    <section
      aria-labelledby="service-overview-title"
      class="border-t border-gray-900/[0.08] bg-white dark:border-white/10 dark:bg-white/[0.02]"
    >
      <div class="mx-auto flex max-w-7xl flex-col gap-7 px-6 py-16 md:px-12">
        <div class="grid items-start gap-6 md:grid-cols-2 md:gap-x-12">
          <h2
            id="service-overview-title"
            v-reveal
            class="text-[clamp(1.625rem,3vw,2.375rem)] font-extrabold leading-tight tracking-[-0.02em] text-gray-900 dark:text-white"
          >
            {{ t(`${base}.overview.title`) }}
          </h2>
          <p
            v-reveal="80"
            class="text-base leading-relaxed text-gray-600 dark:text-gray-300"
          >
            {{ t(`${base}.overview.content`) }}
          </p>
        </div>

        <ServiceFeatureGrid :features="features" />
      </div>
    </section>

    <!-- How we work -->
    <section aria-labelledby="service-process-title">
      <div class="mx-auto flex max-w-7xl flex-col gap-7 px-6 py-16 md:px-12">
        <div class="flex max-w-2xl flex-col gap-2.5">
          <p
            v-reveal
            class="text-[13px] font-bold uppercase tracking-[0.08em] text-brand-primary dark:text-brand-light-primary"
          >
            {{ t('serviceUi.processEyebrow') }}
          </p>
          <h2
            id="service-process-title"
            v-reveal="60"
            class="text-[clamp(1.625rem,3vw,2.375rem)] font-extrabold leading-tight tracking-[-0.02em] text-gray-900 dark:text-white"
          >
            {{ t(`${base}.process.title`) }}
          </h2>
        </div>

        <ServiceProcessGrid :steps="processSteps" />
      </div>
    </section>

    <!-- FAQ + contact -->
    <section
      id="faq"
      aria-labelledby="service-faq-title"
      class="scroll-mt-32 border-t border-gray-900/[0.08] bg-white dark:border-white/10 dark:bg-white/[0.02]"
    >
      <div class="mx-auto grid max-w-7xl items-start gap-10 px-6 pb-20 pt-16 md:px-12 lg:grid-cols-2">
        <div class="flex flex-col gap-3.5">
          <h2
            id="service-faq-title"
            v-reveal
            class="text-[clamp(1.625rem,3vw,2.375rem)] font-extrabold leading-tight tracking-[-0.02em] text-gray-900 dark:text-white"
          >
            {{ t(`${base}.faq.title`) }}
          </h2>
          <FaqAccordion :items="faqItems" />
        </div>

        <ServiceContactCard
          :title="t(`${base}.cta.title`)"
          :description="t(`${base}.cta.description`)"
          :button-label="t(`${base}.cta.button`)"
          :whatsapp-url="whatsappUrl"
        />
      </div>
    </section>
  </div>
</template>
