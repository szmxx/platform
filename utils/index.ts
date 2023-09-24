import workerUrl from 'modern-screenshot/worker?url'
import { createContext, destroyContext, domToPng } from 'modern-screenshot'
import { saveAs } from 'file-saver'

export async function exportImage(dom: HTMLElement, filename = '') {
  const res = await screenshot(dom)
  saveAs(res, filename)
}
export async function screenshot(dom: HTMLElement) {
  const context = await createContext(dom, {
    workerUrl: workerUrl as any,
    workerNumber: 1,
  })
  const url = await domToPng(dom, {
    scale: 4,
  })
  destroyContext(context)
  return url
}

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function isWechat() {
  return /MicroMessenger/i.test(window.navigator.userAgent)
}

export function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  )
}
