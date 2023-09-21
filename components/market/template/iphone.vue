<template>
  <div class="relative h-100 <sm:h-65">
    <nuxt-img
      :src="template"
      class="relative h-full z-9 w-auto object-cover"
      provider="cloudinary"
    />
    <div :class="className" class="overflow-hidden mask-0">
      <img
        ref="imgRef"
        :src="src"
        class="object-cover w-full h-full"
        alt="logo"
      />
      <MarketTool :class-name="`mask-0 ${className}`"></MarketTool>
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
  .mask-0 {
    @apply absolute top-3% left-4% h-95% w-92% rounded-t-10% rounded-b-10%;
  }
</style>
