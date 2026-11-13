<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import WorkflowBrandIcon from '@/components/ui/WorkflowBrandIcon.vue'

type IconName = 'excel' | 'sharepoint' | 'notion' | 'api' | 'slack' | 'stars' | 'report'
type State = 'done' | 'active' | 'todo'

const { t, tm } = useI18n()
const root = ref<HTMLElement | null>(null)
const frame = ref(0)
const paused = ref(false)
const visible = ref(false)
const reduceMotion = ref(false)
let timer: ReturnType<typeof setInterval> | undefined
let observer: IntersectionObserver | undefined

// Step 4 has three frames to demonstrate reading each Excel file.
const timeline = [
  { step: 0 }, { step: 1 }, { step: 2 }, { step: 3 },
  { step: 4, file: 0 }, { step: 4, file: 1 }, { step: 4, file: 2 },
  { step: 5 }, { step: 6 }, { step: 7 }
]
const filenames = ['01.xlsx', '02.xlsx', '03.xlsx']
const currentStep = computed(() => timeline[frame.value]?.step ?? 0)
const currentFile = computed(() => timeline[frame.value]?.file ?? 0)
const steps = computed(() => {
  const raw = (tm('hero.workflow.steps') as unknown[]) || []
  return raw.map((_, index) => ({
    icon: t('hero.workflow.steps[' + index + '].icon') as IconName,
    title: t('hero.workflow.steps[' + index + '].title'),
    thought: t('hero.workflow.steps[' + index + '].thought')
  }))
})
const allDone = computed(() => currentStep.value >= steps.value.length && steps.value.length > 0)
const thought = computed(() => steps.value[allDone.value ? steps.value.length - 1 : currentStep.value]?.thought || '')
const activeLabel = computed(() =>
  allDone.value ? t('hero.workflow.statuses.done') : steps.value[currentStep.value]?.title || ''
)
const progress = computed(() => Math.round(((frame.value + 1) / timeline.length) * 100))

const nodes: { id: string; label: string; icon: IconName; step: number; color: string }[] = [
  { id: 'api', label: 'Create Report From Meeting', icon: 'api', step: 1, color: '#655BEB' },
  { id: 'notion', label: 'Notion', icon: 'notion', step: 2, color: '#282B35' },
  { id: 'sharepoint', label: 'SharePoint', icon: 'sharepoint', step: 3, color: '#087FA7' },
  { id: 'excel', label: 'Excel', icon: 'excel', step: 4, color: '#16825A' },
  { id: 'report', label: 'Relatório', icon: 'report', step: 5, color: '#655BEB' },
  { id: 'slack', label: 'Slack', icon: 'slack', step: 6, color: '#783E82' }
]
// The SVG and icon centers share the same normalized 1000x620 coordinate space.
// This prevents connector misalignment when the scene is resized.
const connections = [
  { id: 'api', step: 1, d: 'M500 320 C385 315 320 168 185 168' },
  { id: 'notion', step: 2, d: 'M500 320 C615 315 680 168 815 168' },
  { id: 'sharepoint', step: 3, d: 'M500 320 C670 320 735 320 870 320' },
  { id: 'excel', step: 4, d: 'M500 320 C630 340 680 500 790 500' },
  { id: 'report', step: 5, d: 'M500 320 C500 405 500 470 500 550' },
  { id: 'slack', step: 6, d: 'M500 320 C370 340 315 500 210 500' }
]
function stepState(index: number): State {
  return currentStep.value > index ? 'done' : currentStep.value === index ? 'active' : 'todo'
}
function fileState(index: number): State {
  if (currentStep.value > 4 || (currentStep.value === 4 && currentFile.value > index)) return 'done'
  if (currentStep.value === 4 && currentFile.value === index) return 'active'
  return 'todo'
}
function stop() {
  if (timer) clearInterval(timer)
  timer = undefined
}
function sync() {
  stop()
  if (paused.value || reduceMotion.value || !visible.value || document.hidden) return
  timer = setInterval(() => { frame.value = (frame.value + 1) % timeline.length }, 2400)
}
function jump(step: number) {
  const index = timeline.findIndex(item => item.step === step)
  if (index === -1) return
  frame.value = index
  paused.value = true
  sync()
}
function toggle() {
  paused.value = !paused.value
  sync()
}
function replay() {
  frame.value = 0
  paused.value = false
  sync()
}
function visibilityChange() { sync() }

onMounted(() => {
  reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion.value) {
    frame.value = timeline.length - 1
    paused.value = true
  }
  if ('IntersectionObserver' in window && root.value) {
    observer = new IntersectionObserver(entries => {
      visible.value = entries[0]?.isIntersecting === true
      sync()
    }, { threshold: 0.05 })
    observer.observe(root.value)
  } else {
    visible.value = true
    sync()
  }
  document.addEventListener('visibilitychange', visibilityChange)
})
onBeforeUnmount(() => {
  stop()
  observer?.disconnect()
  document.removeEventListener('visibilitychange', visibilityChange)
})
</script>

