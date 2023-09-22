<!--
 * @Author: cola
 * @Date: 2023-08-06 17:42:54
 * @LastEditors: cola
 * @Description:
-->
<script setup lang="ts">
  const online = useOnline()
  useSeoMeta({
    title: '国庆头像',
    description:
      '寻找国庆节头像制作服务？我们提供专业的国庆头像制作，让您在庆祝国庆节时展示个性化的头像。定制您的国庆头像，展示您对祖国的热爱和祝福。立即联系我们，让我们帮您制作独一无二的国庆头像！',
  })

  defineOgImage({
    title: '国庆头像',
    description:
      '寻找国庆节头像制作服务？我们提供专业的国庆头像制作，让您在庆祝国庆节时展示个性化的头像。定制您的国庆头像，展示您对祖国的热爱和祝福。立即联系我们，让我们帮您制作独一无二的国庆头像！',
  })
</script>

<template>
  <Home v-if="online"></Home>
  <div v-else text-hint>You're offline</div>
</template>
