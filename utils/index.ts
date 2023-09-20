import { toPng } from 'html-to-image'
export async function exportImage(dom: HTMLElement, filename = '') {
  const res = await screenshot(dom)
  download(res, filename)
}
export async function screenshot(dom: HTMLElement) {
  if (isMobileDevice()) {
    let dataUrl = ''
    const minDataLength = 2000000
    let i = 0
    const maxAttempts = 10

    while (dataUrl.length < minDataLength && i < maxAttempts) {
      dataUrl = await toPng(dom, {
        height: dom.scrollHeight,
      })
      i += 1
    }
    return dataUrl
  } else {
    return await toPng(dom, {
      height: dom.scrollHeight,
    })
  }
}

export function download(blobUrl: string, downloadName?: string) {
  const a = document.createElement('a')
  a.download = downloadName!
  a.href = blobUrl
  a.target = '_blank'
  a.click()
  URL.revokeObjectURL(blobUrl)
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
