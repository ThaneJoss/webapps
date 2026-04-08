<template>
  <div
    v-if="enabled"
    class="tech-cursor-layer"
    aria-hidden="true"
  >
    <div
      class="tech-cursor-dot"
      :class="{
        'is-hidden': !visible || hiddenForText,
        'is-active': isPointerDown,
        'is-hovering': isHovering
      }"
      :style="dotStyle"
    ></div>
    <div
      class="tech-cursor-ring"
      :class="{
        'is-hidden': !visible || hiddenForText,
        'is-active': isPointerDown,
        'is-hovering': isHovering
      }"
      :style="ringStyle"
    ></div>

    <span
      v-for="ripple in ripples"
      :key="ripple.id"
      class="tech-click-ripple"
      :style="{
        left: `${ripple.x}px`,
        top: `${ripple.y}px`
      }"
    ></span>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

interface Ripple {
  id: number
  x: number
  y: number
}

const enabled = ref(false)
const visible = ref(false)
const hiddenForText = ref(false)
const isHovering = ref(false)
const isPointerDown = ref(false)
const dotX = ref(0)
const dotY = ref(0)
const ringX = ref(0)
const ringY = ref(0)
const ripples = ref<Ripple[]>([])

let rippleId = 0
let frameId = 0
let mediaQuery: MediaQueryList | null = null

const dotStyle = computed(() => ({
  left: `${dotX.value}px`,
  top: `${dotY.value}px`
}))

const ringStyle = computed(() => ({
  left: `${ringX.value}px`,
  top: `${ringY.value}px`
}))

const updateEnabled = () => {
  enabled.value = window.matchMedia('(pointer: fine)').matches
  document.body.classList.toggle('tech-cursor-enabled', enabled.value)
}

const animateRing = () => {
  ringX.value += (dotX.value - ringX.value) * 0.18
  ringY.value += (dotY.value - ringY.value) * 0.18
  frameId = window.requestAnimationFrame(animateRing)
}

const isInteractiveTarget = (target: EventTarget | null) =>
  target instanceof Element &&
  Boolean(target.closest('a, button, [role="button"], .tech-button, .tech-nav-link'))

const isTextTarget = (target: EventTarget | null) =>
  target instanceof Element &&
  Boolean(target.closest('input, textarea, [contenteditable="true"]'))

const handlePointerMove = (event: MouseEvent) => {
  dotX.value = event.clientX
  dotY.value = event.clientY
  visible.value = true
  hiddenForText.value = isTextTarget(event.target)
  isHovering.value = isInteractiveTarget(event.target)
}

const handlePointerLeave = () => {
  visible.value = false
  isHovering.value = false
  isPointerDown.value = false
}

const handlePointerDown = () => {
  isPointerDown.value = true
}

const handlePointerUp = () => {
  isPointerDown.value = false
}

const handleClick = (event: MouseEvent) => {
  if (isTextTarget(event.target)) {
    return
  }

  const id = rippleId++
  ripples.value = [...ripples.value, { id, x: event.clientX, y: event.clientY }]

  window.setTimeout(() => {
    ripples.value = ripples.value.filter((ripple) => ripple.id !== id)
  }, 650)
}

const handleMediaChange = () => {
  updateEnabled()
}

onMounted(() => {
  updateEnabled()

  if (!enabled.value) {
    return
  }

  mediaQuery = window.matchMedia('(pointer: fine)')

  dotX.value = window.innerWidth / 2
  dotY.value = window.innerHeight / 2
  ringX.value = dotX.value
  ringY.value = dotY.value

  frameId = window.requestAnimationFrame(animateRing)

  window.addEventListener('mousemove', handlePointerMove, { passive: true })
  window.addEventListener('mouseleave', handlePointerLeave)
  window.addEventListener('mousedown', handlePointerDown)
  window.addEventListener('mouseup', handlePointerUp)
  window.addEventListener('click', handleClick, { passive: true })
  mediaQuery.addEventListener('change', handleMediaChange)
})

onBeforeUnmount(() => {
  if (frameId) {
    window.cancelAnimationFrame(frameId)
  }

  window.removeEventListener('mousemove', handlePointerMove)
  window.removeEventListener('mouseleave', handlePointerLeave)
  window.removeEventListener('mousedown', handlePointerDown)
  window.removeEventListener('mouseup', handlePointerUp)
  window.removeEventListener('click', handleClick)
  mediaQuery?.removeEventListener('change', handleMediaChange)
  document.body.classList.remove('tech-cursor-enabled')
})
</script>
