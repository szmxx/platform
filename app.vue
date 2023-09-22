<!--
 * @Author: cola
 * @Date: 2023-08-06 17:42:54
 * @LastEditors: cola
 * @Description:
-->
<script setup lang="ts">
  const { locale } = useI18n()
</script>

<template>
  <Html dir="ltr" :lang="locale">
    <Head>
      <VitePwaManifest />
    </Head>
    <Body>
      <NuxtLoadingIndicator />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>
