export function useImg(url: string) {
  const $img = useImage()

  const src = $img(
    url,
    {
      format: 'auto',
    },
    {
      provider: 'cloudinary',
    },
  )
  return src
}
