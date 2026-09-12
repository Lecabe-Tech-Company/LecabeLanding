<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useWhatsapp } from '@/composables/useWhatsapp'

const SUBJECT_KEYS = ['general', 'budget', 'support', 'partnership']

const props = defineProps<{ whatsappUrl: string }>()

const { t } = useI18n()
const { whatsappLink } = useWhatsapp()

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const subjects = computed(() => SUBJECT_KEYS.map(key => t(`contact.form.subjects.${key}`)))

/**
 * There is no backend to post to, so the form composes the message and hands
 * it to WhatsApp — the same channel every other CTA on the page uses, and the
 * one the visitor was told they would get a reply on.
 */
const submit = (): void => {
  const { name, email, subject, message } = form.value
  const body = [
    t('contact.form.name') + ': ' + name,
    t('contact.form.email') + ': ' + email,
    t('contact.form.subject') + ': ' + (subject || subjects.value[0]),
    '',
    message
  ].join('\n')
  window.open(whatsappLink(body), '_blank', 'noopener')
}
</script>

<template>
  <section
    id="contato"
    aria-labelledby="contact-title"
    class="scroll-mt-24 bg-gradient-to-b from-brand-light to-[#EEF0FF] dark:from-transparent dark:to-brand-medium-dark-primary/20"
  >
    <div class="mx-auto grid max-w-7xl items-start gap-10 px-6 py-20 md:px-12 lg:grid-cols-2">
      <div class="flex flex-col gap-5">
        <p
          v-reveal
          class="text-[13px] font-bold uppercase tracking-[0.08em] text-brand-primary dark:text-brand-light-primary"
        >
          {{ t('contactHome.eyebrow') }}
        </p>

        <h2
          id="contact-title"
          v-reveal="60"
          class="text-[clamp(1.75rem,3.4vw,2.625rem)] font-extrabold leading-tight tracking-[-0.02em] text-gray-900 dark:text-white"
        >
          {{ t('contact.title') }}
        </h2>

        <p
          v-reveal="120"
          class="text-[17px] leading-relaxed text-gray-600 dark:text-gray-300"
        >
          {{ t('contact.subtitle') }}
        </p>

        <a
          v-reveal="160"
          :href="props.whatsappUrl"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-4 rounded-2xl bg-brand-dark p-5 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-brand-medium-dark-primary"
        >
          <span class="inline-flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-brand-alternative text-brand-dark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 256 256"
              aria-hidden="true"
            ><path d="M187.58,144.84l-32-16a8,8,0,0,0-8,.5l-14.69,9.8a40.55,40.55,0,0,1-16-16l9.8-14.69a8,8,0,0,0,.5-8l-16-32A8,8,0,0,0,104,64a40,40,0,0,0-40,40,88.1,88.1,0,0,0,88,88,40,40,0,0,0,40-40A8,8,0,0,0,187.58,144.84ZM152,176a72.08,72.08,0,0,1-72-72A24,24,0,0,1,99.29,80.46l11.48,23L101,118a8,8,0,0,0-.73,7.51,56.47,56.47,0,0,0,30.15,30.15A8,8,0,0,0,138,155l14.61-9.74,23,11.48A24,24,0,0,1,152,176ZM128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z" /></svg>
          </span>
          <span class="flex flex-1 flex-col gap-0.5">
            <span class="text-base font-bold">{{ t('contactHome.whatsappTitle') }}</span>
            <span class="text-[13px] text-[#B4BCD0]">{{ t('contactHome.whatsappSubtitle') }}</span>
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>

        <address
          v-reveal="200"
          class="flex flex-wrap gap-x-6 gap-y-2 text-sm not-italic text-gray-600 dark:text-gray-400"
        >
          <a
            href="mailto:contato@lecabe.com.br"
            class="font-semibold text-gray-600 transition-colors hover:text-brand-primary dark:text-gray-400 dark:hover:text-brand-light-primary"
          >contato@lecabe.com.br</a>
          <span>{{ t('contact.info.address') }}</span>
        </address>
      </div>

      <form
        v-reveal="120"
        :aria-label="t('contact.form.subject')"
        class="flex flex-col gap-3.5 rounded-[20px] border border-gray-900/10 bg-white p-[26px] shadow-[0_1px_2px_rgba(30,30,80,.06),0_6px_20px_rgba(30,30,80,.07)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none"
        @submit.prevent="submit"
      >
        <div
          class="grid gap-3.5"
          style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))"
        >
          <label class="flex flex-col gap-1.5 text-[13px] font-semibold text-gray-600 dark:text-gray-400">
            {{ t('contact.form.name') }}
            <input
              v-model="form.name"
              required
              autocomplete="name"
              class="contact-field h-[46px] px-3.5"
            >
          </label>
          <label class="flex flex-col gap-1.5 text-[13px] font-semibold text-gray-600 dark:text-gray-400">
            {{ t('contact.form.email') }}
            <input
              v-model="form.email"
              type="email"
              required
              autocomplete="email"
              class="contact-field h-[46px] px-3.5"
            >
          </label>
        </div>

        <label class="flex flex-col gap-1.5 text-[13px] font-semibold text-gray-600 dark:text-gray-400">
          {{ t('contact.form.subject') }}
          <select
            v-model="form.subject"
            class="contact-field h-[46px] px-3.5"
          >
            <option
              v-for="subject in subjects"
              :key="subject"
              :value="subject"
            >
              {{ subject }}
            </option>
          </select>
        </label>

        <label class="flex flex-col gap-1.5 text-[13px] font-semibold text-gray-600 dark:text-gray-400">
          {{ t('contact.form.message') }}
          <textarea
            v-model="form.message"
            required
            minlength="20"
            rows="4"
            class="contact-field resize-y px-3.5 py-3"
          />
        </label>

        <button
          type="submit"
          class="inline-flex h-[50px] items-center justify-center gap-2.5 rounded-xl bg-brand-primary text-[15px] font-bold text-white transition-all duration-200 hover:-translate-y-px hover:bg-brand-dark-primary"
        >
          {{ t('contactHome.submit') }}
        </button>

        <p class="text-center text-xs text-gray-500 dark:text-gray-400">
          {{ t('contactHome.note') }}
        </p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.contact-field {
  @apply rounded-[10px] border border-gray-900/[0.14] bg-[#f4f5fb] text-gray-900 outline-none transition-all duration-200;
  @apply dark:border-white/15 dark:bg-white/[0.06] dark:text-white;
}

.contact-field:focus {
  @apply border-brand-primary bg-white shadow-[0_0_0_3px_rgba(79,82,255,.15)];
  @apply dark:bg-white/10;
}
</style>
