<template>
  <div class="flex flex-col gap-y-4 w-full">
    <fieldset class="flex border min-w-auto rounded p-4 flex-col gap-y-4">
      <legend pl-2>基本设置</legend>
      <div>
        <div class="text-hint">头像设置</div>
        <UiUpload @change="onAvatarUpload">
          <div center>
            <img
              :src="(map['self']?.url as string) || ''"
              class="h-15 w-15 bg-white aspect-1/1 object-cover rounded-0.5"
            />
            <div i-ion-plus-round class="text-6 text-primary absolute"></div>
          </div>
        </UiUpload>
      </div>
      <van-radio-group
        v-model="status"
        class="flex gap-2"
        direction="horizontal"
      >
        <van-radio :name="0">正常模式</van-radio>
        <van-radio :name="1">拒收模式</van-radio>
        <van-radio :name="2">删除模式</van-radio>
      </van-radio-group>
      <div class="flex items-end gap-x-2">
        <textarea
          v-model="inputVal"
          placeholder="请输入聊天内容"
          class="border rounded flex-1 p-2 bg-color"
          @keyup.enter="onInput"
        />
        <button
          class="bg-primary whitespace-nowrap h-7 px-4 text-white rounded"
          @click="onInput"
        >
          发送
        </button>
      </div>
    </fieldset>
    <fieldset class="w-full flex border rounded p-4 flex-col gap-y-4">
      <legend pl-2>图片</legend>
      <div class="flex w-full gap-y-4 flex-col">
        <div class="text-hint">发送图片</div>
        <UiUpload class="w-fit" @change="onUpload">
          <button
            class="bg-primary center flex-col gap-x-1 h-15 w-15 text-white rounded"
          >
            <div i-ion-plus-round class="text-6"></div>
          </button>
        </UiUpload>

        <div class="text-hint">表情包</div>
        <div>开发中...</div>
      </div>
    </fieldset>
    <fieldset
      class="w-full flex min-w-auto border rounded p-4 flex-col gap-y-4"
    >
      <legend pl-2>红包</legend>
      <div class="flex w-full gap-x-2 items-center">
        <div class="text-hint whitespace-nowrap">红包金额</div>
        <input
          v-model="hongbao"
          type="number"
          :min="0.01"
          class="border bg-color min-w-0 rounded flex-1 px-2 py-1"
        />
        <button
          class="bg-primary py-1 px-4 whitespace-nowrap text-white rounded"
          @click="onHongbao"
        >
          发送
        </button>
      </div>
      <div class="flex w-full gap-x-2 items-center">
        <div class="text-hint whitespace-nowrap">转账金额</div>
        <input
          v-model="payment"
          type="number"
          :min="0.01"
          class="border bg-color min-w-0 rounded flex-1 px-2 py-1"
        />

        <button
          class="bg-primary whitespace-nowrap py-1 px-4 text-white rounded"
          @click="onPayment"
        >
          发送
        </button>
      </div>
    </fieldset>
    <fieldset class="w-full flex border rounded p-4 flex-col gap-y-4">
      <legend pl-2>语音</legend>
      <div class="flex w-full gap-x-2 items-center">
        <div class="text-hint whitespace-nowrap">语音时长</div>

        <van-slider v-model="audio" :max="60" :min="1" class="mx-2">
          <template #button>
            <div class="bg-primary p-1 text-xs rounded text-white">
              {{ audio }}
            </div>
          </template>
        </van-slider>
        <button
          class="bg-primary whitespace-nowrap py-1 px-4 text-white rounded"
          @click="onAudio"
        >
          发送
        </button>
      </div>
      <div class="flex w-full gap-x-2 items-center">
        <UiPopover class="flex flex-col flex-1 gap-y-2">
          <div class="flex gap-x-2">
            <div class="text-hint whitespace-nowrap">语音聊天</div>
            <div>{{ audioTime.join(' : ') }}</div>
          </div>
          <template #content>
            <van-time-picker
              v-model="audioTime"
              :show-toolbar="false"
              title="选择时长"
              :columns-type="['hour', 'minute']"
            />
          </template>
        </UiPopover>
        <button
          class="bg-primary whitespace-nowrap py-1 px-4 text-white rounded"
          @click="onAudioTime"
        >
          发送
        </button>
      </div>
      <div class="flex w-full gap-x-2 items-center">
        <UiPopover class="flex flex-col flex-1 gap-y-2">
          <div class="flex gap-x-2">
            <div class="text-hint whitespace-nowrap">视频聊天</div>
            <div>{{ videoTime.join(' : ') }}</div>
          </div>
          <template #content>
            <van-time-picker
              v-model="videoTime"
              :show-toolbar="false"
              title="选择时长"
              :columns-type="['hour', 'minute']"
            />
          </template>
        </UiPopover>
        <button
          class="bg-primary whitespace-nowrap py-1 px-4 text-white rounded"
          @click="onVideoTime"
        >
          发送
        </button>
      </div>
    </fieldset>
    <fieldset class="w-full flex border rounded p-4 flex-col gap-y-4">
      <legend pl-2>动作</legend>
      <div class="flex w-full gap-x-2 items-center">
        <div class="border rounded px-2 py-1 cursor-pointer" @click="onPai">
          拍一拍
        </div>
        <div class="border rounded px-2 py-1 cursor-pointer" @click="onAdd">
          添加好友
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    map: {
      type: Object as PropType<Record<string, Record<string, unknown>>>,
      default: () => {},
    },
  })

  const emit = defineEmits(['operate', 'update:modelValue'])

  function onUpload(evt: FileList) {
    const reader = new FileReader()
    reader.onload = function (event) {
      emit('operate', {
        role: 'self',
        user: 'self',
        type: 'image',
        value: event?.target?.result,
      })
    }
    // 读取文件内容
    reader.readAsDataURL(evt[0])
  }

  const inputVal = ref()
  const status = ref(0)
  function onInput() {
    if (inputVal.value.trim()) {
      emit('operate', {
        role: 'self',
        user: 'self',
        type: 'input',
        value: inputVal.value,
        status: status.value,
      })
      inputVal.value = ''
    }
  }

  const hongbao = ref(1)
  function onHongbao() {
    emit('operate', {
      role: 'self',
      user: 'self',
      type: 'hongbao',
      value: hongbao.value,
    })
  }
  const payment = ref(1)
  function onPayment() {
    emit('operate', {
      role: 'self',
      user: 'self',
      type: 'payment',
      value: payment.value,
    })
  }
  const audio = ref(1)
  function onAudio() {
    emit('operate', {
      role: 'self',
      type: 'audio',
      user: 'self',
      value: audio.value,
    })
  }
  function onPai() {
    emit('operate', {
      role: 'user',
      user: 'self',
      type: 'paiyipai',
      status: 0,
    })
  }

  function onAdd() {
    emit('operate', {
      role: 'user',
      user: 'self',
      type: 'add',
    })
  }

  const audioTime = ref([0, 0])

  function onAudioTime() {
    emit('operate', {
      role: 'self',
      user: 'self',
      type: 'video',
      status: 'audio',
      value: audioTime.value.join(':'),
    })
  }

  const videoTime = ref([0, 0])
  function onVideoTime() {
    emit('operate', {
      role: 'self',
      user: 'self',
      type: 'video',
      status: 'video',
      value: videoTime.value.join(':'),
    })
  }

  function onAvatarUpload(evt: FileList) {
    const reader = new FileReader()
    reader.onload = function (event) {
      if (props?.map?.['self']) {
        // eslint-disable-next-line vue/no-mutating-props
        props.map['self'].url = event?.target?.result
      }
    }
    // 读取文件内容
    reader.readAsDataURL(evt[0])
  }
</script>
