<template>
  <div class="flex flex-col gap-y-4 max-w-full overflow-hidden">
    <fieldset class="flex border min-w-auto rounded p-4 flex-col gap-y-4">
      <legend pl-2>基本设置</legend>
      <div class="flex gap-x-2 w-full items-center">
        <input
          v-model="username"
          placeholder="请输入聊天对象昵称"
          class="border rounded flex-1 bg-color px-2 py-1"
        />
      </div>
      <div class="flex items-end gap-x-2">
        <textarea
          v-model="inputVal"
          placeholder="请输入聊天内容"
          class="border rounded flex-1 p-2 bg-color"
        />
        <button
          class="bg-primary whitespace-nowrap h-7 px-4 text-white rounded"
          @click="onInput"
        >
          发送
        </button>
      </div>
    </fieldset>
    <fieldset
      class="w-full flex border min-w-auto rounded p-4 flex-col gap-y-4"
    >
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
        <div>TODO...</div>
      </div>
    </fieldset>
    <fieldset
      class="w-full flex border min-w-auto rounded p-4 flex-col gap-y-4"
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
          class="bg-primary py-1 whitespace-nowrap px-4 text-white rounded"
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
          class="bg-primary py-1 px-4 whitespace-nowrap text-white rounded"
          @click="onPayment"
        >
          发送
        </button>
      </div>
    </fieldset>
    <fieldset
      class="w-full flex min-w-auto border rounded p-4 flex-col gap-y-4"
    >
      <legend pl-2>语音</legend>
      <div class="flex w-full gap-x-2 items-center">
        <div class="text-hint whitespace-nowrap">语音时长</div>
        <input
          v-model="audio"
          :max="60"
          :min="1"
          type="number"
          class="border rounded min-w-0 bg-color flex-1 px-2 py-1"
        />
        <button
          class="bg-primary whitespace-nowrap py-1 px-4 text-white rounded"
          @click="onAudio"
        >
          发送
        </button>
      </div>
      <div class="flex w-full gap-x-2 items-center">
        <div class="text-hint whitespace-nowrap">语音聊天</div>
        <UiPopover class="flex flex-col gap-y-2">
          <div class="flex gap-x-2">
            <div>选择时长</div>
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
        <div class="text-hint whitespace-nowrap">视频聊天</div>
        <UiPopover class="flex flex-col gap-y-2">
          <div class="flex gap-x-2">
            <div>选择时长</div>
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
        <div class="border rounded px-2 py-1 cursor-pointer" @click="onAgree">
          同意好友申请
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
  })
  const emit = defineEmits(['operate', 'update:modelValue'])
  const username = computed<string>({
    set(value) {
      emit('update:modelValue', value)
    },
    get() {
      return props.modelValue
    },
  })

  const inputVal = ref()
  function onInput() {
    if (inputVal.value.trim()) {
      emit('operate', {
        role: 'user',
        type: 'input',
        value: inputVal.value,
      })
      inputVal.value = ''
    }
  }

  function onUpload(evt: FileList) {
    const reader = new FileReader()
    reader.onload = function (event) {
      emit('operate', {
        role: 'user',
        type: 'image',
        value: event?.target?.result,
      })
    }
    // 读取文件内容
    reader.readAsDataURL(evt[0])
  }

  const hongbao = ref(1)
  function onHongbao() {
    emit('operate', {
      role: 'user',
      type: 'hongbao',
      value: hongbao.value,
    })
  }
  const payment = ref(1)
  function onPayment() {
    emit('operate', {
      role: 'user',
      type: 'payment',
      value: payment.value,
    })
  }
  const audio = ref(1)
  function onAudio() {
    emit('operate', {
      role: 'user',
      type: 'audio',
      value: audio.value,
    })
  }
  function onPai() {
    emit('operate', {
      role: 'user',
      type: 'paiyipai',
      status: 1,
    })
  }

  function onAgree() {
    emit('operate', {
      role: 'user',
      type: 'input',
      value: '我通过了你的朋友验证请求，现在我们可以开始聊天了',
    })
  }

  const audioTime = ref([0, 0])

  function onAudioTime() {
    emit('operate', {
      role: 'user',
      type: 'video',
      status: 'audio',
      value: audioTime.value.join(':'),
    })
  }

  const videoTime = ref([0, 0])
  function onVideoTime() {
    emit('operate', {
      role: 'user',
      type: 'video',
      status: 'video',
      value: videoTime.value.join(':'),
    })
  }
</script>
