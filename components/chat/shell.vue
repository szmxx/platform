<template>
  <div class="w-full h-8 flex justify-between items-center">
    <div class="font-1000 proportional-nums center">
      <div>{{ time.split(':')[0] }}</div>
      <div class="mb-0.5 px-0.2">:</div>
      <div>{{ time.split(':')[1] }}</div>
    </div>
    <div class="flex h-2.5 <sm:(h-3) items-center gap-x-0.5">
      <MarketToolSignal
        :system="system"
        :signal="config.signal"
        :g="config.g"
      ></MarketToolSignal>
      <MarketToolWifi
        :g="system === 'ios' ? config.g : ''"
        :system="system"
        :enabled="config.enable_wifi"
        :wifi="config.wifi"
        :class="{ 'px-0.5': !config.enable_wifi }"
      ></MarketToolWifi>
      <MarketToolBattery
        :system="system"
        :enabled="config.enable_battery"
        :percentage="config.battery"
      ></MarketToolBattery>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    config: {
      type: Object as PropType<Record<string, unknown>>,
      default: () => {},
    },
    time: {
      type: String,
      default: '',
    },
    system: {
      type: String,
      default: 'ios',
    },
  })
</script>
