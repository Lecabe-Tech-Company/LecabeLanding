<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import WorkflowBrandIcon from '@/components/ui/WorkflowBrandIcon.vue'

type IconName = 'excel' | 'sharepoint' | 'notion' | 'api' | 'slack' | 'stars' | 'report'
type Status = 'done' | 'active' | 'todo'

const { t, tm } = useI18n()
const active = ref(0)
const root = ref<HTMLElement | null>(null)
const stepDelay = 2800
let timer: ReturnType<typeof setInterval> | undefined
let observer: IntersectionObserver | undefined
let inView = true

const steps = computed(() => {
  const raw = (tm('hero.workflow.steps') as unknown[]) || []
  return raw.map((_, index) => ({
    icon: t('hero.workflow.steps[' + index + '].icon') as IconName,
    title: t('hero.workflow.steps[' + index + '].title'),
    detail: t('hero.workflow.steps[' + index + '].detail'),
    thought: t('hero.workflow.steps[' + index + '].thought')
  }))
})
const thought = computed(() => steps.value[active.value]?.thought || '')
const progress = computed(() => steps.value.length ? Math.round(active.value * 100 / steps.value.length) : 0)
function status(index: number): Status {
  return index < active.value ? 'done' : index === active.value ? 'active' : 'todo'
}
function statusText(index: number) { return t('hero.workflow.statuses.' + status(index)) }
const nodes: { icon: IconName; label: string; index: number; position: string }[] = [
  { icon: 'api', label: 'Skill API', index: 1, position: 'skill' },
  { icon: 'notion', label: 'Notion', index: 2, position: 'notion' },
  { icon: 'sharepoint', label: 'SharePoint', index: 3, position: 'sharepoint' },
  { icon: 'excel', label: 'Excel', index: 4, position: 'excel' },
  { icon: 'slack', label: 'Slack', index: 6, position: 'slack' }
]
function stop() {
  if (timer) clearInterval(timer)
  timer = undefined
}
function start() {
  if (timer || steps.value.length < 2 || document.hidden) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setInterval(() => {
    active.value = (active.value + 1) % steps.value.length
  }, stepDelay)
}
function onVisibility() { if (document.hidden) stop(); else if (inView) start() }
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    active.value = Math.max(0, steps.value.length - 1)
    return
  }
  if ('IntersectionObserver' in window && root.value) {
    observer = new IntersectionObserver(entries => {
      inView = entries[0]?.isIntersecting === true
      if (inView) start()
      else stop()
    }, { rootMargin: '100px' })
    observer.observe(root.value)
  } else start()
  document.addEventListener('visibilitychange', onVisibility)
})
onBeforeUnmount(() => {
  stop()
  observer?.disconnect()
  document.removeEventListener('visibilitychange', onVisibility)
})
</script>

