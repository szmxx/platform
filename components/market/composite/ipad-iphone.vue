<template>
  <div class="relative w-90 <sm:w-80 center gap-x-8">
    <MarketTemplateIpad
      template="iphone/iPad/iPad.png"
      :src="src"
      class-name="mask-ipad"
    ></MarketTemplateIpad>

    <MarketTemplateIphone
      template="iphone/iphone/iPhone_14.png"
      :src="src"
      class-name="mask-0-14"
      class="scale-60 origin-b absolute! translate-x-60% relative z-9"
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
