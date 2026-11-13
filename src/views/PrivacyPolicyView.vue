<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import TechBackground from '@/components/TechBackground.vue'

const { t } = useI18n()
const router = useRouter()

const heroSection = useScrollAnimation({}, true)
const contentSection = useScrollAnimation()

const goBack = () => {
  router.push('/')
}

const sections = [
  {
    number: '01',
    title: 'Introdução',
    content: 'A Lecabe está comprometida em proteger sua privacidade. Esta Política de Privacidade explica como coletamos, usamos e protegemos suas informações quando você visita nosso site e utiliza nossos serviços.'
  },
  {
    number: '02',
    title: 'Informações que Coletamos',
    content: 'Coletamos apenas informações que você nos fornece diretamente: nome, e-mail, telefone, empresa, cargo e mensagens que nos envia através do formulário de contato ou WhatsApp. Também armazenamos preferências essenciais como idioma e tema. Com seu consentimento, o Google Analytics 4 coleta informações de uso do site, como páginas visualizadas e interações, para fins estatísticos.'
  },
  {
    number: '03',
    title: 'Como Usamos Suas Informações',
    content: 'Utilizamos suas informações para: responder suas solicitações, fornecer suporte, enviar informações sobre nossos serviços quando solicitado, melhorar sua experiência no site e cumprir obrigações legais.'
  },
  {
    number: '04',
    title: 'Compartilhamento de Informações',
    content: 'Não vendemos suas informações pessoais. Podemos compartilhá-las apenas com seu consentimento explícito, com prestadores de serviços essenciais para nossa operação, ou para cumprir obrigações legais.'
  },
  {
    number: '05',
    title: 'Cookies',
    content: 'Utilizamos armazenamento local para lembrar idioma, tema e sua escolha de privacidade. O Google Analytics 4 somente é carregado depois que você aceita o uso de analytics e poderá utilizar cookies analíticos. Você pode recusar ou alterar sua escolha no botão Privacidade disponível no site. Para remover cookies já armazenados, use os controles do navegador.'
  },
  {
    number: '06',
    title: 'Segurança de Dados',
    content: 'Implementamos medidas de segurança para proteger suas informações pessoais contra acesso não autorizado, alteração ou destruição. Utilizamos criptografia e boas práticas de segurança em nossos sistemas.'
  },
  {
    number: '07',
    title: 'Seus Direitos (LGPD)',
    content: 'De acordo com a Lei Geral de Proteção de Dados, você tem direito a: acessar seus dados pessoais, corrigir dados incompletos ou inexatos, solicitar a eliminação de dados, revogar o consentimento e solicitar a portabilidade dos dados.'
  },
  {
    number: '08',
    title: 'Retenção de Dados',
    content: 'Mantemos suas informações apenas pelo tempo necessário para cumprir os propósitos descritos nesta política, a menos que um período maior seja exigido por lei.'
  },
  {
    number: '09',
    title: 'Alterações nesta Política',
    content: 'Podemos atualizar esta Política de Privacidade periodicamente. Alterações significativas serão comunicadas através do site com pelo menos 30 dias de antecedência.'
  }
]
</script>

<template>
  <div class="flex flex-1 flex-col relative">
    <!-- Animated Tech Background -->
    <TechBackground />

    <!-- Hero Section -->
    <section
      :ref="heroSection.target"
      class="relative py-20 md:py-28 overflow-hidden min-h-[40vh] flex items-center"
      :class="heroSection.isVisible.value ? 'animate-fade-in' : 'opacity-0'"
    >
      <div class="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div class="max-w-4xl mx-auto text-center">
          <!-- Back Button -->
          <button
            class="inline-flex items-center gap-2 text-brand-primary dark:text-brand-light-primary hover:underline mb-8 text-sm"
            @click="goBack"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>{{ t('common.backToHome') }}</span>
          </button>

          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {{ t('privacy.title') }}
          </h1>
          <p class="text-lg text-gray-500 dark:text-gray-400">
            {{ t('privacy.lastUpdated') }}: Janeiro de 2025
          </p>
        </div>
      </div>
    </section>

    <!-- Content Section -->
    <section
      :ref="contentSection.target"
      class="py-16 md:py-24 px-6 md:px-12"
      :class="contentSection.isVisible.value ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'"
    >
      <div class="max-w-4xl mx-auto space-y-6">
        <!-- Policy Cards -->
        <div
          v-for="section in sections"
          :key="section.number"
          class="bg-white dark:bg-[#1e202d]/90 p-8 rounded-2xl border border-gray-100 dark:border-brand-medium-dark-primary hover:shadow-lg transition-all group"
        >
          <div class="flex items-start gap-5">
            <div class="w-12 h-12 rounded-xl bg-brand-primary/10 dark:bg-brand-light-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <span class="text-brand-primary dark:text-brand-light-primary font-bold text-sm">{{ section.number }}</span>
            </div>
            <div>
              <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {{ section.title }}
              </h2>
              <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                {{ section.content }}
              </p>
            </div>
          </div>
        </div>

        <!-- Contact Card -->
        <div class="bg-gradient-to-br from-brand-primary/5 to-brand-alternative/5 dark:from-brand-primary/10 dark:to-brand-alternative/10 p-8 rounded-2xl border border-brand-primary/20 dark:border-brand-light-primary/20">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Dúvidas sobre privacidade?
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Exerça seus direitos ou tire dúvidas:
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:contato@lecabe.com.br"
              class="inline-flex items-center gap-2 text-brand-primary dark:text-brand-light-primary hover:underline"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              contato@lecabe.com.br
            </a>
            <a
              href="https://wa.me/5511994132821"
              target="_blank"
              class="inline-flex items-center gap-2 text-brand-primary dark:text-brand-light-primary hover:underline"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              +55 11 99413-2821
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