<template>
  <figure ref="root" class="mx-auto overflow-hidden rounded-[26px] border border-gray-900/10 bg-white shadow-[0_28px_68px_rgba(23,27,56,.08)] dark:border-white/10 dark:bg-[#101421]">
    <div class="grid gap-4 p-3 sm:p-5 lg:grid-cols-[minmax(0,330px)_minmax(0,1fr)] lg:gap-5">
      <div class="flex flex-col gap-3">
        <div class="rounded-2xl border border-gray-900/[.08] bg-gray-50 px-4 py-4 dark:border-white/10 dark:bg-white/[.04]">
          <p class="mb-2 text-[10px] font-bold uppercase tracking-[.13em] text-gray-500 dark:text-gray-400">{{ t('hero.workflow.requestLabel') }}</p>
          <p class="text-[14px] font-medium leading-relaxed text-gray-800 dark:text-gray-200">{{ t('hero.workflow.request') }}</p>
        </div>
        <div class="rounded-2xl border border-brand-primary/20 bg-brand-primary/[.035] px-4 py-3 dark:bg-brand-primary/10">
          <p class="mb-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.1em] text-brand-dark-primary dark:text-brand-light-primary">
            <WorkflowBrandIcon name="stars" :size="16" /> {{ t('hero.workflow.thinking') }}
          </p>
          <p class="min-h-[42px] text-[13px] leading-relaxed text-gray-700 dark:text-gray-200" aria-live="off">{{ thought }}</p>
        </div>
        <ol class="m-0 flex list-none flex-col gap-2 p-0">
          <li v-for="(step, index) in steps" :key="index"
            class="flex items-center gap-3 rounded-xl border p-2.5 transition-colors duration-300"
            :class="status(index) === 'done' ? 'border-emerald-200 bg-emerald-50/60 dark:border-emerald-500/30 dark:bg-emerald-500/10' : status(index) === 'active' ? 'flow-active border-blue-400 bg-blue-50/80 dark:bg-blue-500/10' : 'border-gray-200/80 bg-white dark:border-white/10 dark:bg-white/[.02]'">
            <span class="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border bg-white dark:bg-[#191e30]"
              :class="status(index) === 'done' ? 'border-emerald-500 text-emerald-700' : status(index) === 'active' ? 'border-blue-500 text-blue-600' : 'border-gray-200 text-gray-500 dark:border-white/10 dark:text-gray-400'">
              <WorkflowBrandIcon :name="step.icon" :size="20" />
              <span v-if="status(index) === 'done'" class="absolute -right-1 -top-1 grid h-[17px] w-[17px] place-items-center rounded-full bg-emerald-500 text-[10px] font-black text-white">✓</span>
              <span v-else-if="status(index) === 'active'" class="absolute -right-1 -top-1 grid h-[17px] w-[17px] place-items-center rounded-full bg-blue-500"><span class="flow-spinner" /></span>
            </span>
            <div class="min-w-0">
              <p class="text-[12px] font-bold leading-snug text-gray-900 dark:text-white sm:text-[13px]">{{ step.title }}</p>
              <p class="text-[11px] leading-snug text-gray-500 dark:text-gray-400">{{ step.detail }}</p>
            </div>
          </li>
        </ol>
      </div>

      <div class="flow-stage relative isolate min-h-[535px] overflow-hidden rounded-[22px] bg-[#141828] text-white">
        <div class="flow-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <header class="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-4 py-4 sm:px-5">
          <div>
            <p class="text-[10px] font-semibold uppercase tracking-[.15em] text-white/50">LECABE / AGENT WORKFLOW</p>
            <h2 class="mt-1 text-[15px] font-bold tracking-tight sm:text-lg">{{ t('hero.workflow.heading') }}</h2>
          </div>
          <span class="rounded-full border border-brand-alternative/25 bg-brand-alternative/10 px-2.5 py-1 text-[10px] font-semibold text-brand-alternative">{{ t('hero.workflow.live') }}</span>
        </header>
        <div class="pointer-events-none absolute left-1/2 top-[53%] h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary/10 blur-[55px]" aria-hidden="true" />
        <svg class="pointer-events-none absolute inset-x-0 top-[75px] h-[420px] w-full" viewBox="0 0 600 450" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <circle cx="300" cy="226" r="136" stroke="#888AFF" stroke-opacity=".19" />
          <circle cx="300" cy="226" r="96" stroke="#888AFF" stroke-opacity=".18" stroke-dasharray="4 9" />
          <path d="M115 130 255 201M490 130 345 201M505 225H348M460 357 347 256M125 357 252 256" stroke="#AAA9FF" stroke-width="1.6" stroke-opacity=".55" stroke-linecap="round" />
          <path d="M300 282V370" stroke="#AAA9FF" stroke-width="1.6" stroke-opacity=".55" stroke-linecap="round" />
        </svg>

        <div class="flow-bubble absolute left-1/2 top-[86px] z-[4] w-[min(88%,320px)] -translate-x-1/2 rounded-[18px] border border-white/25 bg-white px-4 py-3 text-[#20243B] shadow-xl">
          <p class="mb-1 text-[9px] font-bold uppercase tracking-[.13em] text-brand-dark-primary">{{ t('hero.workflow.thinking') }}</p>
          <p class="text-[12px] font-medium leading-relaxed">{{ thought }}</p>
        </div>

        <div class="agent-core absolute left-1/2 top-[51%] z-[3] flex h-[143px] w-[155px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[24px] border border-[#898CFF]/55 bg-[#252952] px-3 text-center shadow-[0_22px_48px_rgba(5,8,24,.35)] sm:w-[175px]">
          <div class="mb-2 grid h-11 w-11 place-items-center rounded-2xl bg-brand-primary/30 text-[#C7BDFF]"><WorkflowBrandIcon name="stars" :size="28" /></div>
          <strong class="text-[15px] font-bold">{{ t('hero.workflow.agent') }}</strong>
          <span class="mt-1 text-[10px] leading-snug text-white/65">{{ t('hero.workflow.agentSub') }}</span>
        </div>

        <div v-for="node in nodes" :key="node.icon" :class="'flow-node--' + node.position"
          class="flow-node absolute z-[3] flex items-center gap-1.5 rounded-xl border bg-[#242A3D] px-2 py-2 shadow-lg sm:gap-2 sm:px-2.5"
          :style="{ borderColor: status(node.index) === 'done' ? '#32C889' : status(node.index) === 'active' ? '#60A5FA' : 'rgba(255,255,255,.15)' }"
          :data-state="status(node.index)">
          <span class="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-[#171B2B] sm:h-9 sm:w-9"><WorkflowBrandIcon :name="node.icon" :size="20" /></span>
          <span class="min-w-0 truncate text-[11px] font-semibold sm:text-[12px]">{{ node.label }}</span>
          <span v-if="status(node.index) === 'done'" class="absolute -right-1 -top-1 grid h-[17px] w-[17px] place-items-center rounded-full bg-emerald-500 text-[10px] font-black">✓</span>
          <span v-else-if="status(node.index) === 'active'" class="absolute -right-1 -top-1 grid h-[17px] w-[17px] place-items-center rounded-full bg-blue-500"><span class="flow-spinner" /></span>
        </div>

        <div class="flow-report absolute bottom-[21px] left-1/2 z-[3] w-[min(64%,220px)] -translate-x-1/2 rounded-xl border bg-[#242A3D] p-3 shadow-lg"
          :data-state="status(5)"
          :style="{ borderColor: status(5) === 'done' ? '#32C889' : status(5) === 'active' ? '#60A5FA' : 'rgba(255,255,255,.15)' }">
          <div class="flex items-center justify-center gap-2">
            <span class="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-[#171B2B]"><WorkflowBrandIcon name="report" :size="20" /></span>
            <div><p class="text-[11px] font-bold leading-snug">{{ t('hero.workflow.report') }}</p><p class="text-[10px] text-white/60">{{ statusText(5) }}</p></div>
            <span v-if="status(5) === 'done'" class="text-xs font-bold text-emerald-400">✓</span>
            <span v-else-if="status(5) === 'active'" class="flow-spinner ml-auto" />
          </div>
          <div v-if="active >= 4" class="mt-2 flex flex-wrap justify-center gap-1 text-[9px] text-white/60"><span>Q1.xlsx</span><span>· Q2.xlsx</span><span>· Q3.xlsx</span></div>
        </div>
        <div class="pointer-events-none absolute bottom-0 left-0 h-0.5 bg-brand-primary/70 transition-[width] duration-500" :style="{ width: progress + '%' }" aria-hidden="true" />
      </div>
    </div>
    <figcaption class="border-t border-gray-900/[.06] px-5 py-3 text-center text-[11px] text-gray-500 dark:border-white/10 dark:text-gray-400">{{ t('hero.workflow.description') }}</figcaption>
  </figure>