<template>
  <figure ref="root" class="workflow-showcase relative w-full" aria-label="Demonstração de fluxo automatizado com agente de inteligência artificial">
    <div class="mx-auto max-w-[830px] text-center">
      <p class="text-[11px] font-bold uppercase tracking-[.18em] text-brand-primary">{{ t('hero.workflow.requestLabel') }}</p>
      <p class="mt-2 text-[15px] font-medium leading-relaxed text-gray-700 dark:text-gray-200 sm:text-[17px]">
        “{{ t('hero.workflow.request') }}”
      </p>
    </div>

    <div class="workflow-scene relative mx-auto mt-7 w-full max-w-[1150px]">
      <svg class="workflow-connections pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1000 620" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <circle cx="500" cy="320" r="115" stroke="#675DEA" stroke-opacity=".10" />
        <circle cx="500" cy="320" r="161" stroke="#675DEA" stroke-opacity=".08" stroke-dasharray="3 9" />
        <path v-for="line in connections" :key="line.id" :d="line.d"
          stroke-width="1.7" stroke-linecap="round"
          :stroke="stepState(line.step) === 'done' ? '#27B880' : stepState(line.step) === 'active' ? '#4C91F8' : '#ADB3CB'"
          :stroke-opacity="stepState(line.step) === 'todo' ? 0.35 : 0.9"
          :stroke-dasharray="stepState(line.step) === 'active' ? '5 7' : undefined"
          :class="stepState(line.step) === 'active' ? 'flow-current-line' : ''"
        />
      </svg>

      <div class="workflow-thought rounded-2xl border border-brand-primary/15 bg-white px-5 py-3.5 text-center shadow-[0_12px_35px_rgba(38,32,84,.06)] dark:border-white/15 dark:bg-[#1B2033]">
        <div class="mb-1 flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-[.12em] text-brand-primary dark:text-brand-light-primary">
          <WorkflowBrandIcon name="stars" :size="15" />
          {{ t('hero.workflow.thinking') }}
        </div>
        <p class="text-[13px] font-medium leading-relaxed text-gray-700 dark:text-gray-200">{{ thought }}</p>
      </div>

      <div class="workflow-agent text-center">
        <div class="workflow-agent-icon mx-auto flex h-16 w-16 items-center justify-center rounded-[20px] bg-brand-primary text-white shadow-[0_9px_26px_rgba(79,82,255,.22)]">
          <WorkflowBrandIcon name="stars" :size="34" />
        </div>
        <p class="mt-3 text-[15px] font-extrabold tracking-tight text-gray-900 dark:text-white">{{ t('hero.workflow.agent') }}</p>
        <p class="mt-1 max-w-[180px] text-[11px] font-medium leading-tight text-gray-500 dark:text-gray-400">{{ activeLabel }}</p>
      </div>

      <div class="workflow-nodes">
        <button v-for="node in nodes" :key="node.id" type="button"
          class="workflow-node group flex items-center gap-3 rounded-2xl border border-gray-900/10 bg-white px-3 py-2.5 text-left shadow-[0_7px_25px_rgba(20,24,55,.05)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary dark:border-white/15 dark:bg-[#1B2031]"
          :class="'workflow-node--' + node.id" :data-state="stepState(node.step)"
          :aria-label="node.label + ' — ' + t('hero.workflow.statuses.' + stepState(node.step))"
          @click="jump(node.step)"
        >
          <span class="node-icon grid h-10 w-10 shrink-0 place-items-center rounded-xl"
            :style="{ color: node.color, backgroundColor: node.id === 'notion' ? '#F3F4F6' : node.id === 'excel' ? '#E4F6ED' : node.id === 'sharepoint' ? '#E2F4FB' : node.id === 'slack' ? '#F5E7F4' : '#ECEAFF' }">
            <WorkflowBrandIcon :name="node.icon" :size="22" />
          </span>
          <span class="min-w-0">
            <strong class="block text-[12px] font-bold leading-snug text-gray-900 dark:text-white sm:text-[13px]">{{ node.label }}</strong>
            <span class="block text-[10px] text-gray-500 dark:text-gray-400">{{ t('hero.workflow.statuses.' + stepState(node.step)) }}</span>
          </span>
          <span v-if="stepState(node.step) === 'done'" class="node-status node-status--done" aria-hidden="true">✓</span>
          <span v-else-if="stepState(node.step) === 'active'" class="node-status node-status--active" aria-hidden="true"><span class="workflow-spinner" /></span>
          <span v-if="node.id === 'excel' && currentStep === 4" class="node-files absolute left-1/2 top-full mt-2 flex -translate-x-1/2 gap-1.5">
            <span v-for="(file, i) in filenames" :key="file" class="rounded-full border bg-white px-1.5 py-1 text-[9px] font-semibold dark:bg-[#1B2031]"
              :class="fileState(i) === 'done' ? 'border-emerald-400 text-emerald-600' : fileState(i) === 'active' ? 'border-blue-400 text-blue-600' : 'border-gray-200 text-gray-400'">{{ file }}</span>
          </span>
        </button>
      </div>
    </div>

    <div class="mx-auto mt-2 flex max-w-3xl flex-wrap items-center justify-center gap-x-5 gap-y-3">
      <div class="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
        <span class="font-semibold text-gray-700 dark:text-gray-200">{{ Math.min(currentStep + 1, steps.length) }} / {{ steps.length }}</span>
        <span aria-hidden="true" class="h-1 w-[92px] overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
          <span class="block h-full rounded-full bg-brand-primary transition-[width] duration-500" :style="{ width: progress + '%' }" />
        </span>
        <span class="font-medium text-gray-700 dark:text-gray-200">{{ activeLabel }}</span>
      </div>
      <div class="flex gap-2">
        <button type="button" class="rounded-lg border border-gray-900/10 px-3 py-1.5 text-[11px] font-semibold text-gray-600 hover:border-brand-primary dark:border-white/15 dark:text-gray-300" @click="toggle">{{ paused ? 'Continuar' : 'Pausar' }}</button>
        <button type="button" class="rounded-lg border border-gray-900/10 px-3 py-1.5 text-[11px] font-semibold text-gray-600 hover:border-brand-primary dark:border-white/15 dark:text-gray-300" @click="replay">Reiniciar</button>
      </div>
    </div>
    <figcaption class="mt-3 text-center text-[11px] text-gray-500 dark:text-gray-400">{{ t('hero.workflow.description') }}</figcaption>
  </figure>
