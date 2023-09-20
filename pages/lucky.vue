<script setup lang="ts">
  const online = useOnline()
</script>

<template>
  <ClientOnly>
    <Lucky v-if="online"></Lucky>
    <div v-else class="text-hint">You're offline</div>
  </ClientOnly>
</template>
