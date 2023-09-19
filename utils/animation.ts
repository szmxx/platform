export function linear(
  time: number,
  begin: number,
  end: number,
  duration: number,
) {
  return begin + (end - begin) * (time / duration)
}
export function easeIn(
  time: number,
  begin: number,
  end: number,
  duration: number,
) {
  return begin + (end - begin) * (time /= duration) * time
}
export function easeOut(
  time: number,
  begin: number,
  end: number,
  duration: number,
) {
  return -(end - begin) * (time /= duration) * (time - 2) + begin
}
export function easeInOut(
  time: number,
  begin: number,
  end: number,
  duration: number,
) {
  // eslint-disable-next-line no-cond-assign
  if ((time /= duration / 2) < 1)
    return ((end - begin) / 2) * time * time + begin

  return (-(end - begin) / 2) * (--time * (time - 2) - 1) + begin
}

export function easeInCubic(
  time: number,
  begin: number,
  end: number,
  duration: number,
) {
  return begin + (end - begin) * (time /= duration) * time * time
}

export function getAnimationByType(type: string) {
  switch (type) {
    case 'ease-in':
      return easeIn
    case 'ease-out':
      return easeOut
    case 'linear':
      return linear
    case 'ease-in-out':
      return easeInOut
    case 'ease-in-cubic':
      return easeInCubic
  }
}
