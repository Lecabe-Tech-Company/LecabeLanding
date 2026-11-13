<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useThemeStore } from './stores/theme'
import { useI18n } from 'vue-i18n'
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
import AnalyticsConsent from './components/AnalyticsConsent.vue'

const themeStore = useThemeStore()
const { t, locale } = useI18n()

onMounted(() => {
  themeStore.initTheme()

  const savedLocale = localStorage.getItem('locale') || 'pt'
  document.documentElement.lang = savedLocale
  locale.value = savedLocale
})
</script>

<template>
  <div class="min-h-screen flex flex-col transition-colors duration-300">
    <a href="#main-content" class="skip-to-main">
      {{ t('accessibility.skipToContent') }}
    </a>

    <Header />
    <main id="main-content" class="flex-grow" role="main" tabindex="-1">
      <RouterView />
    </main>
    <Footer />
    <AnalyticsConsent />
  </div>
</template>

<style scoped>
/* Component-specific styles if needed */
</style>