</template>

<style scoped>
.workflow-scene { height:620px; }
.workflow-agent { position:absolute; z-index:3; left:50%; top:51.6129%; transform:translate(-50%,-50%); width:205px; }
.workflow-agent::before { content:''; position:absolute; z-index:-1; left:50%; top:40%; width:190px; height:190px; border-radius:50%; transform:translate(-50%,-50%); background:radial-gradient(circle,rgba(105,93,234,.075),transparent 70%); pointer-events:none; }
.workflow-thought { position:absolute; z-index:4; left:50%; top:14%; transform:translateX(-50%); width:min(340px,36%); }
.workflow-thought::after { content:''; position:absolute; left:50%; bottom:-9px; width:17px; height:17px; transform:translateX(-50%) rotate(45deg); background:inherit; border-right:1px solid rgba(105,93,234,.12); border-bottom:1px solid rgba(105,93,234,.12); }
.workflow-nodes { position:absolute; inset:0; }
.workflow-node { position:absolute; z-index:2; width:165px; min-height:70px; transform:translate(-50%,-50%); }
.workflow-node--api { left:18.5%; top:27.0968%; width:210px; }
.workflow-node--notion { left:81.5%; top:27.0968%; }
.workflow-node--sharepoint { left:87%; top:51.6129%; }
.workflow-node--excel { left:79%; top:80.6452%; }
.workflow-node--report { left:50%; top:88.7097%; }
.workflow-node--slack { left:21%; top:80.6452%; }
.workflow-node[data-state='done'] { border-color:#3BC98D; }
.workflow-node[data-state='active'] { animation:workflow-blue 1.25s ease-in-out infinite; }
.node-status { position:absolute; top:-7px; right:-7px; display:grid; place-items:center; width:20px; height:20px; border-radius:50%; font-size:11px; color:white; font-weight:800; }
.node-status--done { background:#22B77E; }
.node-status--active { background:#397FE7; }
.workflow-spinner { display:block; width:11px; height:11px; border-radius:50%; border:2px solid rgba(255,255,255,.4); border-top-color:white; animation:workflow-spin .7s linear infinite; }
.flow-current-line { animation:workflow-dash 1s linear infinite; }
@keyframes workflow-blue { 0%,100% { border-color:#5AA3FF; box-shadow:0 0 0 1px rgba(65,144,242,.28),0 7px 25px rgba(20,24,55,.05); } 50% { border-color:#DDEBFF; box-shadow:0 0 0 4px rgba(65,144,242,.13),0 7px 25px rgba(20,24,55,.05); } }
@keyframes workflow-spin { to { transform:rotate(360deg); } }
@keyframes workflow-dash { to { stroke-dashoffset:-24; } }
@media(max-width:767px) {
  .workflow-scene { display:flex; flex-direction:column; align-items:center; height:auto; gap:24px; padding:12px 0 8px; }
  .workflow-connections { display:none; }
  .workflow-thought { position:relative; left:auto; top:auto; transform:none; width:min(100%,360px); order:0; }
  .workflow-agent { position:relative; left:auto; top:auto; transform:none; order:1; padding:18px 0 10px; }
  .workflow-agent::before { top:50%; }
  .workflow-nodes { position:relative; inset:auto; order:2; display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); width:100%; gap:12px; }
  .workflow-node,.workflow-node--api { position:relative; left:auto; top:auto; transform:none; width:100%; min-height:74px; }
  .workflow-node { padding:9px; gap:8px; }
  .workflow-node .node-icon { width:35px; height:35px; }
  .node-files { display:none; }
}
@media(prefers-reduced-motion:reduce) {
  .workflow-node[data-state='active'],.workflow-spinner,.flow-current-line { animation:none; }
}
</style>
