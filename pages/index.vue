<!--
 * @Author: cola
 * @Date: 2023-08-06 17:42:54
 * @LastEditors: cola
 * @Description:
-->
<script setup lang="ts">
  const online = useOnline()
</script>

<template>
  <Suspense>
    <Home v-if="online"></Home>
    <div v-else text-hint>You're offline</div>
    <template #fallback>
      <div>
        <span animate-pulse>Loading...</span>
      </div>
    </template>
  </Suspense>
</template>
