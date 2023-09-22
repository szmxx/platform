<script setup lang="ts">
  const online = useOnline()
  useSeoMeta({
    title: '营销',
    description:
      '苹果图片营销是一种利用精美的苹果图片来推广和营销产品或服务的策略。通过使用高质量的苹果图片，您可以吸引潜在客户的注意力，增加品牌曝光度，并提高网站流量。我们提供专业的苹果图片营销服务，帮助您在搜索引擎结果页面中脱颖而出。联系我们，让我们一起打造独特而引人注目的苹果图片营销策略，提升您的业务成功！',
  })

  defineOgImage({
    title: '营销',
    description:
      '苹果图片营销是一种利用精美的苹果图片来推广和营销产品或服务的策略。通过使用高质量的苹果图片，您可以吸引潜在客户的注意力，增加品牌曝光度，并提高网站流量。我们提供专业的苹果图片营销服务，帮助您在搜索引擎结果页面中脱颖而出。联系我们，让我们一起打造独特而引人注目的苹果图片营销策略，提升您的业务成功！',
  })
</script>

<template>
  <ClientOnly>
    <Market v-if="online"></Market>
    <div v-else class="text-hint">You're offline</div>
  </ClientOnly>
</template>
