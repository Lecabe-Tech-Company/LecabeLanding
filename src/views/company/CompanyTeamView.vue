<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import TechBackground from '@/components/TechBackground.vue'

const { t } = useI18n()
const router = useRouter()

// Scroll animations
const heroSection = useScrollAnimation({}, true)
const foundersSection = useScrollAnimation()
const ctaSection = useScrollAnimation()

const navigateTo = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div class="flex flex-1 flex-col relative">
    <!-- Animated Tech Background -->
    <TechBackground />

    <!-- Hero Section -->
    <section
      :ref="heroSection.target"
      class="relative py-20 md:py-28 overflow-hidden min-h-[60vh] flex items-center"
      :class="heroSection.isVisible.value ? 'animate-fade-in' : 'opacity-0'"
    >
      <div class="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {{ t('companyPages.team.hero.title') }}
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
            {{ t('companyPages.team.hero.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Team Sections Placeholder -->
    <section
      :ref="foundersSection.target"
      class="py-16 md:py-24 px-6 md:px-12"
      :class="foundersSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'"
    >
      <div class="max-w-7xl mx-auto">
        <!-- Founders -->
        <div class="mb-16">
          <div class="flex items-center gap-3 mb-8">
            <div class="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 256 256"
                class="text-purple-500"
              >
                <path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z" />
              </svg>
            </div>
            <div>
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                {{ t('companyPages.team.founders.title') }}
              </h2>
              <p class="text-gray-600 dark:text-gray-400">
                {{ t('companyPages.team.founders.description') }}
              </p>
            </div>
          </div>

          <!-- Founder card: the detail lives on /empresa/fundador -->
          <div class="bg-white/90 dark:bg-[#1e202d]/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-100 dark:border-brand-primary/20">
            <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div class="w-28 h-28 md:w-32 md:h-32 flex-shrink-0 rounded-full p-[3px] bg-gradient-to-br from-brand-primary via-purple-500 to-brand-alternative">
                <div class="w-full h-full rounded-full bg-white dark:bg-[#1e202d] flex items-center justify-center">
                  <span class="text-3xl md:text-4xl font-bold bg-gradient-to-br from-brand-primary to-purple-500 bg-clip-text text-transparent">
                    PG
                  </span>
                </div>
              </div>
              <div class="text-center md:text-left">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {{ t('companyPages.team.founder.name') }}
                </h3>
                <p class="text-brand-primary dark:text-brand-light-primary font-semibold mb-4">
                  {{ t('companyPages.team.founder.role') }}
                </p>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {{ t('companyPages.team.founder.description') }}
                </p>
                <button
                  class="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 dark:bg-purple-400 text-white dark:text-brand-dark rounded-xl font-bold hover:bg-purple-600 dark:hover:bg-purple-500 hover:scale-[1.02] transition-all"
                  @click="navigateTo('/empresa/fundador')"
                >
                  {{ t('companyPages.team.founder.button') }}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Team Categories Grid -->
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Leadership -->
          <div class="bg-white/90 dark:bg-[#1e202d]/90 p-8 rounded-2xl border border-gray-100 dark:border-brand-primary/20 text-center hover:shadow-lg transition-all">
            <div class="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                viewBox="0 0 256 256"
                class="text-purple-500"
              >
                <path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {{ t('companyPages.team.leadership.title') }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ t('companyPages.team.leadership.description') }}
            </p>
          </div>

          <!-- Developers -->
          <div class="bg-white/90 dark:bg-[#1e202d]/90 p-8 rounded-2xl border border-gray-100 dark:border-brand-primary/20 text-center hover:shadow-lg transition-all">
            <div class="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                viewBox="0 0 256 256"
                class="text-brand-primary dark:text-brand-light-primary"
              >
                <path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29Z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {{ t('companyPages.team.developers.title') }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ t('companyPages.team.developers.description') }}
            </p>
          </div>

          <!-- Designers -->
          <div class="bg-white/90 dark:bg-[#1e202d]/90 p-8 rounded-2xl border border-gray-100 dark:border-brand-primary/20 text-center hover:shadow-lg transition-all">
            <div class="w-16 h-16 rounded-full bg-pink-500/10 flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                viewBox="0 0 256 256"
                class="text-pink-500"
              >
                <path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37Z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {{ t('companyPages.team.designers.title') }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ t('companyPages.team.designers.description') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section
      :ref="ctaSection.target"
      :class="[
        `py-16 md:py-24 px-6 md:px-12 relative overflow-hidden`,
        ctaSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
      ]"
    >
      <div class="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500 opacity-10" />
      <div class="max-w-4xl mx-auto text-center relative z-10">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          {{ t('companyPages.team.joinTeam.title') }}
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
          {{ t('companyPages.team.joinTeam.description') }}
        </p>
        <button
          class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-500 dark:bg-purple-400 text-white dark:text-brand-dark rounded-xl font-bold text-lg hover:bg-purple-600 dark:hover:bg-purple-500 hover:scale-105 transition-all shadow-lg"
          @click="navigateTo('/empresa/carreiras')"
        >
          {{ t('companyPages.team.joinTeam.button') }}
        </button>
      </div>
    </section>
  </div>
</template>
