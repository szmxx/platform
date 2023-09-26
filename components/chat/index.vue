<template>
  <div class="w-full h-full center relative flex-col overflow-hidden">
    <div
      v-show="isShowPanel"
      ref="panelRef"
      class="w-35% rr-block <sm:(absolute w-80% bg-default p-0) z-99 h-full absolute top-0 left-0 p-4"
    >
      <van-tabs class="w-full h-full overflow-y-auto" type="card">
        <van-tab title="全局" class="px-4 py-2">
          <ChatConfigTheme
            v-model:disturb="isDisturb"
            @operate="onThemeOperate"
            @time="onTime"
            @bg="onTheme"
            @group="onGroup"
          ></ChatConfigTheme>
        </van-tab>
        <van-tab title="套壳" class="px-4 py-2">
          <ChatConfigShell
            v-model:system="system"
            v-model="currentTime"
            @config="onShellConfig"
          ></ChatConfigShell>
        </van-tab>
        <van-tab title="聊天对象" class="px-4 py-2 h-full">
          <ChatConfigObject
            v-model="username"
            :map="map"
            :is-group="groupConfig.group"
            @operate="onObjectOperate"
            @create="onAddUser"
          ></ChatConfigObject>
        </van-tab>
        <van-tab title="本人" class="px-4 py-2">
          <ChatConfigSelf
            :map="map"
            @operate="onObjectOperate"
          ></ChatConfigSelf>
        </van-tab>
      </van-tabs>
    </div>
    <div
      ref="chatRef"
      class="bg-wx z-99 w-78 <sm:(w-full text-base) flex text-xs flex-col h-full relative"
    >
      <ChatShell
        :time="currentTime?.join?.(':')"
        :config="currentShellConfig"
        :system="system"
        class="absolute pt-2 px-4 <sm:(pt-4 px-6) z-10"
      ></ChatShell>
      <div
        class="flex absolute w-full overflow-hidden pt-11.5 px-2 pb-2 <sm:(px-3 pt-15) justify-between backdrop-blur-8 border-b border-dark/10 bg-wx/90 items-center w-full z-9"
      >
        <div class="flex cursor-pointer items-center gap-x-0">
          <div i-ion-ios-arrow-left class="text-lg"></div>
          <div class="bg-wxhint/20 -ml-1 px-1.5 py-0.5 rounded-3">
            {{ msgCount }}
          </div>
        </div>
        <div
          class="self-center flex-1 flex line-height-1em center gap-x-0.5 mr-4 font-450 overflow-hidden"
        >
          <div v-if="!groupConfig.group" class="truncate max-w-80%">
            {{ username }}
          </div>
          <div v-else class="flex gap-x-1 max-w-full center">
            <div class="truncate max-w-80%">
              {{ groupConfig.groupName }}
            </div>
            <b>({{ groupConfig.groupNumber }})</b>
          </div>
          <div
            v-show="isDisturb"
            i-ion-notifications-off-outline
            scale-75
            bg-wxhint
          ></div>
        </div>
        <div class="cursor-pointer mr-1.5 flex items-center gap-x-1 font-bold">
          <div class="w-3px h-3px bg-dark rounded-1/2"></div>
          <div class="w-3px h-3px bg-dark rounded-1/2"></div>
          <div class="w-3px h-3px bg-dark rounded-1/2"></div>
        </div>
      </div>
      <div
        ref="containRef"
        class="h-[calc(100%-4.5rem)] <sm:(h-[calc(100%-5.5rem)] gap-y-4 pt-26) chat-container text-wx pt-22 pb-2 overflow-y-auto px-2.5 flex gap-y-3 flex-col"
      >
        <ChatItem
          v-for="(item, index) in list"
          :key="item.id"
          :chat="item"
          :map="map"
          :username="username"
          :is-custom-bg="isCustomBg"
          :is-group="groupConfig.group"
          @avatar="onAvatar"
          @hongbao="onHongbao"
          @payment="onPayment"
          @delete="onDelete(index)"
          @revert="onRevert(index, $event)"
          @down="onDown(index)"
          @up="onUp(index)"
        ></ChatItem>
      </div>
      <div
        class="relative w-full center flex-1 px-2 items-start py-2 bg-wxhover"
      >
        <div class="center w-full gap-x-2">
          <div
            class="border-1.5 rounded-full border-dark p-0.5 cursor-pointer"
            @click="onTogglePanel"
          >
            <div i-ion-ios-wifi class="rotate-90deg scale-80"></div>
          </div>
          <div class="flex-1">
            <input
              v-model="inputVal"
              class="w-full px-2 bg-default py-2 rounded"
              @change="onInputChange"
              @keyup.enter="onInputChange"
            />
          </div>
          <div class="<sm:mr-2">
            <UiLabelEmoji
              v-model="emojiVal"
              class="border-1.5 center rounded-full border-dark/90 cursor-pointer"
            >
              <svg
                t="1695407081290"
                class="cursor-pointer h-4.5 w-4.5 <sm:(w-6 h-6)"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="6666"
                fill="currentColor"
              >
                <path
                  d="M320 363.2m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"
                  p-id="6668"
                ></path>
                <path
                  d="M704 363.2m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"
                  p-id="6669"
                ></path>
                <path
                  d="M734.4 555.2H289.6c-17.6 0-33.6 8-46.4 20.8s-17.6 33.6-12.8 51.2C256 763.2 376 857.6 512 857.6s256-97.6 281.6-230.4c4.8-17.6 0-33.6-12.8-51.2-12.8-12.8-30.4-20.8-46.4-20.8zM512 772.8c-84.8 0-161.6-56-187.2-132.8H704c-30.4 81.6-107.2 132.8-192 132.8z"
                  p-id="6670"
                ></path>
              </svg>
            </UiLabelEmoji>
          </div>
          <div
            class="border-1.5 rounded-full center border-dark p-0.5 cursor-pointer"
          >
            <div i-ion-md-add class="cursor-pointer font-bold"></div>
          </div>
        </div>
        <div
          v-if="system === 'ios'"
          class="absolute bottom-1.5 center bg-dark w-35% h-1 rounded"
        ></div>
        <div v-else class="absolute bottom-2 center gap-x-15% w-full">
          <div i-ion-triangle-outline class="-rotate-90deg"></div>
          <div
            class="rounded-full w-3.5 h-3.5 <sm:(h-4.5 w-4.5) border-dark border-1"
          ></div>
          <div
            class="rounded-0.5 w-3 h-3 <sm:(h-4 w-4) border-dark border-1"
          ></div>
        </div>
      </div>
    </div>
    <div
      class="absolute <sm:hidden rr-block right-0 w-35% flex flex-col gap-y-2 p-2 h-full"
    >
      <div class="flex justify-between border-b p-1 items-center">
        <div>编辑元数据</div>
        <button class="px-2 py-1 bg-primary text-white rounded" @click="onSave">
          保存
        </button>
      </div>
      <ClientOnly>
        <UiEditor ref="editorRef" v-model="listStr"></UiEditor>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { saveAs } from 'file-saver'
  import { domToPng } from 'modern-screenshot'
  import { CHAT_LIST, CHAT_USER_MAP } from '~/constants'
  const username = ref('')
  const emojiVal = ref('')
  const msgCount = ref(204)
  const containRef = ref()
  const inputVal = ref('')
  const isShowPanel = ref(false)
  const panelRef = ref()
  onMounted(() => {
    const bool = isMobileDevice()
    if (bool) {
      onClickOutside(panelRef, () => {
        isShowPanel.value = false
      })
    } else {
      isShowPanel.value = true
    }
  })

  function onTogglePanel() {
    const bool = isMobileDevice()
    if (bool) isShowPanel.value = !isShowPanel.value
  }
  const map = ref<Record<string, Record<string, unknown>>>({})

  const userMap = useLocalStorage<Record<string, Record<string, unknown>>>(
    CHAT_USER_MAP,
    {
      user: {
        url: '/logo.svg',
        name: '新用户',
      },
      self: {
        url: '/logo.svg',
        name: 'self',
      },
    },
  )

  map.value = userMap.value

  watch(emojiVal, (emoji) => {
    inputVal.value += emoji
  })
  const list = ref<Record<string, unknown>[]>([])

  const stateList = useLocalStorage<Record<string, unknown>[]>(CHAT_LIST, [])
  list.value = stateList.value

  const listStr = computed(() => JSON.stringify(list.value, null, 2))

  function onInputChange() {
    if (inputVal.value) {
      addListItem({
        role: 'self',
        user: 'self',
        message: inputVal.value,
      })

      inputVal.value = ''
    }
  }

  function scrollBottom() {
    nextTick(() => {
      containRef?.value?.scrollTo({
        top: containRef?.value?.scrollHeight,
        behavior: 'smooth',
      })
    })
  }

  function onAvatar(key: keyof typeof map.value, url: string) {
    if (typeof map.value[key] === 'object') map.value[key].url = url
  }

  function onHongbao(role: string) {
    addListItem({
      role: 'system',
      type: 'hongbao',
      status: role === 'self' ? 0 : 1,
    })
  }

  function onPayment(role: string, price: number) {
    if (role === 'self') {
      addListItem({
        role: 'user',
        user: 'user',
        type: 'payment',
        price: price,
        status: 2,
      })
    } else {
      addListItem({
        role: 'self',
        type: 'payment',
        price: price,
        user: 'user',
        status: 1,
      })
    }
  }

  function onDelete(index: number) {
    list.value.splice(index, 1)
  }

  function onRevert(index: number, status: number) {
    onDelete(index)
    addListItem({
      role: 'system',
      type: 'revert',
      status: status,
    })
  }

  function onUp(index: number) {
    if (list.value[index - 1]) {
      ;[list.value[index - 1], list.value[index]] = [
        list.value[index],
        list.value[index - 1],
      ]
    }
  }
  function onDown(index: number) {
    if (list.value[index + 1]) {
      ;[list.value[index], list.value[index + 1]] = [
        list.value[index + 1],
        list.value[index],
      ]
    }
  }

  function addListItem(opt: Record<string, unknown> = {}) {
    opt.id = crypto?.randomUUID?.()
    list.value.push(opt)
    scrollBottom()
  }

  const isCustomBg = ref(false)
  function onTheme(opt: Record<string, unknown>) {
    const { type, value, mode } = opt
    if (value) isCustomBg.value = true
    switch (type) {
      case 'color':
        containRef.value.style.background = value

        break
      case 'custom':
        if (value) containRef.value.style.backgroundImage = `url(${value})`
        containRef.value.style.backgroundSize = mode
        break
    }
  }

  const groupConfig = ref<Record<string, unknown>>({})
  function onGroup(config: Record<string, unknown>) {
    groupConfig.value = config
  }

  function onAddUser(opt: Record<string, unknown>) {
    const { id, name, url } = opt
    if (id && groupConfig.value.group) {
      map.value[id as string] = {
        name: name,
        url: url,
      }
    }
  }

  const chatRef = ref()
  async function onThemeOperate(
    opt: Record<string, unknown>,
    cb?: (bool: boolean) => unknown,
  ) {
    const { type } = opt
    switch (type) {
      case 'clear':
        list.value = []
        stateList.value = []
        break
      case 'export':
        try {
          await exportImage(chatRef.value, '微信.png')
        } catch (error) {
          console.error(error)
        } finally {
          cb?.(true)
        }
        break
      case 'long_export':
        try {
          await screenshot(chatRef.value, '微信长图.png')
        } catch (error) {
          console.error(error)
        } finally {
          cb?.(true)
        }
        break
      default:
        break
    }
  }

  async function screenshot(dom: HTMLElement, filename: string) {
    const clientHeight = containRef.value.clientHeight
    const scrollHeight = containRef.value.scrollHeight
    const url = await domToPng(dom, {
      scale: 2,
      height: dom.clientHeight + scrollHeight - clientHeight,
      onCloneNode: function (cloned: any) {
        if (scrollHeight > clientHeight) {
          cloned.querySelector('.chat-container').style['overflow'] = 'initial'
          cloned.querySelector('.chat-container').style['height'] = 'initial'
        }
      },
    })
    saveAs(url, filename)
  }

  function onTime(time: number) {
    addListItem({
      role: 'system',
      type: 'time',
      time: time,
    })
  }

  function onObjectOperate(opt: Record<string, unknown>) {
    const { type, value, role, status, user } = opt
    switch (type) {
      case 'input':
        addListItem({
          user: user,
          role: role,
          message: value,
          status: status,
        })
        if (status === 1) {
          addListItem({
            role: 'system',
            type: 'rejected',
          })
        }
        if (status === 2) {
          addListItem({
            role: 'system',
            type: 'delete',
          })
        }

        break
      case 'image':
        addListItem({
          role: role,
          type: 'image',
          user: user,
          url: value,
        })

        break
      case 'hongbao':
        addListItem({
          role: role,
          user: user,
          type: 'hongbao',
        })

        break
      case 'payment':
        addListItem({
          role: role,
          type: 'payment',
          user: user,
          price: value,
        })
        break
      case 'audio':
        addListItem({
          role: role,
          type: 'yuyin',
          user: user,
          minute: value,
          isNew: true,
        })
        break
      case 'video':
        addListItem({
          role: role,
          type: 'video',
          user: user,
          status: status,
          time: value,
        })
        break
      case 'paiyipai':
        addListItem({
          role: 'system',
          type: 'paiyipai',
          status: status,
        })
        break
      case 'delete':
        addListItem({
          role: 'system',
          type: 'delete',
        })
        break
      case 'add':
        addListItem({
          role: 'user',
          user: user,
          message: '我是' + username.value,
        })
        addListItem({
          role: 'system',
          type: 'add',
        })
        break
    }
  }

  const editorRef = ref()
  function onSave() {
    const bool = editorRef.value.validate()
    if (bool) {
      const value = editorRef.value.getValue()
      list.value = JSON.parse(value)
    } else {
      showFailToast('元数据没有正确格式化！')
    }
  }

  const currentShellConfig = ref<Record<string, unknown>>({
    system: 'ios',
    battery: 100,
    signal: 4,
    wifi: 3,
    g: '5G',
    enable_wifi: true,
    enable_battery: false,
  })

  const date = new Date()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const currentTime = ref([
    hour < 10 ? '0' + hour : hour,
    minute < 10 ? '0' + minute : minute,
  ])

  const system = ref('ios')

  function onShellConfig(config: Record<string, unknown>) {
    currentShellConfig.value = config
  }

  const isDisturb = ref(false)
</script>

<style lang="scss" scoped>
  @use '~/style/common/mixin' as *;

  .chat-container {
    @include scrollbar;
  }

  /* stylelint-disable-next-line selector-class-pattern */
  :deep(.van-tabs__wrap) {
    @apply sticky top-0 bg-default z-9999;
  }
</style>
