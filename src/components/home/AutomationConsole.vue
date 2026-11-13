<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

/** Static concept: no timers, third-party images, client requests or invented KPIs. */
const systems = [
  { id: 'excel', name: 'Excel', symbol: 'X', tone: 'green' },
  { id: 'sharepoint', name: 'SharePoint', symbol: 'S', tone: 'blue' },
  { id: 'slack', name: 'Slack', symbol: '#', tone: 'pink' },
  { id: 'notion', name: 'Notion', symbol: 'N', tone: 'ink' }
] as const
</script>

<template>
  <figure class="integration-panel relative isolate overflow-hidden rounded-[24px] border border-white/10 bg-[#151827] text-white shadow-[0_26px_70px_rgba(22,26,56,.20)]">
    <header class="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4 sm:px-6">
      <div class="flex items-center gap-2.5">
        <span class="flex gap-1.5" aria-hidden="true">
          <span v-for="n in 3" :key="n" class="h-1.5 w-1.5 rounded-full bg-white/20" />
        </span>
        <span class="text-[11px] font-semibold tracking-[0.1em] text-white/65">LECABE / CONNECT</span>
      </div>
      <span class="inline-flex items-center gap-1.5 rounded-full border border-brand-alternative/25 bg-brand-alternative/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-alternative">
        <span class="h-1.5 w-1.5 rounded-full bg-brand-alternative" aria-hidden="true" />
        {{ t('hero.diagramBadge') }}
      </span>
    </header>

    <div class="relative px-3 pb-2 pt-6 sm:px-5">
      <div class="text-center">
        <p class="mb-1 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#A6ABC4]">{{ t('hero.diagramEyebrow') }}</p>
        <h2 class="text-lg font-bold tracking-tight text-white sm:text-xl">{{ t('hero.diagramHeading') }}</h2>
      </div>

      <div class="integration-stage relative mx-auto mt-2 h-[320px] w-full max-w-[530px]">
        <div class="integration-aura pointer-events-none absolute left-1/2 top-1/2 h-[205px] w-[205px] -translate-x-1/2 -translate-y-1/2 rounded-full" aria-hidden="true" />
        <svg class="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 520 320" preserveAspectRatio="none" fill="none" aria-hidden="true" focusable="false">
          <circle cx="260" cy="162" r="111" stroke="#777AFF" stroke-opacity=".13" />
          <circle cx="260" cy="162" r="78" stroke="#777AFF" stroke-opacity=".16" stroke-dasharray="3 7" />
          <path d="M103 63 C150 63 165 119 218 143" stroke="#A5A7FF" stroke-opacity=".55" stroke-width="1.6" stroke-linecap="round"/>
          <path d="M416 63 C369 63 355 119 302 143" stroke="#A5A7FF" stroke-opacity=".55" stroke-width="1.6" stroke-linecap="round"/>
          <path d="M103 257 C150 257 165 204 218 180" stroke="#A5A7FF" stroke-opacity=".55" stroke-width="1.6" stroke-linecap="round"/>
          <path d="M416 257 C369 257 355 204 302 180" stroke="#A5A7FF" stroke-opacity=".55" stroke-width="1.6" stroke-linecap="round"/>
          <circle cx="217" cy="143" r="3.5" fill="#2FE0B0" />
          <circle cx="303" cy="143" r="3.5" fill="#2FE0B0" />
          <circle cx="217" cy="180" r="3.5" fill="#2FE0B0" />
          <circle cx="303" cy="180" r="3.5" fill="#2FE0B0" />
        </svg>

        <div
          v-for="system in systems"
          :key="system.id"
          class="system-node absolute z-[2] flex items-center gap-2 rounded-xl border border-white/15 bg-[#24293D] px-3 py-2.5 shadow-[0_14px_30px_rgba(0,0,0,.18)]"
          :class="'system-node--' + system.id"
        >
          <span class="system-icon inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-black" :class="'system-icon--' + system.tone" aria-hidden="true">{{ system.symbol }}</span>
          <span class="min-w-0 text-[12px] font-semibold text-white sm:text-[13px]">{{ system.name }}</span>
        </div>

        <div class="hub-node absolute left-1/2 top-1/2 z-[3] flex h-[126px] w-[154px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[22px] border border-[#888AFF]/50 bg-[#242854] text-center shadow-[0_16px_45px_rgba(28,28,80,.4)]">
          <span class="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-primary text-xl font-black leading-none text-white" aria-hidden="true">L</span>
          <strong class="text-[16px] font-extrabold tracking-tight">Lecabe</strong>
          <span class="mt-0.5 text-[10px] font-medium text-white/70">{{ t('hero.diagramHub') }}</span>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-center gap-2 border-t border-white/10 bg-white/[0.025] px-3 py-3 text-[10px] font-semibold uppercase tracking-[0.07em] text-white/70 sm:gap-3 sm:text-[11px]">
      <span>{{ t('hero.diagramStep1') }}</span>
      <span class="text-brand-alternative" aria-hidden="true">→</span>
      <span>{{ t('hero.diagramStep2') }}</span>
      <span class="text-brand-alternative" aria-hidden="true">→</span>
      <span>{{ t('hero.diagramStep3') }}</span>
    </div>
    <figcaption class="px-5 pb-3 pt-2 text-center text-[11px] leading-normal text-white/50">{{ t('hero.diagramCaption') }}</figcaption>
  </figure>
</template>

<style scoped>
.integration-panel {
  background-image: radial-gradient(circle at 50% 49%, rgba(79,82,255,.15) 0, transparent 59%),
    linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);
  background-size: auto, 30px 30px, 30px 30px;
}
.integration-aura { background: radial-gradient(circle, rgba(79,82,255,.16), transparent 70%); }
.system-node { min-width: 117px; }
.system-node--excel { left: 1%; top: 9%; }
.system-node--sharepoint { right: 1%; top: 9%; }
.system-node--slack { left: 1%; bottom: 9%; }
.system-node--notion { right: 1%; bottom: 9%; }
.system-icon--green { background: #D9F5E6; color: #14784B; }
.system-icon--blue { background: #DDF2FB; color: #126D94; }
.system-icon--pink { background: #F7E0F3; color: #9B3977; }
.system-icon--ink { background: #F0EFF3; color: #191B24; }
@media (max-width: 470px) {
  .system-node { min-width: 0; gap: 5px; padding: 7px 8px; }
  .system-icon { width: 26px; height: 26px; font-size: 11px; }
  .system-node--excel, .system-node--slack { left: 0; }
  .system-node--sharepoint, .system-node--notion { right: 0; }
  .hub-node { width: 124px; height: 115px; }
}
</style>
