<template>
  <div class="flex flex-col h-full gap-y-4 p-4 w-full">
    <div class="relative flex-1 rounded overflow-hidden center">
      <div class="absolute gradient top-3% <sm:top-10% text-14">
        迎国庆换新颜
      </div>
      <UiUpload class="-mt-20" @change="onUpload">
        <div
          ref="containerRef"
          class="box-border h-85 overflow-hidden border-white rounded-32px aspect-1/1 relative"
        >
          <img
            ref="imgRef"
            src="~/assets/guoqin/template.png"
            class="h-full object-cover rounded-28px aspect-1/1"
          />
          <div :class="currentTemplate" class="rounded-28px"></div>
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
          class="relative border rounded center hover:border-primary p-1"
        >
          <img
            :src="item.src"
            :data-class="item.className"
            class="h-20 min-w-20 object-cover rounded"
            :alt="item.name"
          />
          <div
            v-show="item.className === currentTemplate"
            class="pointer-events-none bg-dark/30 absolute w-full h-full center"
          >
            <div i-carbon-checkmark-filled class="bg-success"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center gap-x-4">
      <UiUpload @change="onUpload">
        <button
          class="shadow-sm gap-x-1 center border-t border-l rounded py-2 px-4"
        >
          <div i-carbon-add></div>
          <span>上传头像</span>
        </button>
      </UiUpload>
      <button
        class="shadow-sm gap-x-2 center border-t border-l rounded py-2 px-4"
        @click="onDownload"
      >
        <div i-carbon-download class="text-xs"></div>
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
      src: '/template/0.png',
      className: 'mask-0',
    },
    {
      src: '/template/1.png',
      className: 'mask-1',
    },
    {
      src: '/template/2.png',
      className: 'mask-2',
    },
    {
      src: '/template/3.png',
      className: 'mask-3',
    },
    {
      src: '/template/4.png',
      className: 'mask-4',
    },
    {
      src: '/template/5.png',
      className: 'mask-5',
    },
  ]
  const state = useLocalStorage<Record<string, string>>(GUOQING_SETTING, {})
  onMounted(() => {
    if (state.value.current) imgRef.value.src = state.value.current
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

  function onDownload() {
    exportImage(containerRef.value, 'avatar.png')
  }

  const currentTemplate = ref(state.value.class || 'mask-0')
  function onToggleTemp(evt: MouseEvent) {
    const className = (evt.target as HTMLElement).dataset.class
    if (className) {
      state.value.class = className
      currentTemplate.value = className
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

  .mask-0 {
    background-image: url('~/assets/guoqin/0.png');
    mask: linear-gradient(130deg, #000 10%, transparent 70%, transparent);

    @apply bg-cover absolute top-0 left-0 h-full w-full;
  }

  .mask-1 {
    @apply bg-cover border-12 border-b-0 border-danger absolute top-0 left-0 h-full w-full;

    &::before {
      font-size: 40px;
      /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
      font-family: font-ziti;
      content: '国庆快乐！';
      line-height: 40px;

      @apply absolute bottom-0 rounded-b-3 text-white bg-danger center w-full p-2;
    }
  }

  .mask-2 {
    background-image: url('~/assets/guoqin/0.png');
    mask: linear-gradient(130deg, #000 10%, transparent 70%, transparent);
    scale: -1 1;

    @apply bg-cover absolute top-0 left-0 h-full w-full;
  }

  .mask-3 {
    @apply absolute bottom-3 border-4 border-white right-3 h-15 w-1/4  rounded-0 bg-cover rounded-2 overflow-hidden p-1;

    background-image: url('~/assets/guoqin/0.png');
  }

  .mask-4 {
    mask: linear-gradient(130deg, #000 20%, transparent 70%, transparent);

    @apply bg-cover absolute -top-15 -left-20 h-full w-full;

    transform: rotate(10deg);
    background-image: url('~/assets/guoqin/4.png');
  }

  .mask-5 {
    mask: linear-gradient(130deg, #000 20%, transparent 70%, transparent);

    @apply bg-cover absolute -top-15 -right-20 h-full w-full;

    background-image: url('~/assets/guoqin/4.png');
    scale: -1 1;
    transform: rotate(10deg);
  }
</style>
