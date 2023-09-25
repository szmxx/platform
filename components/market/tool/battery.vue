<template>
  <div
    v-if="system === 'ios'"
    class="battery relative bg-wxhint center rounded-0.6 h-full w-auto text-xs px-1 aspect-2/1"
  >
    <div
      class="absolute h-full bg-dark left-0 rounded-l-0.6 overflow-hidden"
      :class="{ 'rounded-r-0.6': percentage > 90, enabled: enabled }"
      :style="{ width: `${percentage}%` }"
    ></div>
    <div
      scale-75
      origin-center-center
      text-light
      center
      :class="{ 'text-white!': enabled }"
    >
      {{ percentage }}
      <svg
        v-show="enabled && percentage < 100"
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="15"
        viewBox="0 0 24 24"
        class="scale-y-120"
      >
        <path fill="currentColor" d="M12 2L4 15h7l-1 7 9-13h-7l1-7z" />
        <path fill="currentColor" d="M12 16v6h2v-6h3l-4-6v6h-2v-6H9l4 6z" />
      </svg>
    </div>
  </div>
  <div v-else class="center h-full text-xs gap-x-0.5">
    <div
      class="battery border android relative center rounded-0.6 h-full w-auto aspect-2/1"
    >
      <div
        class="absolute h-90% bg-dark left-2.5% rounded-l-0.6 overflow-hidden"
        :class="{ 'rounded-r-0.6': percentage > 90, enabled: enabled }"
        :style="{ width: `${(percentage * 90) / 100}%` }"
      ></div>
      <div
        scale-75
        origin-center-center
        text-light
        center
        :class="{ 'text-white!': enabled }"
      >
        <svg
          v-show="enabled && percentage < 100"
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="15"
          viewBox="0 0 24 24"
          class="scale-y-120 center"
        >
          <path fill="currentColor" d="M12 2L4 15h7l-1 7 9-13h-7l1-7z" />
          <path fill="currentColor" d="M12 16v6h2v-6h3l-4-6v6h-2v-6H9l4 6z" />
        </svg>
      </div>
    </div>
    <div class="scale-85">{{ percentage }}%</div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    percentage: {
      type: Number,
      default: 40,
    },
    enabled: {
      type: Boolean,
      default: false,
    },
    system: {
      type: String,
      default: 'ios',
    },
  })
</script>

<style scoped lang="scss">
  .battery::after {
    content: '';

    @apply absolute -right-0.6 h-40% w-0.4 rounded-r-full bg-wxhint;
  }

  .battery.android {
    border-color: rgb(var(--fill-dark));
  }

  .battery.android::after {
    content: '';

    @apply absolute -right-0.7 h-60% w-0.4 rounded-r-full bg-dark;
  }

  .enabled {
    /* stylelint-disable-next-line color-function-notation */
    background: rgb(126, 202, 114);
  }
</style>
