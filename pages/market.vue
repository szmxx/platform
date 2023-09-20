<script setup lang="ts">
  const online = useOnline()
</script>

<template>
  <ClientOnly>
    <Market v-if="online"></Market>
    <div v-else class="text-hint">You're offline</div>
  </ClientOnly>
</template>
