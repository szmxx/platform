<template>
  <div class="relative w-full center gap-x-8">
    <MarketTemplateMac
      template="iphone/Mac/iMac.png"
      :src="src"
      class-name="mask-imac"
    ></MarketTemplateMac>
    <MarketTemplateMac
      template="iphone/Mac/MacBook_Air_13.png"
      :src="src"
      class-name="mask-air"
      class="absolute! scale-60 origin-b z-9 -translate-x-50%"
    ></MarketTemplateMac>
    <MarketTemplateIpad
      template="iphone/iPad/iPad.png"
      :src="src"
      class-name="mask-ipad"
      landscape
      class="absolute! scale-40 origin-b translate-x-45% z-9"
    ></MarketTemplateIpad>
    <MarketTemplateIphone
      template="iphone/iphone/iPhone_14.png"
      :src="src"
      class-name="mask-0-14"
      class="absolute! scale-30 origin-b translate-x-185% relative z-9"
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
