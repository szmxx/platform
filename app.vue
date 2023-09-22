<!--
 * @Author: cola
 * @Date: 2023-08-06 17:42:54
 * @LastEditors: cola
 * @Description:
-->
<script setup lang="ts">
  const siteMeta = useSiteMeta()
  useHead({
    title: siteMeta.name,
    titleTemplate: `%s - ${siteMeta.name}`,
    meta: [
      {
        name: 'keywords',
        content: siteMeta.keywords,
      },
    ],
  })
</script>

<template>
  <Html dir="ltr">
    <Head>
      <VitePwaManifest />
      <SchemaOrgPerson
        :name="siteMeta.name"
        :image="siteMeta.orgImage"
        :same-as="siteMeta.sameAs"
      />
    </Head>
    <Body>
      <NuxtLoadingIndicator />
      <NuxtLayout>
        <SeoKit
          :site-url="siteMeta.host"
          :language="siteMeta.lang"
          :site-name="siteMeta.name"
          :site-description="siteMeta.description"
        />
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>
