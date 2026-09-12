<script setup lang="ts">
import { computed } from 'vue'

/**
 * Line icon set drawn on a 24×24 grid so every glyph shares the stroke weight
 * and optical size of the inline arrows and chevrons used across the layout.
 *
 * Service feature keys match the ids under `servicesPages.<service>.features`
 * in the locale files; unknown keys fall back to the generic `settings` glyph.
 */
const ICONS: Record<string, string[]> = {
  // Features — software
  web: ['M3 5.5A2.5 2.5 0 0 1 5.5 3h13A2.5 2.5 0 0 1 21 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5z', 'M3 9h18', 'M6.5 6h.01', 'M9.5 6h.01'],
  mobile: ['M7.5 2h9A1.5 1.5 0 0 1 18 3.5v17A1.5 1.5 0 0 1 16.5 22h-9A1.5 1.5 0 0 1 6 20.5v-17A1.5 1.5 0 0 1 7.5 2z', 'M10.5 18.5h3'],
  api: ['M9 2v6', 'M15 2v6', 'M6 8h12v4a6 6 0 0 1-12 0z', 'M12 18v4'],
  database: ['M12 2c3.87 0 7 1.34 7 3s-3.13 3-7 3-7-1.34-7-3 3.13-3 7-3z', 'M5 5v14c0 1.66 3.13 3 7 3s7-1.34 7-3V5', 'M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3'],
  integration: ['M6.5 4.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z', 'M6.5 15.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z', 'M17.5 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4z', 'M8.4 7.6l7.3 3.3', 'M8.4 16.4l7.3-3.3'],

  // Features — cloud
  infrastructure: ['M4 4h16v6H4z', 'M4 14h16v6H4z', 'M7.5 7h.01', 'M7.5 17h.01', 'M12 10v4'],
  monitoring: ['M3 12h4l2.5 7 5-14 2.5 7h4'],
  automation: ['M13 2L4 13.5h7l-1 8.5 9-11.5h-7z'],
  security: ['M12 2.5l8 3.2v6.1c0 4.9-3.3 8.6-8 9.7-4.7-1.1-8-4.8-8-9.7V5.7z', 'M9 12.2l2.2 2.2L15.5 10'],

  // Features — ux
  research: ['M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14z', 'M16.2 16.2L21 21'],
  prototyping: ['M4 3.5h16A1.5 1.5 0 0 1 21.5 5v14a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 19V5A1.5 1.5 0 0 1 4 3.5z', 'M2.5 9h19', 'M9 9v11.5'],
  testing: ['M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z', 'M8.3 12.3l2.6 2.6 4.8-5.4'],
  'design-system': ['M4 4h6v6H4z', 'M14 4h6v6h-6z', 'M4 14h6v6H4z', 'M14 14h6v6h-6z'],
  accessibility: ['M12 3.5a4 4 0 1 1 0 8 4 4 0 0 1 0-8z', 'M4.5 21c0-4 3.4-6.2 7.5-6.2S19.5 17 19.5 21'],

  // Features — ai
  nlp: ['M14 2.5H6.5A1.5 1.5 0 0 0 5 4v16a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 20V7.5z', 'M14 2.5V7.5h5', 'M8.5 12.5h7', 'M8.5 16.5h4.5'],
  chatbots: ['M21 15.5A1.5 1.5 0 0 1 19.5 17H8l-4.5 4V4.5A1.5 1.5 0 0 1 5 3h14.5A1.5 1.5 0 0 1 21 4.5z', 'M8.5 10h.01', 'M12.5 10h.01', 'M16.5 10h.01'],

  // Home — process steps, console steps and guarantees
  inventory: ['M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5z', 'M3.5 7.5L12 12l8.5-4.5', 'M12 12v9'],
  check: ['M5 12.5l4.5 4.5L19 7'],
  channels: ['M3.5 8h13', 'M13 4.5L16.5 8 13 11.5', 'M20.5 16h-13', 'M11 12.5L7.5 16 11 19.5'],
  reports: ['M14 2.5H6.5A1.5 1.5 0 0 0 5 4v16a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 20V7.5z', 'M14 2.5V7.5h5', 'M9 17.5v-3', 'M12 17.5v-6', 'M15 17.5v-4.5'],
  clock: ['M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z', 'M12 7v5.3l3.4 2'],
  refresh: ['M20 12a8 8 0 1 1-2.6-5.9', 'M20 3.5V10h-6.5'],
  user: ['M12 3.5a4 4 0 1 1 0 8 4 4 0 0 1 0-8z', 'M4.5 21c0-4 3.4-6.2 7.5-6.2S19.5 17 19.5 21'],
  catalog: ['M4 4.5h6.5A2.5 2.5 0 0 1 13 7v13a2 2 0 0 0-2-2H4z', 'M20 4.5h-6.5A2.5 2.5 0 0 0 11 7v13a2 2 0 0 1 2-2h7z'],

  // Shared / fallback
  settings: ['M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z', 'M12 2.5l1.4 2.6 2.9-.5 1 2.8 2.6 1.4-1 2.8 1 2.8-2.6 1.4-1 2.8-2.9-.5L12 21.5l-1.4-2.6-2.9.5-1-2.8-2.6-1.4 1-2.8-1-2.8 2.6-1.4 1-2.8 2.9.5z']
}

/** Same glyph under the name each call site naturally reaches for. */
const ALIASES: Record<string, string> = {
  search: 'research',
  dashboard: 'prototyping',
  checkCircle: 'testing'
}

const props = withDefaults(defineProps<{ name: string; size?: number }>(), {
  size: 20
})

const paths = computed(() => ICONS[ALIASES[props.name] ?? props.name] ?? ICONS.settings)
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path
      v-for="(d, index) in paths"
      :key="index"
      :d="d"
    />
  </svg>
</template>
