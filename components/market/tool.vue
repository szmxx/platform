<template>
  <div
    :class="['tool-' + className, { landscape: landscape }]"
    class="flex w-full text-xs absolute justify-between"
  >
    <div class="tool-item origin-top-left!">
      <div>
        {{ now }}
      </div>
    </div>
    <div class="flex tool-item gap-x-1">
      <div i-ion-cellular></div>
      <div i-ion-ios-wifi></div>
      <div i-ion-ios-battery-full></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const time = new Date()
  const now = computed(
    () =>
      `${time.getHours() < 10 ? `0${time.getHours()}` : time.getHours()}:${
        time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()
      }`,
  )
  defineProps({
    className: {
      type: String,
      default: '',
    },
    landscape: {
      type: Boolean,
      default: false,
    },
  })
</script>

<style lang="scss" scoped>
  .tool-item {
    @apply gap-x-0 origin-top-right scale-80;

    & > div {
      @apply scale-60;
    }
  }

  .tool-mask-0 {
    @apply top-1.5% left-10% w-80%;

    .tool-item {
      /* stylelint-disable-next-line scss/operator-no-unspaced */
      @apply scale-60 <sm:scale-45;
    }
  }

  .tool-mask-1 {
    @apply top-3% left-0.5% w-99%;
  }

  .tool-mask-1.mask-ipad {
    @apply top-7% left-2% w-95%;

    &.landscape {
      @apply top-2% left-7% w-85%;
    }
  }

  .tool-mask-1.mask-air {
    @apply left-4% w-91%;

    &.landscape {
      @apply top-3% left-3% w-93.5%;
    }
  }

  .tool-mask-1.mask-mini {
    @apply left-5% w-89%;

    &.landscape {
      @apply top-4% left-3% w-93.5%;
    }
  }

  .tool-mask-1.mask-pro {
    @apply top-1% left-2% w-95%;

    &.landscape {
      @apply top-0.5% left-1% w-97%;
    }
  }

  .flex.tool-mask-2 {
    @apply absolute top-3.5% left-1% w-98%;
  }

  .ool-mask-2.mask-imac {
    @apply top-2% left-3% w-94%;
  }

  .tool-mask-2.mask-pro-4,
  .tool-mask-2.mask-pro-5 {
    @apply top-1.5% left-1% w-97%;
  }

  .tool-mask-2.mask-pro16-5 {
    @apply top-0.5% left-0.5% w-99%;
  }

  .tool-mask-2.mask-pro16-4 {
    @apply top-1.5% left-0% w-99%;
  }

  .flex.tool-mask-3 {
    @apply absolute top-10% left-15% w-70%;
  }

  .tool-mask-3.mask-s7,
  .tool-mask-3.mask-s8 {
    @apply absolute top-5% left-15% w-70%;
  }
</style>
