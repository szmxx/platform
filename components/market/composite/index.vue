<template>
  <div class="relative w-full center">
    <component
      :is="componentMap[component as keyof typeof componentMap]"
      :src="src"
    ></component>
  </div>
</template>

<script setup lang="ts">
  const componentMap = {
    'double-iphone': resolveComponent('MarketCompositeDoubleIphone'),
    'three-iphone': resolveComponent('MarketCompositeThreeIphone'),
    'ipad-iphone': resolveComponent('MarketCompositeIpadIphone'),
    'mac-ipad-iphone': resolveComponent('MarketCompositeMacIpadIphone'),
    'imac-mac-ipad-iphone': resolveComponent(
      'MarketCompositeImacMacIpadIphone',
    ),
  }
  const props = defineProps({
    src: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
  })
  const component = computed(() => props.className)
  console.log(component)
</script>
