<template>
  <div class="w-full center text-xs">
    <template v-if="chat.type === 'time'">
      <div class="text-wxhint">
        {{ chat.time }}
      </div>
    </template>
    <template v-if="chat.type === 'hongbao'">
      <img src="~/assets/hongbao.png" class="w-auto h-4" alt="hongbao" />
      <div v-if="chat.status === 0" class="center text-wxhint ml-1.5">
        <div>{{ username }}</div>
        <div>领取了你的</div>
        <div class="text-primary">红包</div>
      </div>
      <div v-if="chat.status === 1" class="center text-wxhint ml-1.5">
        <div>你领取了{{ username }}的</div>
        <div class="text-primary">红包</div>
      </div>
    </template>
    <template v-if="chat.type === 'paiyipai'">
      <div v-if="chat.status === 1" class="font-bold text-wxhint flex gap-x-1">
        <div>"{{ username }}"</div>
        <div>拍了拍我</div>
      </div>
      <div v-else class="flex text-wxhint gap-x-1">
        <div>我拍了拍</div>
        <div>"{{ username }}"</div>
        <div>大哭</div>
      </div>
    </template>
    <template v-if="chat.type === 'delete'">
      <div class="text-wxhint text-sm w-90% text-center">
        {{
          username
        }}开启了朋友验证，你还不是他（她）朋友。请先发送朋友验证请求，对方验证通过后，才能聊天。<a
          style="color: #586b95"
          class="cursor-pointer"
          >发送朋友验证</a
        >
      </div>
    </template>
    <template v-if="chat.type === 'add'">
      <div class="flex flex-col center gap-y-3">
        <div class="text-wxhint">以上是打招呼的内容</div>
        <div class="text-wxhint">
          你已添加了{{ username }}，现在可以开始聊天了。
        </div>
      </div>
    </template>
    <template v-if="chat.type === 'rejected'">
      <div class="text-wxhint">消息已发出，但被对方拒收了。</div>
    </template>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    chat: {
      type: Object as PropType<string, unknown>,
      default: () => {},
    },
    username: {
      type: String,
      default: '',
    },
  })
</script>
