<template>
  <div class="flex flex-col gap-y-2 w-full">
    <fieldset class="w-full flex border rounded p-4 flex-col gap-y-4">
      <legend pl-2>系统设置</legend>
      <div class="flex w-full relative flex-col gap-y-4">
        <van-radio-group v-model="system" direction="horizontal">
          <van-radio name="ios">苹果</van-radio>
          <van-radio name="android">安卓</van-radio>
        </van-radio-group>
      </div>
    </fieldset>
    <fieldset class="w-full flex border rounded p-4 flex-col gap-y-4">
      <legend pl-2>组件设置</legend>
      <UiPopover class="flex flex-col gap-y-2">
        <div class="flex gap-x-2">
          <div text-hint>系统时间</div>
          <div>{{ currentTime?.join?.(':') }}</div>
        </div>
        <template #content>
          <van-time-picker
            v-model="currentTime"
            :show-toolbar="false"
            title="选择时间"
            :columns-type="['hour', 'minute']"
          />
        </template>
      </UiPopover>
      <div class="text-hint">信号强度</div>
      <van-radio-group
        v-model="config.signal"
        class="flex gap-2"
        direction="horizontal"
      >
        <van-radio :name="0">0格</van-radio>
        <van-radio :name="1">1格</van-radio>
        <van-radio :name="2">2格</van-radio>
        <van-radio :name="3">3格</van-radio>
        <van-radio :name="4">4格</van-radio>
      </van-radio-group>
      <div class="text-hint">WIFI强度</div>
      <div class="flex gap-x-2">
        <div>是否启用</div>
        <van-switch v-model="config.enable_wifi" size="16px"></van-switch>
      </div>
      <van-radio-group
        v-show="config.enable_wifi"
        v-model="config.wifi"
        class="flex gap-2"
        direction="horizontal"
      >
        <van-radio :name="0">0格</van-radio>
        <van-radio :name="1">1格</van-radio>
        <van-radio :name="2">2格</van-radio>
        <van-radio :name="3">3格</van-radio>
      </van-radio-group>
      <van-radio-group
        v-show="!config.enable_wifi"
        v-model="config.g"
        direction="horizontal"
        class="flex gap-2"
      >
        <van-radio name="E">E</van-radio>
        <van-radio name="2G">2G</van-radio>
        <van-radio name="3G">3G</van-radio>
        <van-radio name="4G">4G</van-radio>
        <van-radio name="5G">5G</van-radio>
      </van-radio-group>
      <div class="text-hint">电池</div>
      <div class="flex gap-x-2">
        <div>是否充电</div>
        <van-switch v-model="config.enable_battery" size="16px"></van-switch>
      </div>
      <div class="flex w-full gap-x-2 items-center">
        <div class="text-hint whitespace-nowrap">电池电量</div>

        <van-slider v-model="config.battery" class="mx-2" :max="100" :min="1">
          <template #button>
            <div class="bg-primary p-1 text-xs rounded text-white">
              {{ config.battery }}
            </div>
          </template>
        </van-slider>
      </div>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    modelValue: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    system: {
      type: String,
      default: '',
    },
  })

  const emit = defineEmits(['config', 'update:modelValue', 'update:system'])

  const system = computed<string>({
    set(value) {
      emit('update:system', value)
    },
    get() {
      return props.system
    },
  })

  const currentTime = computed<string[]>({
    set(value) {
      emit('update:modelValue', value)
    },
    get() {
      return props.modelValue
    },
  })

  const config = ref({
    battery: 100,
    signal: 4,
    wifi: 3,
    g: '5G',
    enable_wifi: true,
    enable_battery: false,
  })

  watch(
    config,
    () => {
      emit('config', config.value)
    },
    { immediate: true },
  )
</script>