</template>

<style scoped>
.flow-stage { background-image: radial-gradient(circle at 50% 52%,rgba(85,78,220,.16), transparent 55%); }
.flow-grid { background-image: linear-gradient(rgba(255,255,255,.026) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.026) 1px,transparent 1px); background-size:28px 28px; mask-image:linear-gradient(to bottom,#000,transparent 96%); }
.flow-bubble:after { content:'';position:absolute;bottom:-8px;left:50%;width:16px;height:16px;transform:translateX(-50%) rotate(45deg);background:inherit; }
.flow-node { width:125px; }
.flow-node--skill { left:2%;top:29%; }
.flow-node--notion { right:2%;top:29%; }
.flow-node--sharepoint { right:1%;top:51%; }
.flow-node--excel { right:8%;bottom:17%; }
.flow-node--slack { left:4%;bottom:17%; }
.flow-node[data-state='active'], .flow-report[data-state='active'], .flow-active { animation:flow-glow 1.3s ease-in-out infinite; }
.flow-spinner { width:10px;height:10px;border:2px solid rgba(255,255,255,.4);border-top-color:white;border-radius:50%;animation:flow-spin .8s linear infinite; }
@keyframes flow-glow { 0%,100% { box-shadow:0 0 0 0 rgba(96,165,250,.1); } 50% { box-shadow:0 0 0 4px rgba(96,165,250,.18); } }
@keyframes flow-spin { to { transform:rotate(360deg); } }
@media(max-width:540px) {
  .flow-node { width:92px; padding:6px; flex-direction:column; text-align:center; }
  .flow-node span:nth-child(2) { max-width:83px;font-size:10px; }
  .agent-core { width:130px;height:132px;top:52%; }
  .flow-node--skill { left:0;top:34%; }
  .flow-node--notion { right:0;top:34%; }
  .flow-node--sharepoint { right:0;top:53%; }
  .flow-node--excel { right:2%;bottom:18%; }
  .flow-node--slack { left:2%;bottom:18%; }
}
@media(prefers-reduced-motion:reduce) {
  .flow-spinner,.flow-node[data-state='active'],.flow-report[data-state='active'],.flow-active { animation:none; }
}
</style>
