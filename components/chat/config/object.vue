<template>
  <div class="flex flex-col gap-y-4 max-w-full overflow-hidden">
    <fieldset class="flex border min-w-auto rounded p-4 flex-col gap-y-4">
      <legend pl-2>基本设置</legend>
      <div v-if="isGroup" class="flex gap-x-2 w-full items-center">
        <div class="text-hint whitespace-nowrap">选择聊天对象</div>
        <UiSelect
          v-model="currentUser"
          placeholder="请输入聊天对象昵称"
          :list="list"
          @change="onChangeUser"
        ></UiSelect>
      </div>

      <div>
        <div class="text-hint">头像设置</div>
        <UiUpload @change="onAvatarUpload">
          <div center>
            <img
              :src="(map[currentUser as keyof typeof map]?.url as string) || ''"
              class="h-15 w-15 bg-white aspect-1/1 object-cover rounded-0.5"
            />
            <div i-ion-plus-round class="text-6 text-primary absolute"></div>
          </div>
        </UiUpload>
      </div>

      <div class="flex gap-x-2 w-full items-center">
        <div class="text-hint whitespace-nowrap">用户昵称</div>
        <input
          v-model="username"
          placeholder="请输入聊天对象昵称"
          class="border rounded flex-1 bg-color px-2 py-1"
          @input="onChangeUserName"
        />
        <button
          class="bg-primary whitespace-nowrap h-7 px-4 text-white rounded"
          @click="onRandom"
        >
          随机
        </button>
      </div>
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
        <div>开发中...</div>
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
        <UiPopover class="flex flex-1 flex-col gap-y-2">
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
    map: {
      type: Object as PropType<Record<string, Record<string, unknown>>>,
      default: () => {},
    },
    isGroup: {
      type: Boolean,
      default: false,
    },
  })
  const emit = defineEmits(['create', 'operate', 'update:modelValue'])
  const username = computed<string>({
    set(value) {
      emit('update:modelValue', value)
    },
    get() {
      return props.modelValue
    },
  })

  const userList = ['小米', '风尚', '一只特立独行的猪', '故城', '零号机']

  const inputVal = ref('')
  function onInput() {
    if (inputVal.value.trim()) {
      const user = createUser()
      emit('operate', {
        role: 'user',
        type: 'input',
        value: inputVal.value,
        user: user,
      })
      inputVal.value = ''
    }
  }

  function onUpload(evt: FileList) {
    const reader = new FileReader()
    reader.onload = function (event) {
      const user = createUser()
      emit('operate', {
        role: 'user',
        type: 'image',
        user: user,
        value: event?.target?.result,
      })
    }
    // 读取文件内容
    reader.readAsDataURL(evt[0])
  }

  const hongbao = ref(1)
  function onHongbao() {
    const user = createUser()
    emit('operate', {
      role: 'user',
      type: 'hongbao',
      value: hongbao.value,
      user: user,
    })
  }
  const payment = ref(1)
  function onPayment() {
    const user = createUser()
    emit('operate', {
      role: 'user',
      type: 'payment',
      value: payment.value,
      user: user,
    })
  }
  const audio = ref(1)
  function onAudio() {
    const user = createUser()
    emit('operate', {
      role: 'user',
      type: 'audio',
      value: audio.value,
      user: user,
    })
  }
  function onPai() {
    const user = createUser()
    emit('operate', {
      role: 'user',
      type: 'paiyipai',
      status: 1,
      user: user,
    })
  }

  function onAgree() {
    const user = createUser()
    emit('operate', {
      role: 'user',
      type: 'input',
      value: '我通过了你的朋友验证请求，现在我们可以开始聊天了',
      user: user,
    })
  }

  const audioTime = ref([0, 0])

  function onAudioTime() {
    const user = createUser()
    emit('operate', {
      role: 'user',
      type: 'video',
      status: 'audio',
      value: audioTime.value.join(':'),
      user: user,
    })
  }

  const videoTime = ref([0, 0])
  function onVideoTime() {
    const user = createUser()
    emit('operate', {
      role: 'user',
      type: 'video',
      status: 'video',
      value: videoTime.value.join(':'),
      user: user,
    })
  }

  const list = ref<Record<string, unknown>[]>([])

  watch(
    props?.map,
    () => {
      list.value =
        Object.keys(props?.map || {})
          .filter((i) => i !== 'self')
          .map((i) => {
            return {
              name: props?.map?.[i]?.name,
              value: i,
            }
          }) || []
    },
    { immediate: true },
  )

  const currentUser = ref<keyof typeof props.map>('user')

  function onRandom() {
    const index = getRandomInt(0, userList.length - 1)
    emit('update:modelValue', userList[index])
    nextTick(() => {
      onChangeUserName()
    })
  }

  function onAvatarUpload(evt: FileList) {
    const reader = new FileReader()
    reader.onload = function (event) {
      if (props?.map?.[currentUser?.value]) {
        // eslint-disable-next-line vue/no-mutating-props
        props.map[currentUser.value].url = event?.target?.result
      }
    }
    // 读取文件内容
    reader.readAsDataURL(evt[0])
  }

  function onChangeUser() {
    if (currentUser.value === 'user') {
      username.value = ''
      return
    }
    if (props.map[currentUser.value]) {
      username.value = props.map[currentUser.value].name as string
    }
  }
  function onChangeUserName() {
    if (currentUser.value !== 'user') {
      if (props.map[currentUser.value]) {
        // eslint-disable-next-line vue/no-mutating-props
        props.map[currentUser.value].name = username.value as string
      }
    }
  }

  function createUser() {
    if (props.isGroup && currentUser.value === 'user') {
      const id = crypto?.randomUUID?.()
      currentUser.value = id

      emit('create', {
        id: id,
        name: username.value,
        url: '/logo.svg',
      })
      return id
    }
    return currentUser.value
  }
</script>
