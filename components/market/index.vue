<template>
  <div class="flex flex-col items-center gap-y-8 pt-4 pb-8 px-4 w-full">
    <div ref="containerRef" class="w-fit center">
      <component
        :is="componentMap?.[component]"
        :src="src"
        :class-name="currentClassName"
        :template="currentTemplate"
      ></component>
    </div>

    <MarketTemplate
      :current-class-name="currentClassName"
      @template="onTemplate"
    ></MarketTemplate>
    <div class="flex items-center w-full gap-x-4">
      <UiUpload @change="onUpload">
        <button
          class="shadow-sm gap-x-1 center border-t border-l rounded py-2 px-4"
        >
          <div i-ion-plus-round></div>
          <span>上传图片</span>
        </button>
      </UiUpload>
      <button
        class="shadow-sm gap-x-2 center border-t border-l rounded py-2 px-4"
        @click="onDownload"
      >
        <div
          i-ion-md-download
          :class="{ 'i-ion-load-d! loading pointer-events-none': loading }"
        ></div>
        <span>下载图片</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  const src = ref(useImg('/template.png'))

  const componentMap = {
    iPhone: resolveComponent('MarketTemplateIphone'),
    iPad: resolveComponent('MarketTemplateIpad'),
    Mac: resolveComponent('MarketTemplateMac'),
    Watch: resolveComponent('MarketTemplateWatch'),
    Composite: resolveComponent('MarketComposite'),
  }

  const component = ref<keyof typeof componentMap>('iPhone')

  function onUpload(evt: FileList) {
    const reader = new FileReader()
    reader.onload = function (event) {
      if (event?.target?.result) {
        src.value = event?.target?.result.toString()
      }
    }
    // 读取文件内容
    reader.readAsDataURL(evt[0])
  }
  const loading = ref()
  const containerRef = ref()

  async function onDownload() {
    try {
      loading.value = true
      await exportImage(containerRef.value, '营销.png')
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  const currentClassName = ref('mask-0')
  const currentTemplate = ref('iphone/iPhone/iPhone_14.png')

  function onTemplate(opt: Record<string, string>) {
    const { className, path, current } = opt
    currentClassName.value = className
    currentTemplate.value = path
    component.value = current as keyof typeof componentMap
  }
</script>

<style lang="scss" scoped>
  .mask-0 {
    @apply absolute top-1.5% left-3% h-96% w-94% rounded-t-3 rounded-b-3;
  }

  .mask-0-13 {
    @apply left-4% w-92%;
  }

  .mask-1 {
    @apply absolute top-3% left-4% h-94% w-92% rounded;
  }

  .mask-2 {
    @apply absolute top-8% left-10% h-86% w-80% rounded;
  }

  .mask-imac {
    @apply top-4% left-2% h-80% w-96%;
  }

  .mask-pro-4 {
    @apply left-12% h-80% w-76%;
  }

  .mask-pro16-4 {
    @apply top-4% left-12% w-76%;
  }

  .mask-pro-5 {
    @apply top-11% left-11% h-80% w-78%;
  }

  .mask-pro16-5 {
    @apply top-11% h-80%;
  }

  .mask-3 {
    @apply absolute top-20% left-10% h-60% w-80% rounded-4;
  }
</style>
