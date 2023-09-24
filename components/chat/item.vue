<template>
  <div
    v-if="chat.role !== 'system'"
    class="flex gap-x-3 relative"
    :class="{ 'flex-row-reverse': chat.role === 'self' }"
    @mouseover="mouseover"
    @mouseout="mouseout"
  >
    <UiUpload w-8 h-8 @change="onUpload">
      <img :src="map[chat.role]" class="w-8 h-8 object-cover rounded" />
    </UiUpload>
    <div
      v-if="!chat.type"
      class="message relative flex items-center max-w-78% rounded whitespace-break-spaces break-all text-sm p-2"
      :class="[chat.role]"
    >
      {{ chat.message }}
    </div>
    <img
      v-else-if="chat.type === 'image'"
      :src="chat.url"
      class="max-w-75% rounded"
    />
    <ChatHongbao
      v-else-if="chat.type === 'hongbao'"
      :chat="chat"
      @click="onHongbao"
    ></ChatHongbao>
    <ChatPayment
      v-else-if="chat.type === 'payment'"
      :chat="chat"
      @click="onPayment"
    >
    </ChatPayment>
    <ChatYuyin v-else-if="chat.type === 'yuyin'" :chat="chat"> </ChatYuyin>
    <ChatVideo v-else-if="chat.type === 'video'" :chat="chat"> </ChatVideo>
    <div
      v-show="isShowTool"
      class="absolute top-0 p-1 rounded gap-x-1 bg-dark/30 text-white -translate-y-100% flex justify-end gap-y-1"
    >
      <div i-ion-trash-sharp class="cursor-pointer" @click="onDelete"></div>
    </div>
    <div
      v-if="!chat.type && chat.status && chat.status !== 0"
      i-ion-alert-circle
      class="bg-danger center h-full"
    ></div>
  </div>
  <ChatSystem v-else :chat="chat" :username="username"></ChatSystem>
</template>

<script setup lang="ts">
  const props = defineProps({
    chat: {
      type: Object as PropType<string, unknown>,
      default: () => {},
    },
    map: {
      type: Object as PropType<string, unknown>,
      default: () => {},
    },
    username: {
      type: String,
      default: '',
    },
  })

  const emit = defineEmits('delete', 'avatar', 'hongbao', 'payment')
  function onUpload(evt: FileList) {
    const reader = new FileReader()
    reader.onload = function (event) {
      emit('avatar', props.chat.role, event?.target?.result)
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
    line-height: 1.5;
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
</style>
