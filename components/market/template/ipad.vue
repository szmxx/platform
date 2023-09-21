<template>
  <div class="relative h-100 <sm:h-65">
    <nuxt-img
      :src="templateUrl"
      class="relative h-full z-9 w-auto object-cover"
      provider="cloudinary"
    />
    <div
      :class="[className, { landscape: landscape }]"
      class="overflow-hidden mask-1"
    >
      <img
        ref="imgRef"
        :src="src"
        class="object-cover w-full h-full"
        alt="logo"
      />
      <MarketTool
        :landscape="landscape"
        :class-name="`mask-1 ${className}`"
      ></MarketTool>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
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
    landscape: {
      type: Boolean,
      default: false,
    },
  })
  const templateUrl = computed(() => {
    if (props.landscape) {
      const [url, suffix] = props.template.split('.')
      return url + '_Landscape.' + suffix
    }
    return props.template
  })
</script>
<style lang="scss" scoped>
  .mask-1 {
    @apply absolute top-3% left-4% h-94% w-92% rounded;
  }

  .mask-1.landscape {
    @apply top-5% left-3% h-90% w-94% rounded;
  }
</style>
