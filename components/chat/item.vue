<template>
  <div
    v-if="chat.role !== 'system'"
    class="flex gap-x-3 relative"
    :class="{
      'flex-row-reverse': chat.role === 'self',
      'pt-1.5': chat.role !== 'self' && isGroup,
    }"
    @mouseover="mouseover"
    @mouseout="mouseout"
  >
    <UiUpload @change="onUpload">
      <img
        :src="(map[chat.user as keyof typeof map]?.url as string) || ''"
        class="<sm:(max-w-9.2 max-h-9.2 min-w-9.2 min-h-9.2) max-w-8 max-w-8 min-w-8 min-h-8 bg-white aspect-1/1 object-cover rounded-0.5"
      />
    </UiUpload>
    <div
      class="h-full relative flex flex-col w-full"
      :class="{ 'items-end': chat.role === 'self' }"
    >
      <div
        v-if="chat.role !== 'self' && isGroup"
        class="text-hint -mt-1.5 mb-0.2 scale-80 origin-left-center"
      >
        {{ map[chat?.user as keyof typeof map]?.name }}
      </div>
      <div
        v-if="!chat.type"
        class="message <sm:(px-4!) relative w-fit flex items-center max-w-78% rounded whitespace-break-spaces break-all p-2"
        :class="[
          chat.role,
          {
            'max-w-72%!': chat.status && chat.status !== 0,
            rejected: chat.status && chat.status !== 0,
          },
        ]"
      >
        {{ chat.message }}
      </div>
      <img
        v-else-if="chat.type === 'image'"
        :src="chat.url as string"
        class="max-w-50% w-fit rounded"
      />
      <ChatHongbao
        v-else-if="chat.type === 'hongbao'"
        :chat="chat"
        @click="onHongbao"
        @touchstart="onHongbao"
      ></ChatHongbao>
      <ChatPayment
        v-else-if="chat.type === 'payment'"
        :chat="chat"
        @click="onPayment"
        @touchstart="onPayment"
      >
      </ChatPayment>
      <ChatYuyin v-else-if="chat.type === 'yuyin'" :chat="chat"> </ChatYuyin>
      <ChatVideo v-else-if="chat.type === 'video'" :chat="chat"> </ChatVideo>
    </div>

    <div
      v-show="isShowTool"
      class="absolute flex gap-x-1 rr-block bg-dark/20 rounded top-0 -translate-y-100%"
    >
      <div
        i-ion-arrow-up-a
        class="cursor-pointer bg-primary/80"
        @click="onUp"
      ></div>
      <div
        i-ion-arrow-down-a
        class="cursor-pointer bg-primary/80"
        @click="onDown"
      ></div>
      <div
        i-ion-arrow-undo
        class="cursor-pointer bg-primary/80"
        @click="onRevert"
      ></div>
      <div
        i-ion-close-circle
        class="cursor-pointer bg-primary/80"
        @click="onDelete"
      ></div>
    </div>
  </div>
  <ChatSystem
    v-else
    :is-custom-bg="isCustomBg"
    :chat="chat"
    :username="username"
    @delete="onDelete"
  ></ChatSystem>
</template>

<script setup lang="ts">
  const props = defineProps({
    chat: {
      type: Object as PropType<Record<string, unknown>>,
      default: () => {},
    },
    map: {
      type: Object as PropType<Record<string, Record<string, unknown>>>,
      default: () => {},
    },
    username: {
      type: String,
      default: '',
    },
    isCustomBg: {
      type: Boolean,
      default: false,
    },
    isGroup: {
      type: Boolean,
      default: false,
    },
  })

  const emit = defineEmits([
    'delete',
    'avatar',
    'hongbao',
    'payment',
    'revert',
    'down',
    'up',
  ])
  function onUpload(evt: FileList) {
    const reader = new FileReader()
    reader.onload = function (event) {
      emit('avatar', props.chat.user, event?.target?.result)
    }
    // 读取文件内容
    reader.readAsDataURL(evt[0])
  }

  function onHongbao() {
    if (!props.chat.status || props.chat.status === 0) {
      // eslint-disable-next-line vue/no-mutating-props
      props.chat.status = 1
      emit('hongbao', props.chat.role)
    }
  }
  function onPayment() {
    if (!props.chat.status || props.chat.status === 0) {
      // eslint-disable-next-line vue/no-mutating-props
      props.chat.status = props.chat.role === 'self' ? 2 : 1
      emit('payment', props.chat.role, props?.chat?.price)
    }
  }

  function onDelete() {
    emit('delete')
  }

  function onRevert() {
    emit('revert', props?.chat?.role === 'user' ? 1 : 0)
  }

  function onUp() {
    emit('up')
  }
  function onDown() {
    emit('down')
  }

  const isShowTool = ref(false)
  function mouseover() {
    isShowTool.value = true
  }

  function mouseout() {
    isShowTool.value = false
  }
</script>

<style lang="scss" scoped>
  .message {
    line-height: 1.3;
  }

  .self {
    background: rgb(169 234 122);

    &::before {
      content: '';
      border-color: transparent;
      border-left-color: rgb(169 234 122);

      @apply absolute right-0.5 top-2 border-8 rounded translate-x-100%;
    }
  }

  .user {
    @apply bg-white;

    &::before {
      content: '';
      border-color: transparent;
      border-right-color: rgb(var(--color-white));

      @apply absolute -left-3.5 top-2 border-8 rounded;
    }
  }

  .message.rejected::after {
    content: '';

    @apply i-ion-alert-circle absolute h-full flex items-center bg-danger -left-1.8rem text-lg;
  }
</style>
