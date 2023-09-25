<!--
 * @Author: cola
 * @Date: 2023-08-27 17:19:30
 * @LastEditors: cola
 * @Description:
-->
<script setup lang="ts">
  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
  })
  const emit = defineEmits(['update:modelValue'])
  const emoji = computed<string>({
    set(value) {
      emit('update:modelValue', value)
    },
    get() {
      return props.modelValue
    },
  })
  const isShowEmoji = ref(false)
  function onEmoji(value: string) {
    emoji.value = value
    isShowEmoji.value = false
  }

  function onClick() {
    isShowEmoji.value = !isShowEmoji.value
  }

  function onHidden() {
    isShowEmoji.value = false
  }
</script>

<template>
  <div class="h-full w-full relative flex items-center gap-x-2 rounded">
    <div class="center flex-1">
      <div class="center cursor-pointer rounded-full text-xl" @click="onClick">
        <slot></slot>
      </div>
    </div>

    <Transition name="fade">
      <UiEmoji
        v-show="isShowEmoji"
        class="absolute bottom-130% right-0"
        @hidden="onHidden"
        @emoji="onEmoji"
      />
    </Transition>
  </div>
</template>
