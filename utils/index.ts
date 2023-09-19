/*
 * @Author: cola
 * @Date: 2023-09-12 02:16:28
 * @LastEditors: cola
 * @Description:
 */

import { toPng } from 'html-to-image'

export async function exportImage(dom: HTMLElement, filename = '') {
  const res = await screenshot(dom)
  download(res, filename)
}
export async function screenshot(dom: HTMLElement) {
  const dataUrl = await toPng(dom, {
    height: dom.scrollHeight,
  })
  return dataUrl
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
