<script setup lang="ts">
  const router = useRouter()
</script>

<template>
  <main p="x4 y10" text="center text-success">
    <div text-xl>
      <div i-ion-warning inline-block />
    </div>
    <div>Not found</div>
    <div>
      <button text-sm @click="router.back()">Back</button>
    </div>
  </main>
</template>
