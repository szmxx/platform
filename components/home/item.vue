<template>
  <div
    class="box-border cursor-pointer h-75 <sm:h-55 overflow-hidden border-white aspect-1/1 relative"
  >
    <img :src="src" alt="logo" class="h-full object-cover aspect-1/1" />
    <div :class="template" class="rounded"></div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    src: {
      type: String,
      default: '',
    },
    template: {
      type: String,
      default: '',
    },
  })
</script>

<style scoped lang="scss">
  $guoqin-0: 'https://res.cloudinary.com/dcro7qdzl/image/upload/f_auto,q_auto:best,dpr_auto/assets/guoqin/0.png';
  $guoqin-4: 'https://res.cloudinary.com/dcro7qdzl/image/upload/f_auto,q_auto:best,dpr_auto/assets/guoqin/4.png';
  $guoqin-6: 'https://res.cloudinary.com/dcro7qdzl/image/upload/f_auto,q_auto:best,dpr_auto/assets/guoqin/6.png';
  $guoqin-7: 'https://res.cloudinary.com/dcro7qdzl/image/upload/f_auto,q_auto:best,dpr_auto/assets/guoqin/7.png';

  .mask-0 {
    background-image: url($guoqin-0);
    mask: linear-gradient(115deg, #000 10%, transparent 70%, transparent);

    @apply bg-cover absolute top-0 left-0 h-full w-full;
  }

  .mask-1 {
    @apply bg-cover border-12 border-b-0 border-danger absolute top-0 left-0 h-full w-full;

    &::before {
      /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
      font-family: font-ziti;
      content: '国庆快乐';
      line-height: 1;

      @apply absolute text-8 sm:text-10 bottom-0 text-white bg-danger center w-full p-2;
    }
  }

  .mask-2 {
    background-image: url($guoqin-0);
    mask: linear-gradient(115deg, #000 10%, transparent 70%, transparent);
    scale: -1 1;

    @apply bg-cover absolute top-0 left-0 h-full w-full;
  }

  .mask-3 {
    @apply absolute bottom-3 border-4 border-white right-3 h-1/6 w-1/4 rounded-0 bg-cover rounded-2 overflow-hidden p-1;

    background-image: url($guoqin-0);
  }

  .mask-4 {
    mask: linear-gradient(115deg, #000 20%, transparent 70%, transparent);

    @apply bg-cover absolute -top-15 -left-20 h-full w-full;

    transform: rotate(10deg);
    background-image: url($guoqin-4);
  }

  .mask-5 {
    mask: linear-gradient(115deg, #000 20%, transparent 70%, transparent);

    @apply bg-cover absolute -top-15 -right-20 h-full w-full;

    background-image: url($guoqin-4);
    scale: -1 1;
    transform: rotate(10deg);
  }

  .mask-6 {
    @apply absolute w-full h-full bottom-0 border-4 border-white right-0 bg-cover overflow-hidden;

    background-image: url($guoqin-6);
  }

  .mask-7 {
    background-image: url($guoqin-7);
    mask: linear-gradient(130deg, #000 10%, transparent 70%, transparent);

    @apply bg-cover absolute -top-10 left-0 h-full w-full filter-brightness-120;
  }

  .mask-8 {
    background-image: url($guoqin-7);
    mask: linear-gradient(130deg, #000 10%, transparent 70%, transparent);
    scale: -1 1;

    @apply bg-cover absolute -top-10 left-0 h-full w-full filter-brightness-120;
  }
</style>
