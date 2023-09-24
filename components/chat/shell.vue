<template>
  <div class="w-full h-8 flex justify-between px-4 items-center">
    <div text-sm>{{ time }}</div>
    <div class="flex h-2.5 items-center gap-x-0.5">
      <MarketToolSignal :signal="config.signal"></MarketToolSignal>
      <MarketToolWifi
        :g="config.g"
        :enabled="config.enable_wifi"
        :wifi="config.wifi"
      ></MarketToolWifi>
      <MarketToolBattery
        :enabled="config.enable_battery"
        :percentage="config.battery"
      ></MarketToolBattery>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    config: {
      type: Object as PropType<string, unknown>,
      default: () => {},
    },
    time: {
      type: String,
      default: '',
    },
  })
</script>
