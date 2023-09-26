<template>
  <div class="flex flex-col gap-y-4 w-full">
    <fieldset class="w-full flex border rounded p-4 flex-col gap-y-4">
      <legend pl-2>背景设置</legend>
      <div class="flex w-full relative flex-col gap-y-4">
        <div class="text-hint">颜色背景</div>
        <UiColor v-model="currentColor" class="z-99"></UiColor>
      </div>
      <div class="flex flex-col gap-y-4">
        <div class="text-hint">自定义背景</div>
        <van-radio-group v-model="checked" direction="horizontal">
          <van-radio name="auto">默认</van-radio>
          <van-radio name="contain">包含</van-radio>
          <van-radio name="cover">填充</van-radio>
        </van-radio-group>
        <UiUpload class="w-fit" @change="onUpload">
          <button
            class="bg-primary center flex-col gap-x-1 h-15 w-15 text-white rounded"
          >
            <div i-ion-plus-round class="text-6"></div>
          </button>
        </UiUpload>
      </div>
      <div class="flex w-full relative flex-col gap-y-4">
        <div class="text-hint">自定义水印</div>
        <div class="flex gap-x-2">
          <div>是否启用</div>
          <van-switch v-model="isWatermark" size="16px"></van-switch>
        </div>
        <div class="flex gap-x-2 w-full items-center">
          <div>水印内容</div>
          <input
            v-model="watermark"
            placeholder=""
            class="border rounded flex-1 bg-color px-2 py-1"
          />
        </div>
      </div>
    </fieldset>
    <fieldset class="w-full flex border rounded p-4 flex-col gap-y-4">
      <legend pl-2>动作</legend>
      <div class="flex gap-x-2">
        <div>消息免打扰</div>
        <van-switch v-model="isDisturb" size="16px"></van-switch>
      </div>
      <div class="flex w-full gap-2 flex-wrap items-center">
        <div
          class="border rounded px-2 gap-x-1 center py-1 cursor-pointer"
          :class="{ 'pointer-events-none': exportLoading }"
          @click="onExport"
        >
          <div v-show="exportLoading" class="loading h-4 w-4" />
          导出图片
        </div>
        <div
          class="border rounded px-2 py-1 gap-x-1 cursor-pointer"
          :class="{ 'pointer-events-none': longLoading }"
          @click="onLongExport"
        >
          <div v-show="longLoading" class="loading h-4 w-4" />
          导出长图
        </div>
        <div
          class="border rounded relative px-2 py-1 gap-x-1 cursor-pointer"
          @click="onRecord"
        >
          录制视频
          <sup
            v-show="recording"
            class="w-2 h-2 flex absolute top-0 right-0 bg-danger rounded-full"
          ></sup>
        </div>
        <div
          class="border rounded relative px-2 py-1 gap-x-1 cursor-pointer"
          @click="onPreview"
        >
          预览视频
        </div>
        <div class="border rounded px-2 py-1 cursor-pointer" @click="onClear">
          清除记录
        </div>
      </div>
    </fieldset>

    <fieldset class="w-full flex border rounded p-4 flex-col gap-y-4">
      <legend pl-2>群聊模式</legend>
      <div class="flex gap-x-2">
        <div>是否开启</div>
        <van-switch v-model="config.group" size="16px"></van-switch>
      </div>
      <div class="flex w-full gap-x-2 items-center">
        <div class="text-hint whitespace-nowrap">群聊名称</div>
        <input
          v-model="config.groupName"
          class="border bg-color min-w-0 rounded flex-1 px-2 py-1"
        />
      </div>
      <div class="flex w-full gap-x-2 items-center">
        <div class="text-hint whitespace-nowrap">群聊人数</div>

        <van-slider
          v-model="config.groupNumber"
          class="mx-2"
          :max="500"
          :min="3"
        >
          <template #button>
            <div class="bg-primary p-1 text-xs rounded text-white">
              {{ config.groupNumber }}
            </div>
          </template>
        </van-slider>
      </div>
    </fieldset>

    <fieldset class="w-full flex border rounded p-4 flex-col gap-y-4">
      <legend pl-2>插入时间</legend>
      <div class="flex w-full relative flex-col gap-y-4">
        <UiPopover class="flex flex-col gap-y-2">
          <div class="flex gap-x-2">
            <div>选择日期</div>
            <div>{{ currentDate.join(' - ') }}</div>
          </div>
          <template #content>
            <van-date-picker
              v-model="currentDate"
              :show-toolbar="false"
              title="选择日期"
              :columns-type="['month', 'day']"
            />
          </template>
        </UiPopover>
        <UiPopover class="flex flex-col gap-y-2">
          <div class="flex gap-x-2">
            <div>选择时间</div>
            <div>{{ currentTime.join(' : ') }}</div>
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
        <div class="bg-primary p-2 rounded center text-white" @click="onTime">
          发送
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs'

  const props = defineProps({
    disturb: {
      type: Boolean,
      default: false,
    },
  })

  const date = new Date()
  const emit = defineEmits(['bg', 'time', 'operate', 'update:disturb', 'group'])

  const isDisturb = computed<boolean>({
    set(value) {
      emit('update:disturb', value)
    },
    get() {
      return props.disturb
    },
  })
  const currentDate = ref([date.getMonth() + 1, date.getDate()])
  const currentTime = ref([date.getHours(), date.getMinutes()])

  function onTime() {
    const date = new Date()
    date.setMonth(currentDate.value[0] - 1)
    date.setDate(currentDate.value[1])
    date.setHours(currentTime.value[0])
    date.setMinutes(currentTime.value[1])
    const time = getTime(date.getTime())
    emit('time', time)
  }

  const currentColor = ref()
  const checked = ref('auto')
  watch(currentColor, (newVal) => {
    emit('bg', { type: 'color', value: newVal })
  })
  watch(checked, (newVal) => {
    emit('bg', { mode: checked.value, type: 'custom' })
  })
  function onUpload(evt: FileList) {
    const reader = new FileReader()
    reader.onload = function (event) {
      emit('bg', {
        type: 'custom',
        value: event?.target?.result,
        mode: checked.value,
      })
    }
    // 读取文件内容
    reader.readAsDataURL(evt[0])
  }

  const weekMap = {
    0: '日',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
  }

  function getTime(time: number) {
    const now = dayjs()
    const targetTime = dayjs(time)
    const daysDiff = now.diff(targetTime, 'day')
    if (daysDiff === 0) {
      return `${targetTime.format('HH:mm')}`
    } else if (daysDiff === 1) {
      return `昨天 ${targetTime.format('HH:mm')}`
    } else {
      const week = new Date(+time).getDay()
      return `星期${weekMap[week]} ${targetTime.format('HH:mm')}`
    }
  }

  function onClear() {
    emit('operate', {
      type: 'clear',
    })
  }
  const exportLoading = ref(false)
  function onExport() {
    exportLoading.value = true
    emit(
      'operate',
      {
        type: 'export',
      },
      () => {
        exportLoading.value = false
      },
    )
  }
  const longLoading = ref(false)
  function onLongExport() {
    longLoading.value = true
    emit(
      'operate',
      {
        type: 'long_export',
      },
      () => {
        longLoading.value = false
      },
    )
  }
  const recording = ref(false)

  function onRecord() {
    recording.value = !recording.value
    ScreenRecorder?.toggle?.()
  }

  function onPreview() {
    return navigateTo({
      path: '/replay',
    })
  }

  onUnmounted(() => {
    ScreenRecorder?.stop?.()
  })

  const isWatermark = ref(false)
  const watermark = ref('')
  const { $watermark } = useNuxtApp()

  watch([isWatermark, watermark], ([bool, value]) => {
    if (bool) {
      $watermark?.(value)
    } else {
      $watermark?.('')
    }
  })

  const config = ref({
    group: false,
    groupName: '',
    groupNumber: '',
  })

  watch(
    config,
    () => {
      emit('group', config.value)
    },
    { immediate: true },
  )
</script>
