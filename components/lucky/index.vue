<!--
 * @Author: cola
 * @Date: 2023-09-19 23:25:33
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div class="flex-col h-full center gap-y-4 p-4 w-full">
    <div
      v-show="current"
      class="selected absolute top-40 sm:top-30 w-full center text-8 flex transition-all"
    >
      <span>恭喜中奖</span>
      <span class="text-primary truncate max-w-60%">{{ current }}</span>
    </div>
    <LuckyPanel
      :data="list"
      spin-type="panel"
      @update="update"
      @complete="completeHandler"
    ></LuckyPanel>
    <div
      class="absolute cursor-pointer bottom-4 p-4 bg-default rounded-full right-4 shadow-sm"
      @click="isEdited = !isEdited"
    >
      <div i-carbon-edit></div>
    </div>
    <div v-show="isEdited" class="absolute bg-dark/30 top-0 z-1 h-full w-full">
      <div
        :class="{ 'slide-out': isEdited }"
        class="w-80 h-full right-0 absolute bg-default"
      >
        <LuckyEdit
          :data="list"
          @save="onSave"
          @hidden="isEdited = false"
        ></LuckyEdit>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ILuckyItem } from './types'
  import { LUCKY_SETTING } from '~/constants'
  const isEdited = ref(false)
  const current = ref()
  const state = useLocalStorage<ILuckyItem[]>(LUCKY_SETTING, [])
  const list = ref<ILuckyItem[]>(state.value || [])
  function completeHandler(value: string) {
    current.value = value
  }

  function update(value: string) {
    current.value = value
  }

  function onSave(value: ILuckyItem[]) {
    list.value = value
    isEdited.value = false
    state.value = value
  }
</script>

<style lang="scss" scoped>
  .slide-out {
    animation: slide-out ease-out 0.2s;
  }

  @keyframes slide-out {
    0% {
      @apply w-0;
    }

    100% {
      @apply w-80;
    }
  }

  .selected {
    /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
    font-family: font-ziti;
    color: transparent;
    background-clip: text;
    line-height: 1;
    background-image: linear-gradient(
      to right,
      rgb(var(--color-primary)),
      rgb(var(--color-success))
    );
  }
</style>
