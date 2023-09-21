<template>
  <div class="flex flex-col h-full gap-y-4 pt-4 pb-8 w-full">
    <div class="relative flex-1 rounded overflow-hidden center">
      <div class="absolute gradient top-2% <sm:top-6% text-14 <sm:text-10">
        迎国庆换新颜
      </div>
      <UiUpload class="-mt-20" @change="onUpload">
        <div
          ref="containerRef"
          class="box-border h-75 <sm:h-55 overflow-hidden border-white rounded-20px aspect-1/1 relative"
        >
          <nuxt-img
            ref="imgRef"
            src="template.png"
            alt="logo"
            class="h-full object-cover aspect-1/1"
            provider="cloudinary"
          />
          <div :class="currentTemplate" class="rounded-20px"></div>
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
          :class="{ 'border-primary': item.className === currentTemplate }"
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
  const imgRef = ref()
  const containerRef = ref()
  import { GUOQING_SETTING } from '~/constants'

  const templateList = [
    {
      src: 'guoqin/template/0.png',
      className: 'mask-0',
    },
    {
      src: 'guoqin/template/1.png',
      className: 'mask-1',
    },
    {
      src: 'guoqin/template/2.png',
      className: 'mask-2',
    },
    {
      src: 'guoqin/template/3.png',
      className: 'mask-3',
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
  const currentTemplate = ref('mask-0')

  onMounted(() => {
    if (state.value.current) imgRef.value.src = state.value.current
    if (state.value.class) currentTemplate.value = state.value.class
  })
  function onUpload(evt: FileList) {
    const reader = new FileReader()
    reader.onload = function (event) {
      if (event?.target?.result) {
        state.value.current = event?.target?.result?.toString()
      }
      imgRef.value.src = event?.target?.result
    }
    // 读取文件内容
    reader.readAsDataURL(evt[0])
  }
  const loading = ref(false)
  async function onDownload() {
    try {
      loading.value = true
      await exportImage(containerRef.value, '图片.png')
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
      currentTemplate.value = className
    }
  }
</script>

<style lang="scss" scoped>
  $guoqin-0: 'https://res.cloudinary.com/dcro7qdzl/image/upload/f_auto,q_auto:best,dpr_auto/assets/guoqin/0.png';
  $guoqin-4: 'https://res.cloudinary.com/dcro7qdzl/image/upload/f_auto,q_auto:best,dpr_auto/assets/guoqin/4.png';

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

  .mask-0 {
    background-image: url($guoqin-0);
    mask: linear-gradient(115deg, #000 10%, transparent 70%, transparent);

    @apply bg-cover absolute top-0 left-0 h-full w-full;
  }

  .mask-1 {
    @apply bg-cover border-12 border-b-0 border-danger absolute top-0 left-0 h-full w-full;

    &::before {
      /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
      font-family: font-ziti;
      content: '国庆快乐';
      line-height: 1;

      @apply absolute text-8 sm:text-10 bottom-0 text-white bg-danger center w-full p-2;
    }
  }

  .mask-2 {
    background-image: url($guoqin-0);
    mask: linear-gradient(115deg, #000 10%, transparent 70%, transparent);
    scale: -1 1;

    @apply bg-cover absolute top-0 left-0 h-full w-full;
  }

  .mask-3 {
    @apply absolute bottom-3 border-4 border-white right-3 h-1/6 w-1/4 rounded-0 bg-cover rounded-2 overflow-hidden p-1;

    background-image: url($guoqin-0);
  }

  .mask-4 {
    mask: linear-gradient(115deg, #000 20%, transparent 70%, transparent);

    @apply bg-cover absolute -top-15 -left-20 h-full w-full;

    transform: rotate(10deg);
    background-image: url($guoqin-4);
  }

  .mask-5 {
    mask: linear-gradient(115deg, #000 20%, transparent 70%, transparent);

    @apply bg-cover absolute -top-15 -right-20 h-full w-full;

    background-image: url($guoqin-4);
    scale: -1 1;
    transform: rotate(10deg);
  }
</style>
