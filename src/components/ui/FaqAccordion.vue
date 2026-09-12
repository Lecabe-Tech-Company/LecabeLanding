<script setup lang="ts">
import type { FAQ } from '@/types/service'

defineProps<{ items: FAQ[] }>()
</script>

<template>
  <div class="flex flex-col gap-2">
    <details
      v-for="(item, index) in items"
      :key="item.question"
      v-reveal="index * 60"
      class="faq-item rounded-[14px] border border-gray-900/[0.08] bg-brand-light px-[18px] dark:border-white/10 dark:bg-white/[0.04]"
    >
      <summary
        class="flex cursor-pointer items-center justify-between gap-3.5 py-4 text-[15px] font-bold text-gray-900 dark:text-white"
      >
        {{ item.question }}
        <span class="flex-none text-brand-primary dark:text-brand-light-primary">
          <svg
            class="faq-item__chevron"
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
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </summary>
      <p class="pb-4 text-[14.5px] leading-relaxed text-gray-600 dark:text-gray-400">
        {{ item.answer }}
      </p>
    </details>
  </div>
</template>

<style scoped>
/* Native <details> keeps the answer in the DOM for crawlers and for in-page
   find, which is exactly what the FAQPage structured data promises. */
.faq-item > summary {
  list-style: none;
}

.faq-item > summary::-webkit-details-marker {
  display: none;
}

.faq-item__chevron {
  transition: transform 0.25s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.faq-item[open] .faq-item__chevron {
  transform: rotate(180deg);
}
</style>
