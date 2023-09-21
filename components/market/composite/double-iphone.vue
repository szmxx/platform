<template>
  <div class="relative w-fit center gap-x-8">
    <MarketTemplateIphone
      template="iphone/iPhone/iPhone_14_Light.png"
      :src="src"
      class-name="mask-0-14"
    ></MarketTemplateIphone>

    <MarketTemplateIphone
      template="iphone/iphone/iPhone_14.png"
      :src="src"
      class-name="mask-0-14"
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
