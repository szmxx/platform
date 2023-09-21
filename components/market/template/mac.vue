<template>
  <div class="relative h-100 <sm:h-65">
    <nuxt-img
      :src="template"
      class="relative h-full z-9 w-auto object-cover"
      provider="cloudinary"
    />
    <div :class="className" class="overflow-hidden mask-2">
      <img
        ref="imgRef"
        :src="src"
        class="object-cover w-full h-full"
        alt="logo"
      />
      <MarketTool :class-name="`mask-2 ${className}`"></MarketTool>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    template: {
      type: String,
      default: '',
    },
    src: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
  })
</script>
<style lang="scss" scoped>
  .mask-2 {
    @apply absolute top-8% left-10% h-86% w-80% rounded;
  }

  .mask-imac {
    @apply top-3% left-3.5% h-70% w-92%;
  }

  .mask-pro-4 {
    @apply left-12% h-80% w-76%;
  }

  .mask-pro16-4 {
    @apply top-4% left-12% w-76%;
  }

  .mask-pro-5 {
    @apply top-11% left-11% h-80% w-78%;
  }

  .mask-pro16-5 {
    @apply top-11% h-80%;
  }
</style>
