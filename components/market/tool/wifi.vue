<template>
  <div v-if="enabled" class="h-full relative">
    <div class="wave mt-0!" :class="{ inactive: wifi < 3 }">
      <div class="wave" :class="{ inactive: wifi < 2 }">
        <div class="wave border-3! mb-0!" :class="{ inactive: wifi < 1 }"></div>
      </div>
    </div>
  </div>
  <div v-else-if="!enabled && system === 'ios'" class="text-xs line-height-1em">
    {{ g }}
  </div>
</template>

<script setup lang="ts">
  defineProps({
    wifi: {
      type: Number,
      default: 1,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    g: {
      type: String,
      default: '5G',
    },
    system: {
      type: String,
      default: 'ios',
    },
  })
</script>

<style scoped lang="scss">
  .wave {
    border: 2px solid transparent;
    border-top-color: currentcolor;
    border-radius: 50%;

    @apply m-1px center;
  }

  .wave.inactive {
    border-top-color: rgb(var(--fill-wx-hint));
  }
</style>
