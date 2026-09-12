<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useServices } from '@/composables/useServices'
import LineIcon from '@/components/ui/LineIcon.vue'

const CARD_ICONS: Record<string, string> = {
  software: 'settings',
  cloud: 'channels',
  ux: 'dashboard',
  ai: 'search'
}

const { t, tm } = useI18n()
const { services } = useServices()

const track = ref<HTMLElement | null>(null)
const pageCount = ref(1)
const pageIndex = ref(0)

const cards = computed(() =>
  services.value.map((service, index) => ({
    id: service.id,
    route: service.route,
    icon: CARD_ICONS[service.id] ?? 'settings',
    number: String(index + 1).padStart(2, '0'),
    name: t(`megamenu.services.items.${service.id}.title`),
    short: t(`megamenu.services.items.${service.id}.description`),
    bullets: ((tm(`servicesCarousel.bullets.${service.id}`) as unknown[]) ?? []).map((_, i) =>
      t(`servicesCarousel.bullets.${service.id}[${i}]`)
    ),
    /** The first card carries the brand gradient, so it reads as the entry point. */
    featured: index === 0
  }))
)

/**
 * Pages are measured from how far the track can actually scroll, not from the
 * number of cards — scrolling stops once the last card is fully visible, so
 * counting cards would show dots the visitor can never reach.
 */
const measurePages = (): void => {
  const el = track.value
  if (!el) return
  const max = el.scrollWidth - el.clientWidth
  const pages = max > 4 ? Math.ceil(max / el.clientWidth) + 1 : 1
  pageCount.value = pages
  pageIndex.value = Math.min(pageIndex.value, pages - 1)
}

const onScroll = (): void => {
  const el = track.value
  if (!el) return
  const max = el.scrollWidth - el.clientWidth
  pageIndex.value = max > 0 ? Math.round((el.scrollLeft / max) * (pageCount.value - 1)) : 0
}

const scrollToPage = (direction: number): void => {
  const el = track.value
  if (!el) return
  const max = el.scrollWidth - el.clientWidth
  const target = Math.max(0, Math.min(pageCount.value - 1, pageIndex.value + direction))
  el.scrollTo({
    left: pageCount.value > 1 ? (target * max) / (pageCount.value - 1) : 0,
    behavior: 'smooth'
  })
  pageIndex.value = target
}

let resizeObserver: ResizeObserver | undefined

onMounted(() => {
  measurePages()
  if (track.value) {
    resizeObserver = new ResizeObserver(measurePages)
    resizeObserver.observe(track.value)
  }
})

onBeforeUnmount(() => resizeObserver?.disconnect())
</script>

<template>
  <section
    id="servicos"
    aria-labelledby="services-title"
    class="scroll-mt-24 border-t border-gray-900/[0.08] bg-white dark:border-white/10 dark:bg-white/[0.02]"
  >
    <div class="mx-auto flex max-w-7xl flex-col gap-7 px-6 pb-20 pt-[72px] md:px-12">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <div class="flex max-w-2xl flex-col gap-3">
          <p
            v-reveal
            class="text-[13px] font-bold uppercase tracking-[0.08em] text-brand-primary dark:text-brand-light-primary"
          >
            {{ t('servicesCarousel.eyebrow') }}
          </p>
          <h2
            id="services-title"
            v-reveal="60"
            class="text-[clamp(1.75rem,3.4vw,2.625rem)] font-extrabold leading-tight tracking-[-0.02em] text-gray-900 dark:text-white"
          >
            {{ t('services.subtitle') }}
          </h2>
          <p
            v-reveal="120"
            class="text-[17px] leading-relaxed text-gray-600 dark:text-gray-300"
          >
            {{ t('services.description') }}
          </p>
        </div>

        <div
          v-reveal="120"
          class="flex items-center gap-2.5"
        >
          <button
            v-for="control in [{ dir: -1, label: t('servicesCarousel.prev'), path: 'm15 6-6 6 6 6' }, { dir: 1, label: t('servicesCarousel.next'), path: 'm9 6 6 6-6 6' }]"
            :key="control.dir"
            type="button"
            :aria-label="control.label"
            class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-900/[0.14] bg-white text-gray-900 transition-colors duration-200 hover:border-brand-primary hover:text-brand-primary disabled:opacity-40 dark:border-white/15 dark:bg-white/[0.06] dark:text-white dark:hover:border-brand-light-primary dark:hover:text-brand-light-primary"
            :disabled="control.dir < 0 ? pageIndex === 0 : pageIndex >= pageCount - 1"
            @click="scrollToPage(control.dir)"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path :d="control.path" />
            </svg>
          </button>
        </div>
      </div>

      <ul
        ref="track"
        class="services-track m-0 flex list-none gap-4 overflow-x-auto p-0 pb-[18px] pt-1.5"
        @scroll.passive="onScroll"
      >
        <li
          v-for="(card, index) in cards"
          :key="card.id"
          v-reveal="index * 80"
          class="flex-none basis-[min(86%,360px)] snap-start"
        >
          <router-link
            :to="card.route"
            class="flex h-full min-h-[300px] flex-col gap-[18px] rounded-[20px] border border-gray-900/10 p-[26px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(30,30,80,.16)]"
            :class="card.featured
              ? 'bg-gradient-to-br from-brand-primary to-brand-dark-primary text-white border-transparent'
              : 'bg-brand-light text-gray-900 dark:border-white/10 dark:bg-white/[0.04] dark:text-white'"
          >
            <div class="flex items-center justify-between">
              <span
                class="inline-flex h-12 w-12 items-center justify-center rounded-[14px]"
                :class="card.featured
                  ? 'bg-white/20 text-white'
                  : 'bg-brand-primary/10 text-brand-primary dark:bg-brand-light-primary/15 dark:text-brand-light-primary'"
              >
                <LineIcon
                  :name="card.icon"
                  :size="24"
                />
              </span>
              <span class="text-[13px] font-bold tracking-[0.06em] opacity-55">{{ card.number }}</span>
            </div>

            <div class="flex flex-1 flex-col gap-2">
              <h3 class="text-[22px] font-extrabold leading-tight tracking-[-0.01em]">
                {{ card.name }}
              </h3>
              <p class="text-[15px] leading-relaxed opacity-85">
                {{ card.short }}
              </p>
            </div>

            <ul class="m-0 flex list-none flex-col gap-1.5 p-0 text-sm font-medium opacity-90">
              <li
                v-for="bullet in card.bullets"
                :key="bullet"
                class="flex items-center gap-2"
              >
                <span
                  class="h-1.5 w-1.5 flex-none rounded-full bg-current opacity-60"
                  aria-hidden="true"
                />
                {{ bullet }}
              </li>
            </ul>

            <span class="mt-1 inline-flex items-center gap-2 text-sm font-bold">
              {{ t('servicesCarousel.cardCta') }}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.4"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </router-link>
        </li>
      </ul>

      <div
        v-if="pageCount > 1"
        class="flex justify-center gap-1.5"
        aria-hidden="true"
      >
        <span
          v-for="page in pageCount"
          :key="page"
          class="h-1.5 rounded-[3px] transition-all duration-300"
          :class="page - 1 === pageIndex
            ? 'w-[22px] bg-brand-primary dark:bg-brand-light-primary'
            : 'w-1.5 bg-gray-900/15 dark:bg-white/20'"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.services-track {
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}

.services-track::-webkit-scrollbar {
  display: none;
}
</style>
