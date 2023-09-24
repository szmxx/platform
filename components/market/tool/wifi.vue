<template>
  <div h-full overflow-hidden>
    <div v-show="enabled" class="wave mt-0!" :class="{ inactive: wifi < 3 }">
      <div class="wave" :class="{ inactive: wifi < 2 }">
        <div
          class="wave mb-0! border-0.2em!"
          :class="{ inactive: wifi < 1 }"
        ></div>
      </div>
    </div>
    <div v-show="!enabled" class="text-xs px-1">{{ g }}</div>
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
  })
</script>

<style scoped lang="scss">
  .wave {
    border: 0.15em solid transparent;
    border-top-color: currentcolor;
    border-top-color: rgb(var(--fill-dark));
    border-radius: 50%;

    @apply m-0.35;
  }

  .wave.inactive {
    border-top-color: rgb(var(--fill-wx-hint));
  }
</style>
