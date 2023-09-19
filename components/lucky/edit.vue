<!--
 * @Author: cola
 * @Date: 2023-08-09 21:13:02
 * @LastEditors: cola
 * @Description:
-->
<script setup lang="ts">
  import { shuffle } from 'lodash-es'
  import { onClickOutside } from '@vueuse/core'
  import { ILuckyItem } from './types'

  const props = defineProps({
    mode: {
      type: String,
      default: 'normal',
    },
    data: {
      type: Array as PropType<ILuckyItem[]>,
      default: () => [],
    },
  })
  const emit = defineEmits(['hidden', 'save'])
  const panelRef = ref()
  const list = ref<ILuckyItem[]>(props?.data?.slice?.())

  onMounted(() => {
    onClickOutside(panelRef, () => {
      emit('hidden')
    })
  })

  const colorList = [
    '#A1CCD1',
    '#E9B384',
    '#7C9D96',
    '#FEBBCC',
    '#D4E2D4',
    '#4682A9',
    '#DBC4F0',
    '#91C8E4',
    '#916DB3',
    '#C8AE7D',
    '#6C3428',
    '#F11A7B',
    '#7A9D54',
    '#FD8D14',
    '#FBA1B7',
    '#DAC0A3',
    '#9ED2BE',
    '#900C3F',
    '#445069',
    '#33BBC5',
    '#E19898',
    '#BEADFA',
    '#F94C10',
    '#614BC3',
  ]

  const usedColorList = computed(() => list?.value?.map((i) => i.color))

  function onOperate(evt: MouseEvent) {
    const el = (evt.target as HTMLElement).closest('.item')
    if (el instanceof HTMLElement) {
      const type = el?.dataset?.type
      if (type === 'add') {
        const colors = colorList.filter((i) => {
          return !usedColorList.value?.includes(i)
        })
        let index = 0
        if (colors.length === 0)
          index = getRandomInt(0, usedColorList.value.length - 1)
        else index = getRandomInt(0, colors.length - 1)

        list?.value?.push({
          id: crypto.randomUUID(),
          name: `示例${index}`,
          weight: 1,
          color: colorList[index],
        })
      }
      if (type === 'shuffle') list.value = shuffle(list?.value)
    }
  }

  function onColorPick(item: ILuckyItem, evt: MouseEvent) {
    const color = (evt.target as HTMLElement)?.dataset?.color
    if (color) item.color = color
  }

  function onDelete(evt: MouseEvent) {
    const id = (evt?.target as HTMLElement)?.dataset?.id
    if (id) {
      const index = list?.value.findIndex((i) => i.id === id)
      if (index > -1) {
        list?.value?.splice(index, 1)
      }
    }
  }

  async function onSubmit() {
    emit('save', list.value.slice())
  }
</script>

<template>
  <div
    ref="panelRef"
    class="relative h-full pt-1 flex flex-col overflow-y-auto"
  >
    <van-form class="flex flex-1 flex-col gap-y-2 overflow-hidden">
      <div class="flex pt-3 justify-between px-4 text-sm">
        <span>名称</span>
        <span>权重</span>
      </div>
      <div
        v-show="list.length !== 0"
        class="flex flex-1 flex-col gap-y-2 overflow-y-auto"
        @click="onDelete"
      >
        <div
          v-for="item in list"
          :key="item.id"
          class="relative flex items-center gap-x-2 px-4 py-2"
        >
          <div
            :data-id="item.id"
            class="aspect-1/1 h-7 center cursor-pointer rounded-50% text-xs bg-danger text-white"
          >
            <div :data-id="item.id" i-carbon-trash-can />
          </div>
          <van-field
            v-model="item.name"
            clearable
            class="rounded py-1 px-2 flex-1"
            placeholder="请输入名称"
            :rules="[
              {
                required: true,
                message: '名称不能为空',
              },
            ]"
          />
          <UiPopover class="center">
            <div
              class="h-7 w-7 rounded-50%"
              :style="{ background: item.color }"
            />
            <template #content>
              <div
                class="absolute z-9 right-15 top-8 mt-6 max-w-50 flex flex-wrap gap-2 rounded p-2 shadow-sm bg-default"
                @click="onColorPick(item, $event)"
              >
                <div
                  v-for="color in colorList"
                  :key="color"
                  :style="{ background: color }"
                  class="h-10 w-10 center cursor-pointer rounded-2 text-white"
                  :data-color="color"
                >
                  <div
                    v-show="
                      color === item.color || usedColorList.includes(color)
                    "
                    i-carbon-checkmark-filled
                  />
                </div>
              </div>
            </template>
          </UiPopover>
          <van-stepper
            v-model="item.weight"
            :show-minus="false"
            :show-plus="false"
            min="1"
            max="99"
          />
        </div>
      </div>
      <div v-show="list.length === 0" class="text-hint flex-1 center">
        暂无数据
      </div>

      <div class="mb-2 ml-4 flex gap-x-2" @click="onOperate">
        <button
          data-type="add"
          class="item center border rounded flex-nowrap gap-x-1 px-2 py-1"
        >
          <div>
            <div i-carbon-add />
          </div>
          <span class="whitespace-nowrap">添加</span>
        </button>
        <button
          data-type="shuffle"
          class="item center border rounded flex-nowrap gap-x-2 px-2 py-1"
        >
          <div class="text-xs">
            <div i-carbon-shuffle />
          </div>
          <span class="whitespace-nowrap">洗牌</span>
        </button>
      </div>
      <div class="mb-4 max-w-96% center pl-4">
        <button
          class="bg-primary text-white w-full p-2 rounded"
          @click="onSubmit"
        >
          保存
        </button>
      </div>
    </van-form>
  </div>
</template>
