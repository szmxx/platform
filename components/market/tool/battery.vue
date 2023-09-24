<template>
  <div
    class="battery relative rounded-15% center h-full w-auto text-xs px-1 aspect-2/1"
  >
    <div
      class="absolute h-full bg-dark left-0 rounded-l-15% overflow-hidden"
      :class="{ 'rounded-r-15%': percentage > 90, enabled: enabled }"
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
        width="10"
        height="10"
        viewBox="0 0 24 24"
      >
        <path fill="currentColor" d="M12 2L4 15h7l-1 7 9-13h-7l1-7z" />
        <path fill="currentColor" d="M12 16v6h2v-6h3l-4-6v6h-2v-6H9l4 6z" />
      </svg>
    </div>
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
  })
</script>

<style scoped lang="scss">
  .battery::before {
    content: '';

    @apply absolute top-0 left-0 w-full h-full rounded-15% bg-wxhint;
  }

  .battery::after {
    content: '';

    @apply absolute -right-1.2 border-2
       border-transparent;

    /* stylelint-disable-next-line color-function-notation */
    border-left-color: rgba(var(--fill-dark, 0.6));
  }

  .enabled {
    background: rgb(169 234 122);
  }
</style>
