<!--
 * @Author: cola
 * @Date: 2023-08-27 16:34:06
 * @LastEditors: cola
 * @Description:
-->
<script setup lang="ts">
  import { onClickOutside } from '@vueuse/core'
  import emoji from '~/assets/emoji.json'

  const emit = defineEmits(['emoji', 'hidden'])
  const emojiRef = ref()
  const categories = computed(() => Object.keys(emoji))
  const category_emojis = computed(
    () => (category: string) =>
      Object.values(
        (emoji as Record<string, Record<string, string>>)?.[category],
      ),
  )
  onMounted(() => {
    onClickOutside(emojiRef, () => {
      emit('hidden')
    })
  })
  function onClick(evt: MouseEvent) {
    const emoji = (evt.target as HTMLElement).dataset?.emoji
    if (emoji) emit('emoji', emoji)
  }
</script>

<template>
  <div
    ref="emojiRef"
    class="z-9 h-60 w-70 flex flex-col gap-y-2 overflow-y-auto rounded p-2 shadow-sm bg-default"
    @click="onClick"
  >
    <div
      v-for="category in categories"
      :key="`category_${category}`"
      class="flex flex-col"
    >
      <span class="mb-2">{{ category }}</span>
      <div class="flex flex-wrap gap-1 text-xl">
        <button
          v-for="(item, index) in category_emojis(category)"
          :key="`emoji_${index}`"
          :data-emoji="item"
        >
          {{ item }}
        </button>
      </div>
    </div>
  </div>
</template>
