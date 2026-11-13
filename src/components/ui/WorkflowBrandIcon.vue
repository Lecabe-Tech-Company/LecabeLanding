<script setup lang="ts">
defineProps<{ name: 'excel'|'sharepoint'|'notion'|'api'|'slack'|'stars'|'report'; size?: number }>()
</script>

<template>
  <svg :width="size || 24" :height="size || 24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.65" aria-hidden="true">
    <template v-if="name === 'excel'">
      <rect x="7" y="3" width="13" height="18" rx="2"/><path d="M7 8h13M11 8v13M3.5 8.5h9v8h-9zM6 11l4 3.5m0-3.5-4 3.5"/>
    </template>
    <template v-else-if="name === 'sharepoint'">
      <circle cx="8" cy="12" r="4.5"/><circle cx="16.5" cy="8.2" r="3.2"/><circle cx="16.5" cy="15.8" r="3.2"/><path d="M9.5 10c-3-2-5 1-2.5 2 3 1.5 1.5 4-1.5 2.2"/>
    </template>
    <template v-else-if="name === 'notion'">
      <rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 16V8l8 8V8"/>
    </template>
    <template v-else-if="name === 'slack'">
      <rect x="4" y="8.8" width="16" height="3.6" rx="1.8"/><path d="M8.5 4v16M15.5 4v16M9 8.8h6M9 12.4h6"/>
    </template>
    <template v-else-if="name === 'api'">
      <path d="m8 7-5 5 5 5m8-10 5 5-5 5M14 4l-4 16"/>
    </template>
    <template v-else-if="name === 'stars'">
      <path d="M12 2.5 14 9l6.5 2-6.5 2-2 6.5L10 13l-6.5-2L10 9zM20 17l.6 1.6L22 19l-1.4.5L20 21l-.5-1.5-1.5-.5 1.5-.4z" />
    </template>
    <template v-else>
      <path d="M7 3h8l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM15 3v5h4M9 12h7M9 16h7"/>
    </template>
  </svg>
</template>
