<template>
  <div class="w-full flex flex-col gap-y-4">
    <div
      class="flex gap-x-4 flex-nowrap min-h-20 w-full overflow-x-auto"
      @click="onToggleTemp"
    >
      <div
        v-for="item in templateMap[current]"
        :key="item.name"
        :data-class="item.name"
        class="border center cursor-pointer p-1 min-w-40 relative rounded"
        :class="{
          'border-primary': `${item.className}` === currentClassName,
          'max-w-40': current === 'Composite',
        }"
      >
        <nuxt-img
          :data-class="item.name"
          :src="item?.path"
          class="w-auto relative max-h-20 object-cover"
          provider="cloudinary"
          :alt="item.name"
        />
        <div
          class="absolute top-0 px-2 text-white bg-primary rounded pointer-events-none text-xs truncate"
        >
          {{ item.name }}
        </div>
        <nuxt-img
          v-show="current !== 'Composite'"
          src="template.png"
          class="absolute pointer-events-none w-1/4 h-1/2 object-cover"
          alt="logo"
          provider="cloudinary"
        />
      </div>
    </div>
    <div class="flex gap-x-4 w-full overflow-x-auto" @click="onToggleType">
      <div
        v-for="item in templateList"
        :key="item.name"
        :data-name="item.name"
        :class="{ 'border-primary': current === item.name }"
        class="border center cursor-pointer p-1 min-w-30 sm:min-w-40 relative rounded"
      >
        <nuxt-img
          :data-name="item.name"
          :src="item?.path"
          class="w-auto relative max-h-20 min-h-20 object-cover"
          provider="cloudinary"
          :alt="item.name"
        />
        <nuxt-img
          src="template.png"
          class="absolute pointer-events-none <sm:w-1/2 w-1/4 h-1/2 object-cover"
          alt="logo"
          provider="cloudinary"
        />
        <div
          class="absolute top-0 bg-primary px-2 rounded text-white pointer-events-none text-xs truncate"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    currentClassName: {
      type: String,
      default: '',
    },
  })
  const templateList = [
    {
      name: 'iPhone',
      path: 'iphone/iPhone/iPhone_14.png',
      className: 'mask-0',
    },
    {
      name: 'iPad',
      path: 'iphone/iPad/iPad.png',
      className: 'mask-1',
    },
    {
      name: 'Mac',
      path: 'iphone/Mac/iMac.png',
      className: 'mask-2',
    },
    {
      name: 'Watch',
      path: 'iphone/Watch/Apple_Watch_Ultra.png',
      className: 'mask-3',
    },
    {
      name: 'Composite',
      path: 'iphone/Composite/iMac_Mac_iPad_iPhone.png',
      className: 'mask-4',
    },
  ]
  const templateMap = {
    iPhone: [
      {
        name: '11',
        path: 'iphone/iPhone/iPhone_11.png',
        className: 'mask-0-11',
      },
      {
        name: '12',
        path: 'iphone/iPhone/iPhone_12.png',
        className: 'mask-0-12',
      },
      {
        name: '13',
        path: 'iphone/iPhone/iPhone_13.png',
        className: 'mask-0-13',
      },
      {
        name: '14',
        path: 'iphone/iPhone/iPhone_14.png',
        className: 'mask-0-14',
      },
    ],
    iPad: [
      {
        name: 'iPad',
        path: 'iphone/iPad/iPad.png',
        className: 'mask-ipad',
      },
      {
        name: 'iPad Air',
        path: 'iphone/iPad/iPad_Air.png',
        className: 'mask-air',
      },
      {
        name: 'iPad mini',
        path: 'iphone/iPad/iPad_mini.png',
        className: 'mask-mini',
      },
      {
        name: 'iPad Pro',
        path: 'iphone/iPad/iPad_Pro.png',
        className: 'mask-pro',
      },
    ],
    Mac: [
      {
        name: 'iMac',
        path: 'iphone/Mac/iMac.png',
        className: 'mask-imac',
      },
      {
        name: 'Mac Air',
        path: 'iphone/Mac/MacBook_Air_13.png',
        className: 'mask-air',
      },
      {
        name: 'Mac Pro 15 4th',
        path: 'iphone/Mac/MacBook_Pro_15_4th.png',
        className: 'mask-pro-4',
      },
      {
        name: 'Mac Pro 16 4th',
        path: 'iphone/Mac/MacBook_Pro_16_4th.png',
        className: 'mask-pro16-4',
      },
      {
        name: 'Mac Pro 14 5th',
        path: 'iphone/Mac/MacBook_Pro_14_5th.png',
        className: 'mask-pro-5',
      },
      {
        name: 'Mac Pro 16 5th',
        path: 'iphone/Mac/MacBook_Pro_16_5th.png',
        className: 'mask-pro16-5',
      },
    ],
    Watch: [
      {
        name: 'Ultra',
        path: 'iphone/Watch/Apple_Watch_Ultra.png',
        className: 'mask-ultra',
      },
      {
        name: 'S6',
        path: 'iphone/Watch/Apple_Watch_S6.png',
        className: 'mask-s6',
      },
      {
        name: 'S7',
        path: 'iphone/Watch/Apple_Watch_S7.png',
        className: 'mask-s7',
      },
      {
        name: 'S8',
        path: 'iphone/Watch/Apple_Watch_S8.png',
        className: 'mask-s8',
      },
    ],
    Composite: [
      {
        name: 'Double-iPhone',
        path: 'iphone/Composite/Double_iPhone.png',
        className: 'double-iphone',
      },
      {
        name: 'Three-iPhone',
        path: 'iphone/Composite/Three_iPhone.png',
        className: 'three-iphone',
      },
      {
        name: 'iPad-iPhone',
        path: 'iphone/Composite/iPad_iPhone.png',
        className: 'ipad-iphone',
      },
      {
        name: 'Mac-iPad-iPhone',
        path: 'iphone/Composite/Mac_iPad_iPhone.png',
        className: 'mac-ipad-iphone',
      },
      {
        name: 'iMac-Mac-iPad-iPhone',
        path: 'iphone/Composite/iMac_Mac_iPad_iPhone.png',
        className: 'imac-mac-ipad-iphone',
      },
    ],
  }

  const current = ref<keyof typeof templateMap>('iPhone')
  const emit = defineEmits(['template'])

  const list = templateMap?.[current.value]
  emitTemplate(list?.[0]?.name)

  function onToggleType(evt: MouseEvent) {
    const name = (evt.target as HTMLElement).dataset.name
    if (name) {
      current.value = name as keyof typeof templateMap
      const list = templateMap?.[current.value]
      emitTemplate(list?.[0]?.name)
    }
  }
  function onToggleTemp(evt: MouseEvent) {
    const name = (evt.target as HTMLElement).dataset.class
    if (name) {
      emitTemplate(name)
    }
  }

  function emitTemplate(name: string) {
    const list = templateMap[current.value]
    const item = list.find((i) => i.name === name)
    emit('template', {
      className: item?.className,
      path: item?.path,
      current: current.value,
    })
  }
</script>
