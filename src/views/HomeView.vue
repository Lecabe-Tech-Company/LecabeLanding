<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useServices } from '@/composables/useServices'
import { useWhatsapp } from '@/composables/useWhatsapp'
import { useHomeSeo } from '@/composables/useHomeSeo'
import type { FAQ } from '@/types/service'
import HomeHero from '@/components/home/HomeHero.vue'
import MetricsStrip from '@/components/home/MetricsStrip.vue'
import WhySection from '@/components/home/WhySection.vue'
import ServicesCarousel from '@/components/home/ServicesCarousel.vue'
import ContactSection from '@/components/home/ContactSection.vue'
import FaqAccordion from '@/components/ui/FaqAccordion.vue'

const { t, tm } = useI18n()
const { services } = useServices()
const { whatsappLink } = useWhatsapp()

const whatsappUrl = computed(() => whatsappLink(t('hero.whatsappMessage')))

const faqItems = computed<FAQ[]>(() => {
  const items = tm('faq.items') as unknown[]
  return (items ?? []).map((_, index) => ({
    question: t(`faq.items[${index}].question`),
    answer: t(`faq.items[${index}].answer`)
  }))
})

useHomeSeo(
  computed(() => ({
    title: `${t('hero.title')} | Lecabe`,
    description: t('hero.subtitle'),
    organizationDescription: t('about.content'),
    services: services.value.map(service => ({
      name: t(`megamenu.services.items.${service.id}.title`),
      description: t(`megamenu.services.items.${service.id}.description`),
      slug: service.slug
    })),
    faq: faqItems.value
  }))
)
</script>

<template>
  <div class="flex flex-1 flex-col">
    <HomeHero :whatsapp-url="whatsappUrl" />

    <MetricsStrip />

    <WhySection />

    <ServicesCarousel />

    <!-- Kept compact and collapsed: the FAQPage structured data on this page
         only holds up while the answers are actually visible here. -->
    <section
      id="faq"
      aria-labelledby="home-faq-title"
      class="scroll-mt-24"
    >
      <div class="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16 md:px-12">
        <div class="flex flex-col gap-2.5 text-center">
          <h2
            id="home-faq-title"
            v-reveal
            class="text-[clamp(1.75rem,3.4vw,2.625rem)] font-extrabold leading-tight tracking-[-0.02em] text-gray-900 dark:text-white"
          >
            {{ t('faq.title') }}
          </h2>
          <p
            v-reveal="60"
            class="text-[17px] leading-relaxed text-gray-600 dark:text-gray-300"
          >
            {{ t('faq.subtitle') }}
          </p>
        </div>

        <FaqAccordion :items="faqItems" />
      </div>
    </section>

    <ContactSection :whatsapp-url="whatsappUrl" />
  </div>
</template>
