<!--
 * @Author: cola
 * @Date: 2023-03-20 22:06:52
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div ref="editorRef" class="w-full h-full"></div>
</template>

<script setup lang="ts">
  import * as monaco from 'monaco-editor'
  let editor: monaco.editor.IStandaloneCodeEditor

  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
    language: {
      type: String,
      default: 'json',
    },
    theme: {
      type: String,
      default: '',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    format: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object as PropType<Record<string, unknown>>,
      default: () => {},
    },
  })

  const emit = defineEmits(['update:modelValue', 'change'])

  onMounted(() => {
    startInit()
  })

  const editorRef = ref()
  function startInit() {
    editor = monaco.editor.create(editorRef.value, {
      value: props.modelValue,
      language: props.language,
      theme: props.theme,
      automaticLayout: true,
      readOnly: props.readonly,
      ...props.options,
    })
    editor.onDidChangeModelContent(() => {
      const value = editor.getValue() //给父组件实时返回最新文本
      emit('update:modelValue', value)
      emit('change', value)
    })
    props.format && autoformat()
  }

  watch(
    () => props.modelValue,
    (newVal) => {
      if (editor) {
        const value = editor.getValue()
        if (newVal !== value) {
          editor.setValue(newVal)
        }
      }
    },
  )

  watch(
    () => props.options,
    (newValue) => {
      editor.updateOptions(newValue)
    },
    { deep: true },
  )

  watch(
    () => props.language,
    (newValue) => {
      monaco?.editor?.setModelLanguage(editor?.getModel?.(), newValue)
    },
  )

  function autoformat() {
    if (editor) {
      editor?.trigger?.('anything', 'editor.action.formatDocument', {})
    }
  }

  function validate() {
    const res = monaco?.editor?.getModelMarkers?.({})
    return res.length <= 1
  }

  function getValue() {
    return editor?.getValue?.()
  }

  onBeforeUnmount(() => {
    editor?.dispose?.()
  })

  defineExpose({
    validate: validate,
    autoformat: autoformat,
    getValue: getValue,
  })
</script>
