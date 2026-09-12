<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useServices } from '@/composables/useServices'
import type { ServiceId } from '@/types/service'

defineProps<{ current: ServiceId }>()

const { t } = useI18n()
const { services } = useServices()
</script>

<template>
  <nav
    :aria-label="t('nav.services')"
    class="sticky top-14 md:top-16 z-40 border-y border-gray-900/[0.07] dark:border-white/10 bg-white/80 dark:bg-brand-dark/80 backdrop-blur-xl"
  >
    <ul class="service-tabs max-w-7xl mx-auto flex gap-1.5 overflow-x-auto px-4 py-2.5 sm:px-6 lg:px-10">
      <li
        v-for="service in services"
        :key="service.id"
      >
        <router-link
          :to="service.route"
          :aria-current="service.id === current ? 'page' : undefined"
          class="block whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-brand-dark"
          :class="service.id === current
            ? 'bg-brand-primary text-white shadow-sm shadow-brand-primary/30'
            : 'text-gray-600 hover:bg-brand-primary/10 hover:text-brand-primary dark:text-gray-300 dark:hover:text-brand-light-primary'"
        >
          {{ t(`megamenu.services.items.${service.id}.title`) }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
/* The tab strip scrolls horizontally on narrow screens; the scrollbar itself
   would sit on top of the pills, so hide it and keep the affordance in the
   partially visible last pill. */
.service-tabs {
  scrollbar-width: none;
}

.service-tabs::-webkit-scrollbar {
  display: none;
}
</style>
