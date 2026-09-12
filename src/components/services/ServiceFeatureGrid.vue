<script setup lang="ts">
import ServiceIcon from '@/components/services/ServiceIcon.vue'
import type { ServiceFeature } from '@/types/service'

defineProps<{ features: ServiceFeature[] }>()
</script>

<template>
  <div
    class="grid gap-3.5"
    style="grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr))"
  >
    <article
      v-for="(feature, index) in features"
      :key="feature.id"
      v-reveal="index * 70"
      class="flex flex-col gap-2.5 rounded-2xl border border-gray-900/[0.08] bg-brand-light p-[22px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(30,30,80,.10)] dark:border-white/10 dark:bg-white/[0.04] dark:hover:shadow-[0_14px_36px_rgba(0,0,0,.45)]"
    >
      <span
        class="inline-flex h-10 w-10 items-center justify-center rounded-[10px] bg-brand-primary/10 text-brand-primary dark:bg-brand-light-primary/15 dark:text-brand-light-primary"
      >
        <ServiceIcon :name="feature.id" />
      </span>
      <h3 class="text-[17px] font-bold text-gray-900 dark:text-white">
        {{ feature.title }}
      </h3>
      <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        {{ feature.description }}
      </p>
    </article>
  </div>
</template>
