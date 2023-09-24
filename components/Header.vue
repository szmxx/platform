<!--
 * @Author: cola
 * @Date: 2023-09-16 13:37:56
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div class="relative flex gap-x-2 items-center py-2 shadow-sm px-4">
    <div class="mr-2 cursor-pointer" @click="onRedirect">
      <img src="/favicon.ico" class="h-10" alt="猫染" />
    </div>
    <NuxtLink
      v-for="item in list"
      :key="item.path"
      :to="item.path"
      :class="{ 'text-primary bg-hover': current === item.path }"
      class="relative center py-2 px-4 z-1 rounded hover:bg-hover"
    >
      {{ item.name }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
  const list = [
    {
      name: '国庆',
      path: '/',
    },
    {
      name: '抽奖',
      path: '/lucky',
    },
    {
      name: '营销',
      path: '/market',
    },
    {
      name: '聊天',
      path: '/chat',
    },
    // {
    //   name: '素材',
    //   path: '/design',
    // },
  ]

  const route = useRoute()
  const current = computed(() => route.path)

  function onRedirect() {
    return navigateTo({
      path: '/',
    })
  }
</script>
