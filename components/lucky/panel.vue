<script setup lang="ts">
  const props = defineProps({
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    data: {
      type: Array as PropType<Record<string, unknown>[]>,
      default: () => [],
    },
    spinType: {
      type: String,
      default: 'pointer',
    },
  })
  const emit = defineEmits(['complete', 'update'])
  interface IRing {
    ringWidth: number
    ringColor: string
    numCircles?: number
    circleOddColor?: string
    circleEvenColor?: string
  }
  interface IPointer {
    color: string
    radius: number
    ringWidth: number
    ringColor: string
    text: string
    textColor: string
  }
  interface IText {
    text: string
    angle: number
    textFactor: number
    color: string
    font: string
  }
  interface IPlay {
    time: number
    begin: number
    end: number
    duration: number
    type: 'ease-in-cubic' | 'ease-in' | 'ease-out' | 'linear' | 'ease-in-out'
    callback: (value: number) => void
  }
  const _probabilities = computed(() => {
    return props.data.map((i) => i.weight) as number[]
  })
  const _colors = computed(() => {
    return props.data.map((i) => i.color) as string[]
  })

  const _list = computed(() => {
    return props.data.map((i) => i.name) as string[]
  })

  watch([_list], () => {
    render()
  })

  // 弧度
  const startAngle = ref(0)
  // 转过的角度
  const isSpinning = ref(false)
  const canvas = ref()
  const ctx = ref()
  onMounted(() => {
    ctx.value = canvas.value.getContext('2d')
    watch(
      [_list],
      () => {
        render()
      },
      { immediate: true },
    )
  })

  function render() {
    ctx.value.clearRect(0, 0, props.width, props.height)

    drawOuterRing(ctx.value, {
      ringWidth: 10,
      ringColor: 'rgb(255, 165, 0)',
      numCircles: 18,
      circleOddColor: '#FFF3DA',
      circleEvenColor: '#F8DE22',
    })
    drawPerSector(ctx.value, _list.value, {
      ringColor: 'rgba(0,0,0,0.1)',
      ringWidth: 10,
    })
    drawPointer(ctx.value, {
      color: 'rgba(255,255,255, 1)',
      radius: 40,
      ringWidth: 8,
      ringColor: 'rgb(245, 245, 245)',
      text: '奖',
      textColor: 'rgb(255, 102, 102)',
    })
  }

  // 绘制外环
  function drawOuterRing(ctx: CanvasRenderingContext2D, options: IRing) {
    const width = props.width
    const height = props.height
    // 外环
    const {
      ringWidth,
      ringColor,
      numCircles = 18,
      circleOddColor = '#fff',
      circleEvenColor = '#000',
    } = options || {}
    const centerX = width / 2
    const centerY = height / 2
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = ringColor
    ctx.arc(centerX, centerY, centerX, 0, 2 * Math.PI, false)
    ctx.closePath()
    ctx.fill()
    // 环上圆点
    const angleIncrement = (2 * Math.PI) / numCircles
    const radius = centerX - ringWidth
    for (let i = 0; i < numCircles; i++) {
      const angle = i * angleIncrement
      const circleX = centerX + radius * Math.cos(angle)
      const circleY = centerY + radius * Math.sin(angle)
      ctx.beginPath()
      ctx.arc(circleX, circleY, ringWidth / 2, 0, 2 * Math.PI)
      if (i % 2 === 0) ctx.fillStyle = circleOddColor
      else ctx.fillStyle = circleEvenColor
      ctx.fill()
    }
    ctx.restore()
  }

  // 绘制指针
  function drawPointer(ctx: CanvasRenderingContext2D, options: IPointer) {
    const width = props.width
    const height = props.height
    const spinType = props.spinType
    const { color, radius, ringWidth, ringColor, text, textColor } = options
    const centerX = width / 2
    const centerY = height / 2
    // 指针旋转角度
    const rotateAngle = spinType === 'pointer' ? startAngle.value : 0
    // 绘制外圆
    ctx.save()
    ctx.fillStyle = color as string
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, (360 * Math.PI) / 180)
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
    ctx.shadowBlur = 10
    ctx.shadowOffsetX = 1
    ctx.shadowOffsetY = 1
    ctx.fill()
    ctx.restore()

    // 绘制内圆
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius - 10, 0, 2 * Math.PI)
    ctx.lineWidth = ringWidth
    ctx.strokeStyle = ringColor
    ctx.stroke()

    // 绘制文字
    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.rotate(rotateAngle)
    ctx.font = '28px Arial'
    ctx.fillStyle = textColor
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text as string, 0, 0)
    ctx.restore()

    // 绘制指针箭头
    ctx.save()
    const arrowX =
      centerX + (radius + 15) * Math.cos(rotateAngle - (90 * Math.PI) / 180)
    const arrowY =
      centerY + (radius + 15) * Math.sin(rotateAngle - (90 * Math.PI) / 180)
    ctx.beginPath()
    ctx.moveTo(arrowX, arrowY)
    ctx.arc(
      arrowX,
      arrowY,
      18,
      rotateAngle + 60 * (Math.PI / 180),
      rotateAngle + 120 * (Math.PI / 180),
      false,
    )
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)'
    ctx.shadowBlur = 1
    ctx.shadowOffsetX = Math.cos(rotateAngle - (90 * Math.PI) / 180)
    ctx.shadowOffsetY = 1 * Math.sin(rotateAngle - (90 * Math.PI) / 180)
    ctx.fillStyle = color as string
    ctx.fill()
    ctx.restore()
  }

  // 绘制扇形文字
  function drawText(ctx: CanvasRenderingContext2D, options: IText) {
    const width = props.width
    const height = props.height
    const { angle, color, font } = options
    let text = options.text
    const textFactor = options.textFactor
    let textOffset = 70
    const { width: textWidth } = ctx.measureText(text)
    const count = textWidth / text.length
    if (textWidth > 40) {
      if (textFactor > 1.5) {
        text = `${text.slice(0, 40 / count)}...`
        textOffset = 75
      } else if (textFactor > 1.2) {
        text = `${text.slice(0, 40 / count + 1)}...`
        textOffset = 70
      } else {
        text = `${text.slice(0, 40 / count + 2)}...`
        textOffset = 65
      }
    } else if (textWidth > 30) {
      textOffset = 95
    } else if (textWidth > 20) {
      textOffset = 110
    } else if (textWidth > 10) {
      textOffset = 120
    } else {
      textOffset = 130
    }
    textOffset /= textFactor

    const centerX = width / 2
    const centerY = height / 2
    const textX = centerX + textOffset * Math.cos(angle)
    const textY = centerY + textOffset * Math.sin(angle)

    ctx.save()
    ctx.translate(textX, textY)
    ctx.rotate(angle)

    ctx.font = font
    ctx.fillStyle = color
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle' // 设置文字垂直居中对齐
    ctx.fillText(text, 0, 0)
    ctx.restore()
  }

  // 绘制每片扇形
  function drawPerSector(
    ctx: CanvasRenderingContext2D,
    chunks: string[],
    options: IRing,
  ) {
    const width = props.width
    const height = props.height
    const probabilities = _probabilities.value
    const spinType = props.spinType
    const colors = _colors.value

    const { ringWidth, ringColor } = options || {}
    const centerX = width / 2
    const centerY = height / 2
    const totalProbabilities = probabilities.reduce((a, b) => a + b, 0)
    // 初始化角度
    let accumulatedAngle = spinType === 'panel' ? startAngle.value : 0
    ctx.save()
    const radius = centerX - ringWidth * 2
    let fontSize = 12
    if (chunks.length >= 20) fontSize = 12
    else if (chunks.length >= 16) fontSize = 14
    else if (chunks.length >= 12) fontSize = 16
    else if (chunks.length >= 8) fontSize = 18
    else fontSize = 20

    chunks.forEach((sector, index) => {
      const sectorAngle =
        (probabilities[index] / totalProbabilities) * 2 * Math.PI

      const endAngle = accumulatedAngle + sectorAngle
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerY, centerY, radius, accumulatedAngle, endAngle, false)
      ctx.closePath()
      ctx.fillStyle = colors[index] // 使用提供的颜色
      ctx.fill()
      drawText(ctx, {
        text: sector,
        angle: (accumulatedAngle + endAngle) / 2,
        color: 'rgb(255, 255, 255, 1)',
        textFactor: fontSize / 12,
        font: `${fontSize}px Arial`,
      })
      accumulatedAngle = endAngle
    })
    // 绘制内圈
    ctx.beginPath()
    ctx.arc(centerY, centerY, radius - ringWidth / 2, 0, 2 * Math.PI)
    ctx.lineWidth = ringWidth
    ctx.strokeStyle = ringColor
    ctx.stroke()
    ctx.restore()
  }

  function spin(options?: IPlay) {
    const spinType = props.spinType
    if (isSpinning.value) return
    isSpinning.value = true

    const {
      time = 0,
      begin = 0,
      type = 'ease-in-out',
      end = getRandomInt(0, 360) * (Math.PI / 180) + 20000 * (Math.PI / 180),
      duration = 3000,
      callback = (value: number) => {
        startAngle.value = value
        switch (spinType) {
          case 'pointer':
            emit('update', getPointerSelectedValue())
            break
          case 'panel':
            emit('update', getPanelSelectedValue())
            break
        }
        render()
      },
    } = options || {}
    play({
      time,
      begin,
      end,
      duration,
      type,
      callback,
    })
  }

  // 启动
  function play(options: IPlay) {
    const spinType = props.spinType

    return new Promise((resolve) => {
      let { time, begin, end, duration, type, callback } = options
      const durNums = Math.ceil(+duration! / 16.7)
      if (!window.requestAnimationFrame) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.requestAnimationFrame = function (fn) {
          setTimeout(fn, 16.7)
        }
      }
      const step = () => {
        const value = getAnimationByType(type)?.(
          time,
          begin,
          end,
          durNums,
        ) as number
        callback(value)
        time++
        if (time <= durNums) {
          window.requestAnimationFrame(step)
        } else {
          switch (spinType) {
            case 'pointer':
              emit('complete', getPointerSelectedValue())
              break
            case 'panel':
              emit('complete', getPanelSelectedValue())
              break
          }
          isSpinning.value = false
          resolve({})
        }
      }
      step()
    })
  }

  function getPanelSelectedValue() {
    const probabilities = _probabilities.value
    const totalProbabilities = probabilities.reduce((a, b) => a + b, 0)
    let accumulatedAngle = 0
    let turnAngle = (startAngle.value / (Math.PI / 180)) % 360
    if (turnAngle < 270) turnAngle = 270 - turnAngle
    else turnAngle = 360 - turnAngle + 270
    for (let i = 0; i < probabilities.length; i++) {
      const sectorAngle = (probabilities[i] / totalProbabilities) * 360
      const endAngle = accumulatedAngle + sectorAngle
      if (accumulatedAngle <= turnAngle && endAngle >= turnAngle)
        return _list.value[i]
      accumulatedAngle = endAngle
    }
    return _list.value[0]
  }

  function getPointerSelectedValue() {
    const probabilities = _probabilities.value
    const totalProbabilities = probabilities.reduce((a, b) => a + b, 0)
    let accumulatedAngle = 0
    let angle = (startAngle.value / (Math.PI / 180)) % 360
    if (angle > 90) angle -= 90
    else angle = 270 + angle

    for (let i = 0; i < probabilities.length; i++) {
      const sectorAngle = (probabilities[i] / totalProbabilities) * 360
      const endAngle = accumulatedAngle + sectorAngle
      if (accumulatedAngle <= angle && endAngle >= angle) return _list.value[i]
      accumulatedAngle = endAngle
    }
    return _list.value[0]
  }
</script>

<template>
  <canvas ref="canvas" :width="width" :height="height" @click="spin()" />
</template>
