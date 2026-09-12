<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{
  title: string
  description: string
  buttonLabel: string
  whatsappUrl: string
}>()

const { t } = useI18n()
</script>

<template>
  <aside
    v-reveal="100"
    :aria-label="t('serviceUi.contactCardLabel')"
    class="relative flex flex-col gap-4 overflow-hidden rounded-[20px] bg-brand-dark p-[30px] text-brand-light lg:sticky lg:top-32"
  >
    <div
      class="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(79,82,255,.45),transparent_70%)]"
      aria-hidden="true"
    />

    <p class="inline-flex items-center gap-2 self-start text-xs font-bold text-brand-alternative">
      <span
        class="service-contact__dot h-2 w-2 rounded-full bg-brand-alternative"
        aria-hidden="true"
      />
      {{ t('serviceUi.responseTime') }}
    </p>

    <h2 class="text-2xl font-extrabold leading-tight tracking-[-0.02em] text-white">
      {{ title }}
    </h2>

    <p class="text-[15px] leading-relaxed text-[#B4BCD0]">
      {{ description }}
    </p>

    <a
      :href="whatsappUrl"
      target="_blank"
      rel="noopener"
      class="inline-flex items-center justify-center gap-2.5 rounded-xl bg-brand-alternative px-5 py-3.5 text-[15px] font-bold text-brand-dark transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 256 256"
        aria-hidden="true"
      ><path d="M187.58,144.84l-32-16a8,8,0,0,0-8,.5l-14.69,9.8a40.55,40.55,0,0,1-16-16l9.8-14.69a8,8,0,0,0,.5-8l-16-32A8,8,0,0,0,104,64a40,40,0,0,0-40,40,88.1,88.1,0,0,0,88,88,40,40,0,0,0,40-40A8,8,0,0,0,187.58,144.84ZM152,176a72.08,72.08,0,0,1-72-72A24,24,0,0,1,99.29,80.46l11.48,23L101,118a8,8,0,0,0-.73,7.51,56.47,56.47,0,0,0,30.15,30.15A8,8,0,0,0,138,155l14.61-9.74,23,11.48A24,24,0,0,1,152,176ZM128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z" /></svg>
      {{ buttonLabel }}
    </a>

    <p class="text-xs text-[#868CAA]">
      {{ t('serviceUi.contactDisclaimer') }}
    </p>
  </aside>
</template>

<style scoped>
.service-contact__dot {
  animation: service-contact-pulse 2s infinite;
}

@keyframes service-contact-pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(47, 224, 176, 0.55);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(47, 224, 176, 0);
  }
}
</style>
