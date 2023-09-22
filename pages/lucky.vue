<script setup lang="ts">
  const online = useOnline()
  useSeoMeta({
    title: '抽奖',
    description:
      '寻找一种创意而有趣的方式来吸引和奖励您的受众吗？自定义转盘抽奖是您的最佳选择！我们提供专业的自定义转盘抽奖服务，让您能够根据自己的需求和品牌形象来设计独特的转盘。通过这种创新的互动方式，您可以吸引更多的用户参与，并提高品牌知名度。立即联系我们，开始您的自定义转盘抽奖活动',
  })
  defineOgImage({
    title: '抽奖',
    description:
      '寻找一种创意而有趣的方式来吸引和奖励您的受众吗？自定义转盘抽奖是您的最佳选择！我们提供专业的自定义转盘抽奖服务，让您能够根据自己的需求和品牌形象来设计独特的转盘。通过这种创新的互动方式，您可以吸引更多的用户参与，并提高品牌知名度。立即联系我们，开始您的自定义转盘抽奖活动',
  })
</script>

<template>
  <ClientOnly>
    <Lucky v-if="online"></Lucky>
    <div v-else class="text-hint">You're offline</div>
  </ClientOnly>
</template>
