<template>
  <div class="flex flex-col items-center gap-y-8 pt-4 pb-8 px-4 w-full">
    <div v-show="!skeletonLoading" ref="containerRef" class="relative">
      <nuxt-img
        :src="currentPath"
        class="max-h-100 <sm:max-h-65 relative z-9 w-auto object-cover"
        provider="cloudinary"
        @load="onLoad"
      />
      <div :class="currentClassName" class="overflow-hidden">
        <nuxt-img
          ref="imgRef"
          src="template.png"
          class="object-cover w-full h-full"
          provider="cloudinary"
          alt="logo"
        />
        <MarketTool :class-name="currentClassName"></MarketTool>
      </div>
    </div>
    <van-skeleton v-show="skeletonLoading">
      <template #template>
        <van-skeleton-image
          class="min-h-100 <sm:(min-h-65 min-w-32.5) rounded-6 min-w-50"
        />
      </template>
    </van-skeleton>
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
  const containerRef = ref()
  const imgRef = ref()
  const currentClassName = ref('mask-0')
  const currentPath = ref('iphone/iPhone/iPhone_14.png')

  function onUpload(evt: FileList) {
    const reader = new FileReader()
    reader.onload = function (event) {
      imgRef.value.src = event?.target?.result
    }
    // 读取文件内容
    reader.readAsDataURL(evt[0])
  }
  const loading = ref()
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

  function onTemplate(className: string, path: string) {
    currentClassName.value = className
    currentPath.value = path
  }
  const skeletonLoading = ref(true)
  function onLoad() {
    console.log('loaded')
    skeletonLoading.value = false
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
