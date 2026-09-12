<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{ serviceName: string }>()

const { t } = useI18n()
</script>

<template>
  <nav
    :aria-label="t('breadcrumb.label')"
    class="flex items-center gap-2 text-[13px] font-medium text-gray-500 dark:text-gray-400"
  >
    <router-link
      to="/"
      class="transition-colors hover:text-brand-primary dark:hover:text-brand-light-primary"
    >
      {{ t('breadcrumb.home') }}
    </router-link>
    <span aria-hidden="true">/</span>
    <router-link
      to="/servicos"
      class="transition-colors hover:text-brand-primary dark:hover:text-brand-light-primary"
    >
      {{ t('nav.services') }}
    </router-link>
    <span aria-hidden="true">/</span>
    <span class="font-semibold text-gray-900 dark:text-white">{{ serviceName }}</span>
  </nav>
</template>
