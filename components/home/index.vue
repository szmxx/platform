<template>
  <div class="flex flex-col h-full gap-y-4 pt-4 pb-8 w-full">
    <div class="relative flex-1 rounded overflow-hidden center">
      <div class="absolute gradient top-2% <sm:top-6% text-14 <sm:text-10">
        迎国庆换新颜
      </div>
      <UiUpload class="-mt-20" @change="onUpload">
        <div ref="containerRef">
          <HomeItem :src="src" :template="template"></HomeItem>
        </div>
      </UiUpload>
      <div
        class="absolute bottom-0 p-4 overflow-x-auto flex gap-x-4 w-full"
        @click="onToggleTemp"
      >
        <div
          v-for="item in templateList"
          :key="item.className"
          :data-class="item.className"
          class="relative rounded cursor-pointer center p-1 border"
          :class="{ 'border-primary': item.className === template }"
        >
          <nuxt-img
            :src="item.src"
            :data-class="item.className"
            class="h-20 min-w-20 object-cover rounded"
            :alt="item.className"
            provider="cloudinary"
          />
        </div>
      </div>
    </div>
    <div class="flex items-center px-4 gap-x-4">
      <UiUpload @change="onUpload">
        <button
          class="shadow-sm gap-x-1 center border-t border-l rounded py-2 px-4"
        >
          <div i-ion-plus-round></div>
          <span>上传头像</span>
        </button>
      </UiUpload>
      <button
        class="shadow-sm gap-x-1 center border-t border-l rounded py-2 px-4"
        @click="onDownload"
      >
        <div
          i-ion-md-download
          :class="{ 'i-ion-load-d! loading pointer-events-none': loading }"
        ></div>
        <span>下载头像</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  const containerRef = ref()
  const src = ref(useImg('/template.png'))
  import { GUOQING_SETTING } from '~/constants'

  const templateList = [
    {
      src: 'guoqin/template/0.png',
      className: 'mask-0',
    },
    {
      src: 'guoqin/template/2.png',
      className: 'mask-2',
    },
    {
      src: 'guoqin/template/1.png',
      className: 'mask-1',
    },
    {
      src: 'guoqin/template/6.png',
      className: 'mask-6',
    },
    {
      src: 'guoqin/template/3.png',
      className: 'mask-3',
    },

    {
      src: 'guoqin/template/7.png',
      className: 'mask-7',
    },
    {
      src: 'guoqin/template/8.png',
      className: 'mask-8',
    },
    {
      src: 'guoqin/template/4.png',
      className: 'mask-4',
    },
    {
      src: 'guoqin/template/5.png',
      className: 'mask-5',
    },
  ]
  const state = useLocalStorage<Record<string, string>>(GUOQING_SETTING, {})
  const template = ref('mask-0')

  onMounted(() => {
    if (state.value.current) src.value = state.value.current
    if (state.value.class) template.value = state.value.class
  })
  function onUpload(evt: FileList) {
    const reader = new FileReader()
    reader.onload = function (event) {
      if (event?.target?.result) {
        state.value.current = event?.target?.result?.toString()
        src.value = event?.target?.result?.toString()
      }
    }
    // 读取文件内容
    reader.readAsDataURL(evt[0])
  }
  const loading = ref(false)
  async function onDownload() {
    try {
      loading.value = true
      await exportImage(containerRef.value, '国庆.png')
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  function onToggleTemp(evt: MouseEvent) {
    const className = (evt.target as HTMLElement).dataset.class
    if (className) {
      state.value.class = className
      template.value = className
    }
  }
</script>

<style lang="scss" scoped>
  .gradient {
    /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
    font-family: font-ziti;
    color: transparent;
    background-clip: text;
    line-height: 1;
    background-image: linear-gradient(
      to right,
      rgb(var(--color-danger)),
      rgb(var(--color-primary))
    );
  }
</style>
