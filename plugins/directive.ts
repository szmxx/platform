export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('focus', {
    mounted(el, binding) {
      setTimeout(() => {
        if (binding.value && el) el?.focus?.()
      }, 0)
    },
  })
})
