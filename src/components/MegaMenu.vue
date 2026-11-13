<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

const emit = defineEmits<{
  closeMenu: []
}>()

const activeMenu = ref<string | null>(null)
let closeTimeout: ReturnType<typeof setTimeout> | null = null

const services = computed(() => [
  {
    icon: 'code',
    title: t('megamenu.services.items.software.title'),
    description: t('megamenu.services.items.software.description'),
    href: '/servicos/desenvolvimento-software'
  },
  {
    icon: 'cloud',
    title: t('megamenu.services.items.cloud.title'),
    description: t('megamenu.services.items.cloud.description'),
    href: '/servicos/cloud'
  },
  {
    icon: 'design',
    title: t('megamenu.services.items.ux.title'),
    description: t('megamenu.services.items.ux.description'),
    href: '/servicos/ux-design'
  },
  {
    icon: 'ai',
    title: t('megamenu.services.items.ai.title'),
    description: t('megamenu.services.items.ai.description'),
    href: '/servicos/inteligencia-artificial'
  }
])

// TEMPORARILY DISABLED - Products section
/*
const products = computed(() => [
  {
    icon: 'erp',
    title: t('megamenu.products.items.erp.title'),
    description: t('megamenu.products.items.erp.description'),
    tag: t('megamenu.products.tags.new'),
    href: '/produtos'
  },
  {
    icon: 'crm',
    title: t('megamenu.products.items.crm.title'),
    description: t('megamenu.products.items.crm.description'),
    tag: t('megamenu.products.tags.popular'),
    href: '/produtos'
  },
  {
    icon: 'analytics',
    title: t('megamenu.products.items.analytics.title'),
    description: t('megamenu.products.items.analytics.description'),
    href: '/produtos'
  },
  {
    icon: 'ecommerce',
    title: t('megamenu.products.items.commerce.title'),
    description: t('megamenu.products.items.commerce.description'),
    href: '/produtos'
  }
])
*/

const company = computed(() => [
  { title: t('megamenu.company.items.overview.title'), description: t('megamenu.company.items.overview.description'), icon: 'info', href: '/empresa' },
  { title: t('megamenu.company.items.about.title'), description: t('megamenu.company.items.about.description'), icon: 'history', href: '/empresa/sobre' },
  { title: t('megamenu.company.items.team.title'), description: t('megamenu.company.items.team.description'), icon: 'team', href: '/empresa/equipe' },
  { title: t('megamenu.company.items.founder.title'), description: t('megamenu.company.items.founder.description'), icon: 'founder', href: '/empresa/fundador' },
  { title: t('megamenu.company.items.culture.title'), description: t('megamenu.company.items.culture.description'), icon: 'culture', href: '/empresa/cultura' },
  { title: t('megamenu.company.items.careers.title'), description: t('megamenu.company.items.careers.description'), icon: 'careers', href: '/empresa/carreiras' }
])

const openMenu = (menu: string) => {
  if (closeTimeout) {
    clearTimeout(closeTimeout)
    closeTimeout = null
  }
  activeMenu.value = menu
}

const scheduleClose = () => {
  closeTimeout = setTimeout(() => {
    activeMenu.value = null
  }, 150)
}

const cancelClose = () => {
  if (closeTimeout) {
    clearTimeout(closeTimeout)
    closeTimeout = null
  }
}

