<!--
 * @Author: cola
 * @Date: 2023-08-06 17:42:54
 * @LastEditors: cola
 * @Description:
-->
<script setup lang="ts">
  const config = useRuntimeConfig()
  useHead({
    title: config?.public?.name,
  })
</script>

<template>
  <Html dir="ltr">
    <Head>
      <VitePwaManifest />
    </Head>
    <Body>
      <NuxtLayout>
        <NuxtLoadingIndicator />
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>
