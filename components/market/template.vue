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
        class="border center p-1 min-w-40 relative rounded"
        :class="{
          'border-primary':
            `${parentClass} ${item.className}` === currentClassName,
        }"
      >
        <img
          :data-class="item.name"
          :src="item?.path?.default"
          class="w-auto relative max-h-20 object-cover"
        />
        <div class="absolute pointer-events-none center text-xs truncate">
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="flex gap-x-4 w-full overflow-x-auto" @click="onToggleType">
      <div
        v-for="item in templateList"
        :key="item.name"
        :data-name="item.name"
        class="border center p-1 min-w-15 sm:min-w-40 relative rounded"
      >
        <img
          :data-name="item.name"
          :src="item?.path?.default"
          class="w-auto relative max-h-20 object-cover"
        />
        <div class="absolute pointer-events-none center text-xs truncate">
          {{ item.name }}
        </div>
        <div
          v-show="item.name === current"
          class="pointer-events-none bg-dark/30 rounded absolute w-full h-full center"
        >
          <div i-ion-checkmark-circled class="bg-success"></div>
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
      path: await import('~/assets/iphone/iPhone/index.png'),
      className: 'mask-0',
    },
    {
      name: 'iPad',
      path: await import('~/assets/iphone/iPad/index.png'),
      className: 'mask-1',
    },
    {
      name: 'Mac',
      path: await import('~/assets/iphone/Mac/index.png'),
      className: 'mask-2',
    },
    {
      name: 'Watch',
      path: await import('~/assets/iphone/Watch/index.png'),
      className: 'mask-3',
    },
  ]
  const templateMap = {
    iPhone: [
      {
        name: '11',
        path: await import('~/assets/iphone/iPhone/iPhone 11.png'),
        className: 'mask-0-11',
      },
      {
        name: '12',
        path: await import('~/assets/iphone/iPhone/iPhone 12.png'),
        className: 'mask-0-12',
      },
      {
        name: '13',
        path: await import('~/assets/iphone/iPhone/iPhone 13.png'),
        className: 'mask-0-13',
      },
      {
        name: '14',
        path: await import('~/assets/iphone/iPhone/iPhone 14.png'),
        className: 'mask-0-14',
      },
    ],
    iPad: [
      {
        name: 'iPad',
        path: await import('~/assets/iphone/iPad/iPad.png'),
        className: 'mask-ipad',
      },
      {
        name: 'iPad Air',
        path: await import('~/assets/iphone/iPad/iPad Air.png'),
        className: 'mask-air',
      },
      {
        name: 'iPad mini',
        path: await import('~/assets/iphone/iPad/iPad mini.png'),
        className: 'mask-mini',
      },
      {
        name: 'iPad Pro',
        path: await import('~/assets/iphone/iPad/iPad Pro.png'),
        className: 'mask-pro',
      },
    ],
    Mac: [
      {
        name: 'iMac',
        path: await import('~/assets/iphone/Mac/index.png'),
        className: 'mask-imac',
      },
      {
        name: 'Mac Air',
        path: await import('~/assets/iphone/Mac/MacBook Air 13.png'),
        className: 'mask-air',
      },
      {
        name: 'Mac Pro 15 4th',
        path: await import('~/assets/iphone/Mac/MacBook Pro 15 4th.png'),
        className: 'mask-pro-4',
      },
      {
        name: 'Mac Pro 16 4th',
        path: await import('~/assets/iphone/Mac/MacBook Pro 16 4th.png'),
        className: 'mask-pro16-4',
      },
      {
        name: 'Mac Pro 14 5th',
        path: await import('~/assets/iphone/Mac/MacBook Pro 14 5th.png'),
        className: 'mask-pro-5',
      },
      {
        name: 'Mac Pro 16 5th',
        path: await import('~/assets/iphone/Mac/MacBook Pro 16 5th.png'),
        className: 'mask-pro16-5',
      },
    ],
    Watch: [
      {
        name: 'Ultra',
        path: await import('~/assets/iphone/Watch/Apple Watch Ultra.png'),
        className: 'mask-ultra',
      },
      {
        name: 'S6',
        path: await import('~/assets/iphone/Watch/Apple Watch S6.png'),
        className: 'mask-s6',
      },
      {
        name: 'S7',
        path: await import('~/assets/iphone/Watch/Apple Watch S7.png'),
        className: 'mask-s7',
      },
      {
        name: 'S8',
        path: await import('~/assets/iphone/Watch/Apple Watch S8.png'),
        className: 'mask-s8',
      },
    ],
  }

  const current = ref<keyof typeof templateMap>('iPhone')
  const parentClass = ref('mask-0')
  const emit = defineEmits(['template'])

  const list = templateMap?.[current.value]
  emitTemplate(list?.[0]?.name)

  function onToggleType(evt: MouseEvent) {
    const name = (evt.target as HTMLElement).dataset.name
    if (name) {
      const className = templateList.find((i) => name === i.name)?.className
      if (className) {
        parentClass.value = className
      }
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
    emit(
      'template',
      `${parentClass.value} ${item?.className}`,
      item?.path?.default,
    )
  }
</script>