const navigateTo = (href: string) => {
  activeMenu.value = null
  emit('closeMenu')

  if (href.startsWith('#')) {
    const currentPath = router.currentRoute.value.path
    if (currentPath !== '/') {
      router.push({ path: '/', hash: href })
    } else {
      const element = document.getElementById(href.substring(1))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  } else {
    router.push(href)
  }
}
</script>

<template>
  <nav class="hidden lg:flex items-center gap-1">
    <!-- Services Dropdown -->
    <div
      class="relative"
      @mouseenter="openMenu('services')"
      @mouseleave="scheduleClose"
    >
      <button
        class="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-brand-primary dark:hover:text-brand-light-primary transition-colors rounded-lg hover:bg-gray-100/50 dark:hover:bg-brand-medium-dark-primary/30"
        :class="{ 'text-brand-primary dark:text-brand-light-primary': activeMenu === 'services' }"
      >
        <span>{{ t('nav.services') }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 256 256"
          class="transition-transform duration-200"
          :class="{ 'rotate-180': activeMenu === 'services' }"
        >
          <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
        </svg>
      </button>

      <!-- Services Dropdown Panel -->
      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-2"
      >
        <div
          v-if="activeMenu === 'services'"
          class="absolute top-full left-0 mt-2 w-[420px] bg-white/95 dark:bg-brand-dark/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-brand-medium-dark-primary/50 overflow-hidden"
          @mouseenter="cancelClose"
          @mouseleave="scheduleClose"
        >
          <div class="p-6">
            <!-- Header -->
            <div class="mb-5">
              <h3 class="font-bold text-gray-900 dark:text-white text-base mb-1">
                {{ t('megamenu.services.title') }}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ t('megamenu.services.subtitle') }}
              </p>
            </div>

            <!-- Services List -->
            <div class="space-y-2 mb-4">
              <button
                v-for="service in services"
                :key="service.title"
                class="w-full flex items-center gap-4 p-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-brand-medium-dark-primary/30 transition-all duration-200 text-left group border border-transparent hover:border-gray-200 dark:hover:border-brand-medium-dark-primary"
                @click="navigateTo(service.href)"
              >
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-primary/10 to-brand-primary/5 dark:from-brand-light-primary/10 dark:to-brand-light-primary/5 flex items-center justify-center flex-shrink-0 group-hover:from-brand-primary/20 group-hover:to-brand-primary/10 dark:group-hover:from-brand-light-primary/20 dark:group-hover:to-brand-light-primary/10 transition-all">
                  <svg
                    v-if="service.icon === 'code'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                    class="text-brand-primary dark:text-brand-light-primary"
                  >
                    <path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29Z" />
                  </svg>
                  <svg
                    v-else-if="service.icon === 'cloud'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                    class="text-brand-primary dark:text-brand-light-primary"
                  >
                    <path d="M160,40A88.09,88.09,0,0,0,81.29,88.67,64,64,0,1,0,72,216h88a88,88,0,0,0,0-176Z" />
                  </svg>
                  <svg
                    v-else-if="service.icon === 'design'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                    class="text-brand-primary dark:text-brand-light-primary"
                  >
                    <path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37Z" />
                  </svg>
                  <svg
                    v-else-if="service.icon === 'ai'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                    class="text-brand-primary dark:text-brand-light-primary"
                  >
                    <path d="M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48Zm16,144a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V80A16,16,0,0,1,56,64H200a16,16,0,0,1,16,16Zm-36-56a12,12,0,1,1-12-12A12,12,0,0,1,180,136ZM88,136a12,12,0,1,1-12-12A12,12,0,0,1,88,136Z" />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="font-semibold text-gray-900 dark:text-white text-sm mb-0.5 group-hover:text-brand-primary dark:group-hover:text-brand-light-primary transition-colors">
                    {{ service.title }}
                  </h4>
                  <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {{ service.description }}
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  class="text-gray-400 group-hover:text-brand-primary dark:group-hover:text-brand-light-primary transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
                >
                  <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z" />
                </svg>
              </button>
            </div>

            <!-- CTA -->
            <div class="pt-4 border-t border-gray-200 dark:border-brand-medium-dark-primary/50">
              <button
                class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-brand-primary dark:bg-brand-light-primary text-white dark:text-brand-dark rounded-xl font-semibold text-sm hover:bg-brand-dark-primary dark:hover:bg-brand-medium-primary transition-all hover:scale-[1.02]"
                @click="navigateTo('/servicos')"
              >
                <span>{{ t('megamenu.services.cta') }}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Products Dropdown - TEMPORARILY DISABLED -->
    <!--
    <div
      class="relative"
      @mouseenter="openMenu('products')"
      @mouseleave="scheduleClose"
    >
      <button
        class="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-brand-primary dark:hover:text-brand-light-primary transition-colors rounded-lg hover:bg-gray-100/50 dark:hover:bg-brand-medium-dark-primary/30"
        :class="{ 'text-brand-primary dark:text-brand-light-primary': activeMenu === 'products' }"
      >
        <span>{{ t('nav.products') || 'Produtos' }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 256 256"
          class="transition-transform duration-200"
          :class="{ 'rotate-180': activeMenu === 'products' }"
        >
          <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"/>
        </svg>
      </button>

      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-2"
      >
        <div
          v-if="activeMenu === 'products'"
          class="absolute top-full left-0 mt-2 w-[420px] bg-white/95 dark:bg-brand-dark/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-brand-medium-dark-primary/50 overflow-hidden"
          @mouseenter="cancelClose"
          @mouseleave="scheduleClose"
        >
          <div class="p-6">
            <div class="mb-5">
              <h3 class="font-bold text-gray-900 dark:text-white text-base mb-1">{{ t('megamenu.products.title') }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ t('megamenu.products.subtitle') }}</p>
            </div>

            <div class="space-y-2 mb-4">
              <button
                v-for="product in products"
                :key="product.title"
                class="w-full flex items-center gap-4 p-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-brand-medium-dark-primary/30 transition-all duration-200 text-left group border border-transparent hover:border-gray-200 dark:hover:border-brand-medium-dark-primary"
                @click="navigateTo(product.href)"
              >
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-alternative/10 to-brand-alternative/5 dark:from-brand-alternative/10 dark:to-brand-alternative/5 flex items-center justify-center flex-shrink-0 group-hover:from-brand-alternative/20 group-hover:to-brand-alternative/10 dark:group-hover:from-brand-alternative/20 dark:group-hover:to-brand-alternative/10 transition-all">
                  <svg v-if="product.icon === 'erp'" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256" class="text-brand-alternative">
                    <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM184,96a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,96Zm0,32a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,128Zm0,32a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,160Z"/>
                  </svg>
                  <svg v-else-if="product.icon === 'crm'" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256" class="text-brand-alternative">
                    <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"/>
                  </svg>
                  <svg v-else-if="product.icon === 'analytics'" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256" class="text-brand-alternative">
                    <path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0V156.69l50.34-50.35a8,8,0,0,1,11.32,0L128,132.69,180.69,80H160a8,8,0,0,1,0-16h40a8,8,0,0,1,8,8v40a8,8,0,0,1-16,0V91.31l-58.34,58.35a8,8,0,0,1-11.32,0L96,123.31,40,179.31V200H224A8,8,0,0,1,232,208Z"/>
                  </svg>
                  <svg v-else-if="product.icon === 'ecommerce'" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256" class="text-brand-alternative">
                    <path d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87Z"/>
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-0.5">
                    <h4 class="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-brand-alternative transition-colors">{{ product.title }}</h4>
                    <span v-if="product.tag" class="px-2 py-0.5 bg-brand-alternative/10 text-brand-alternative text-xs font-semibold rounded-md flex-shrink-0">{{ product.tag }}</span>
                  </div>
                  <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{{ product.description }}</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256" class="text-gray-400 group-hover:text-brand-alternative transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0">
                  <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"/>
                </svg>
              </button>
            </div>

            <div class="pt-4 border-t border-gray-200 dark:border-brand-medium-dark-primary/50">
              <button
                class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-brand-alternative text-white rounded-xl font-semibold text-sm hover:bg-brand-alternative/90 transition-all hover:scale-[1.02]"
                @click="navigateTo('/produtos')"
              >
                <span>{{ t('megamenu.products.cta') }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
    -->

    <!-- Company Dropdown -->
    <div
      class="relative"
      @mouseenter="openMenu('company')"
      @mouseleave="scheduleClose"
    >
      <button
        class="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-brand-primary dark:hover:text-brand-light-primary transition-colors rounded-lg hover:bg-gray-100/50 dark:hover:bg-brand-medium-dark-primary/30"
        :class="{ 'text-brand-primary dark:text-brand-light-primary': activeMenu === 'company' }"
      >
        <span>{{ t('nav.company') }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 256 256"
          class="transition-transform duration-200"
          :class="{ 'rotate-180': activeMenu === 'company' }"
        >
          <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
        </svg>
      </button>

      <!-- Company Dropdown Panel -->
      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-2"
      >
        <div
          v-if="activeMenu === 'company'"
          class="absolute top-full left-0 mt-2 w-[420px] bg-white/95 dark:bg-brand-dark/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-brand-medium-dark-primary/50 overflow-hidden"
          @mouseenter="cancelClose"
          @mouseleave="scheduleClose"
        >
          <div class="p-6">
            <!-- Header -->
            <div class="mb-5">
              <h3 class="font-bold text-gray-900 dark:text-white text-base mb-1">
                {{ t('megamenu.company.title') }}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ t('megamenu.company.subtitle') }}
              </p>
            </div>

            <!-- Company List -->
            <div class="space-y-2 mb-4">
              <button
                v-for="item in company"
                :key="item.title"
                class="w-full flex items-center gap-4 p-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-brand-medium-dark-primary/30 transition-all duration-200 text-left group border border-transparent hover:border-gray-200 dark:hover:border-brand-medium-dark-primary"
                @click="navigateTo(item.href)"
              >
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 dark:from-purple-500/10 dark:to-purple-500/5 flex items-center justify-center flex-shrink-0 group-hover:from-purple-500/20 group-hover:to-purple-500/10 dark:group-hover:from-purple-500/20 dark:group-hover:to-purple-500/10 transition-all">
                  <svg
                    v-if="item.icon === 'info'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                    class="text-purple-500"
                  >
                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z" />
                  </svg>
                  <svg
                    v-else-if="item.icon === 'history'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                    class="text-purple-500"
                  >
                    <path d="M136,80v43.47l36.12,21.67a8,8,0,0,1-8.24,13.72l-40-24A8,8,0,0,1,120,128V80a8,8,0,0,1,16,0Zm-8-48A95.44,95.44,0,0,0,60.08,60.15C52.81,67.51,46.35,74.59,40,82V64a8,8,0,0,0-16,0v40a8,8,0,0,0,8,8H72a8,8,0,0,0,0-16H49.62C55.65,87.21,61.82,80.39,68.57,73.86a80,80,0,1,1-1.16,114.45,8,8,0,1,0-11.3,11.31A96,96,0,1,0,128,32Z" />
                  </svg>
                  <svg
                    v-else-if="item.icon === 'team'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                    class="text-purple-500"
                  >
                    <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z" />
                  </svg>
                  <svg
                    v-else-if="item.icon === 'founder'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                    class="text-purple-500"
                  >
                    <path d="M230.93,220a8,8,0,0,1-6.93,4H32a8,8,0,0,1-6.92-12c15.23-26.33,38.7-45.21,66.09-54.16a72,72,0,1,1,73.66,0c27.39,8.95,50.86,27.83,66.09,54.16A8,8,0,0,1,230.93,220Z" />
                  </svg>
                  <svg
                    v-else-if="item.icon === 'culture'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                    class="text-purple-500"
                  >
                    <path d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z" />
                  </svg>
                  <svg
                    v-else-if="item.icon === 'careers'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                    class="text-purple-500"
                  >
                    <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm16,72h32a8,8,0,0,1,0,16H112a8,8,0,0,1,0-16Z" />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="font-semibold text-gray-900 dark:text-white text-sm mb-0.5 group-hover:text-purple-500 transition-colors">
                    {{ item.title }}
                  </h4>
                  <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {{ item.description }}
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  class="text-gray-400 group-hover:text-purple-500 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
                >
                  <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z" />
                </svg>
              </button>
            </div>

            <!-- CTA -->
            <div class="pt-4 border-t border-gray-200 dark:border-brand-medium-dark-primary/50">
              <button
                class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 text-white rounded-xl font-semibold text-sm hover:bg-purple-600 transition-all hover:scale-[1.02]"
                @click="navigateTo('#contact')"
              >
                <span>{{ t('megamenu.company.cta') }}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Contact CTA Button -->
    <button
      class="ml-4 px-5 py-2 bg-brand-primary dark:bg-brand-light-primary text-white dark:text-brand-dark rounded-lg font-medium text-sm hover:bg-brand-dark-primary dark:hover:bg-brand-medium-primary transition-colors"
      @click="navigateTo('#contact')"
    >
      {{ t('nav.contact') }}
    </button>
  </nav>
</template>
