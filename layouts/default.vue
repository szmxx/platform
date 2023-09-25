<!--
 * @Author: cola
 * @Date: 2023-08-06 17:42:54
 * @LastEditors: cola
 * @Description:
-->
<script setup></script>
<template>
  <main class="w-full flex flex-col h-full overflow-hidden">
    <Header class="rr-block"></Header>
    <div class="flex-1 bg-cover z-1 overflow-y-auto">
      <div class="bg absolute w-full h-92%"></div>
      <slot />
    </div>
    <DarkToggle class="absolute right-4 top-4" />
  </main>
</template>

<style lang="scss" scoped>
  .bg {
    background-image: url('https://res.cloudinary.com/dcro7qdzl/image/upload/f_auto,q_auto:best,dpr_auto/assets/bg.png');

    @apply bg-cover bg-no-repeat blur-4 z-0 pointer-events-none;
  }
</style>
