import { memo, useEffect, useId, useRef, type HTMLAttributes } from 'react'

import './DotField.css'

type BinaryValue = 0 | 1

type BinaryGlyph = {
  ax: number
  ay: number
  sx: number
  sy: number
  vx: number
  vy: number
  x: number
  y: number
  value: BinaryValue
}

type DotFieldProps = HTMLAttributes<HTMLDivElement> & {
  fontSize?: number
  glyphSpacing?: number
  cursorRadius?: number
  cursorForce?: number
  bulgeOnly?: boolean
  bulgeStrength?: number
  glowRadius?: number
  waveAmplitude?: number
  gradientFrom?: string
  gradientTo?: string
  glowColor?: string
}

const DotField = memo(function DotField({
  fontSize = 10,
  glyphSpacing = 18,
  cursorRadius = 280,
  cursorForce = 0.08,
  bulgeOnly = true,
  bulgeStrength = 24,
  glowRadius = 180,
  waveAmplitude = 0,
  gradientFrom = 'rgba(20, 63, 54, 0.16)',
  gradientTo = 'rgba(119, 201, 194, 0.24)',
  glowColor = 'rgba(119, 201, 194, 0.18)',
  className,
  ...rest
}: DotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glowRef = useRef<SVGCircleElement>(null)
  const glyphsRef = useRef<BinaryGlyph[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 })
  const rafRef = useRef<number | null>(null)
  const sizeRef = useRef({ w: 0, h: 0, offsetX: 0, offsetY: 0 })
  const glowOpacity = useRef(0)
  const engagement = useRef(0)
  const rebuildRef = useRef<(() => void) | null>(null)
  const glowId = `binary-field-glow-${useId().replace(/:/g, '')}`
  const propsRef = useRef({
    fontSize,
    glyphSpacing,
    cursorRadius,
    cursorForce,
    bulgeOnly,
    bulgeStrength,
    waveAmplitude,
    gradientFrom,
    gradientTo,
  })

  propsRef.current = {
    fontSize,
    glyphSpacing,
    cursorRadius,
    cursorForce,
    bulgeOnly,
    bulgeStrength,
    waveAmplitude,
    gradientFrom,
    gradientTo,
  }

  useEffect(() => {
    const resolvedCanvas = canvasRef.current
    const glowElement = glowRef.current
    if (resolvedCanvas === null) return
    const canvas: HTMLCanvasElement = resolvedCanvas

    const resolvedContext = canvas.getContext('2d', { alpha: true })
    if (resolvedContext === null) return
    const context: CanvasRenderingContext2D = resolvedContext

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2)
    let resizeTimer: ReturnType<typeof setTimeout> | undefined
    let speedInterval: ReturnType<typeof setInterval> | undefined
    let frameCount = 0

    function buildGlyphs(width: number, height: number) {
      const props = propsRef.current
      const step = props.fontSize + props.glyphSpacing
      const columns = Math.ceil(width / step) + 1
      const rows = Math.ceil(height / step) + 1
      const padX = (width % step) / 2 - step / 2
      const padY = (height % step) / 2 - step / 2
      const glyphs = new Array<BinaryGlyph>(rows * columns)
      let index = 0

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const anchorX = padX + column * step + step / 2
          const anchorY = padY + row * step + step / 2
          const value = ((row * 7 + column * 11 + row * column) % 5 > 1 ? 1 : 0) as BinaryValue

          glyphs[index] = {
            ax: anchorX,
            ay: anchorY,
            sx: anchorX,
            sy: anchorY,
            vx: 0,
            vy: 0,
            x: anchorX,
            y: anchorY,
            value,
          }
          index += 1
        }
      }

      glyphsRef.current = glyphs
    }

    function renderFrame(scheduleNextFrame: boolean) {
      frameCount += 1
      const glyphs = glyphsRef.current
      const mouse = mouseRef.current
      const { w: width, h: height } = sizeRef.current
      const props = propsRef.current
      const elapsed = frameCount * 0.02

      const targetEngagement = Math.min(mouse.speed / 5, 1)
      engagement.current += (targetEngagement - engagement.current) * 0.06
      if (engagement.current < 0.001) engagement.current = 0
      const activeEngagement = engagement.current

      glowOpacity.current += (activeEngagement - glowOpacity.current) * 0.08

      if (glowElement) {
        glowElement.setAttribute('cx', String(mouse.x))
        glowElement.setAttribute('cy', String(mouse.y))
        glowElement.style.opacity = String(glowOpacity.current)
      }

      context.clearRect(0, 0, width, height)

      const gradient = context.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, props.gradientFrom)
      gradient.addColorStop(1, props.gradientTo)
      context.fillStyle = gradient
      context.font = `600 ${props.fontSize}px "IBM Plex Mono", monospace`
      context.textAlign = 'center'
      context.textBaseline = 'middle'

      const cursorRadiusSquared = props.cursorRadius * props.cursorRadius

      glyphs.forEach((glyph, index) => {
        const deltaX = mouse.x - glyph.ax
        const deltaY = mouse.y - glyph.ay
        const distanceSquared = deltaX * deltaX + deltaY * deltaY
        const isWithinCursor = distanceSquared < cursorRadiusSquared && activeEngagement > 0.01
        let proximity = 0

        if (isWithinCursor) {
          const distance = Math.sqrt(distanceSquared)
          proximity = 1 - distance / props.cursorRadius

          if (props.bulgeOnly) {
            const push = proximity * proximity * props.bulgeStrength * activeEngagement
            const angle = Math.atan2(deltaY, deltaX)
            glyph.sx += (glyph.ax - Math.cos(angle) * push - glyph.sx) * 0.15
            glyph.sy += (glyph.ay - Math.sin(angle) * push - glyph.sy) * 0.15
          } else {
            const angle = Math.atan2(deltaY, deltaX)
            const movement = (500 / Math.max(distance, 1)) * (mouse.speed * props.cursorForce)
            glyph.vx += Math.cos(angle) * -movement
            glyph.vy += Math.sin(angle) * -movement
          }
        } else if (props.bulgeOnly) {
          glyph.sx += (glyph.ax - glyph.sx) * 0.1
          glyph.sy += (glyph.ay - glyph.sy) * 0.1
        }

        if (!props.bulgeOnly) {
          glyph.vx *= 0.9
          glyph.vy *= 0.9
          glyph.x = glyph.ax + glyph.vx
          glyph.y = glyph.ay + glyph.vy
          glyph.sx += (glyph.x - glyph.sx) * 0.1
          glyph.sy += (glyph.y - glyph.sy) * 0.1
        }

        let drawX = glyph.sx
        let drawY = glyph.sy

        if (props.waveAmplitude > 0) {
          drawY += Math.sin(glyph.ax * 0.03 + elapsed) * props.waveAmplitude
          drawX += Math.cos(glyph.ay * 0.03 + elapsed * 0.7) * props.waveAmplitude * 0.5
        }

        const flipPhase = Math.floor(frameCount / 9)
        const shouldFlip = isWithinCursor && proximity > 0.38 && (index + flipPhase) % 7 === 0
        const displayedValue = shouldFlip ? (glyph.value === 1 ? 0 : 1) : glyph.value

        context.fillText(String(displayedValue), drawX, drawY)
      })

      if (scheduleNextFrame) {
        rafRef.current = window.requestAnimationFrame(() => renderFrame(true))
      }
    }

    function resizeCanvas() {
      const parent = canvas.parentElement
      if (!parent) return

      const rect = parent.getBoundingClientRect()
      const width = rect.width
      const height = rect.height

      canvas.width = width * devicePixelRatio
      canvas.height = height * devicePixelRatio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)

      sizeRef.current = {
        w: width,
        h: height,
        offsetX: rect.left + window.scrollX,
        offsetY: rect.top + window.scrollY,
      }

      buildGlyphs(width, height)
      if (reducedMotion) renderFrame(false)
    }

    function queueResize() {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resizeCanvas, 100)
    }

    function updateMouse(event: MouseEvent) {
      const size = sizeRef.current
      mouseRef.current.x = event.pageX - size.offsetX
      mouseRef.current.y = event.pageY - size.offsetY
    }

    function updateMouseSpeed() {
      const mouse = mouseRef.current
      const deltaX = mouse.prevX - mouse.x
      const deltaY = mouse.prevY - mouse.y
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      mouse.speed += (distance - mouse.speed) * 0.5
      if (mouse.speed < 0.001) mouse.speed = 0
      mouse.prevX = mouse.x
      mouse.prevY = mouse.y
    }

    resizeCanvas()
    window.addEventListener('resize', queueResize)

    if (!reducedMotion) {
      window.addEventListener('mousemove', updateMouse, { passive: true })
      speedInterval = setInterval(updateMouseSpeed, 20)
      rafRef.current = window.requestAnimationFrame(() => renderFrame(true))
    }

    rebuildRef.current = () => {
      const { w: width, h: height } = sizeRef.current
      if (width > 0 && height > 0) {
        buildGlyphs(width, height)
        if (reducedMotion) renderFrame(false)
      }
    }

    return () => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current)
      if (speedInterval) clearInterval(speedInterval)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', queueResize)
      window.removeEventListener('mousemove', updateMouse)
    }
  }, [])

  useEffect(() => {
    rebuildRef.current?.()
  }, [fontSize, glyphSpacing])

  return (
    <div className={['dot-field-container', className].filter(Boolean).join(' ')} {...rest}>
      <canvas ref={canvasRef} aria-hidden="true" />
      <svg aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id={glowId}>
            <stop offset="0%" stopColor={glowColor} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle
          ref={glowRef}
          cx="-9999"
          cy="-9999"
          r={glowRadius}
          fill={`url(#${glowId})`}
          style={{ opacity: 0, willChange: 'opacity' }}
        />
      </svg>
    </div>
  )
})

export default DotField
