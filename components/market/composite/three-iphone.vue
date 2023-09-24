<template>
  <div class="relative w-full <sm:w-full center">
    <MarketTemplateIphone
      template="iphone/iPhone/iPhone_14.png"
      :src="src"
      class-name="mask-0-14"
      class="origin-b scale-60"
    ></MarketTemplateIphone>
    <MarketTemplateIphone
      template="iphone/iPhone/iPhone_14_Pro.png"
      :src="src"
      class-name="mask-0-14-pro"
      class="origin-b scale-80 -ml-7%"
    ></MarketTemplateIphone>
    <MarketTemplateIphone
      template="iphone/iphone/iPhone_14_Pro_Max.png"
      :src="src"
      class-name="mask-0-14-pro-max"
    ></MarketTemplateIphone>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    src: {
      type: String,
      default: '',
    },
  })
</script>

<style lang="scss" scoped>
  :deep(.mask-0-14-pro) {
    @apply top-2.5% h-95%;
  }

  :deep(.mask-0-14-pro-max) {
    @apply top-2% h-96%;
  }
</style>
