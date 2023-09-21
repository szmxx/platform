<template>
  <div class="relative w-fit center gap-x-8">
    <MarketTemplateMac
      template="iphone/Mac/MacBook_Air_13.png"
      :src="src"
      class-name="mask-air"
    ></MarketTemplateMac>
    <MarketTemplateIpad
      template="iphone/iPad/iPad.png"
      :src="src"
      class-name="mask-ipad"
      class="scale-60 origin-b absolute! translate-x-90% z-9"
    ></MarketTemplateIpad>
    <MarketTemplateIphone
      template="iphone/iphone/iPhone_14.png"
      :src="src"
      class-name="mask-0-14"
      class="scale-40 origin-b absolute! translate-x-160% relative z-9"
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
