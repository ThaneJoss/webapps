<template>
  <div
    v-if="enabled"
    class="tech-cursor-layer"
    aria-hidden="true"
  >
    <div
      class="tech-cursor-halo"
      :class="{
        'is-hidden': !visible || hiddenForText,
        'is-active': isPointerDown,
        'is-hovering': isHovering
      }"
      :style="haloStyle"
    ></div>
    <div
      class="tech-cursor-pointer"
      :class="{
        'is-hidden': !visible || hiddenForText,
        'is-active': isPointerDown,
        'is-hovering': isHovering
      }"
      :style="pointerStyle"
    >
      <svg
        viewBox="0 0 32 44"
        class="tech-cursor-svg"
      >
        <path
          d="M4 3.5V32.5L12.8 25.8L17.6 39.5L23.4 37.4L18.6 24L29 24.5L4 3.5Z"
          fill="rgba(9, 17, 31, 0.96)"
          stroke="#66E4FF"
          stroke-width="1.8"
          stroke-linejoin="round"
        />
        <path
          d="M8.5 10.5L23.5 23"
          stroke="#8BF0D9"
          stroke-width="1.5"
          stroke-linecap="round"
          opacity="0.9"
        />
        <path
          d="M14.4 27.8L17.5 36.5"
          stroke="#8BF0D9"
          stroke-width="1.4"
          stroke-linecap="round"
          opacity="0.84"
        />
      </svg>
    </div>

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
const pointerX = ref(0)
const pointerY = ref(0)
const haloX = ref(0)
const haloY = ref(0)
const ripples = ref<Ripple[]>([])

let rippleId = 0
let frameId = 0
let mediaQuery: MediaQueryList | null = null

const pointerStyle = computed(() => ({
  left: `${pointerX.value}px`,
  top: `${pointerY.value}px`
}))

const haloStyle = computed(() => ({
  left: `${haloX.value + 12}px`,
  top: `${haloY.value + 18}px`
}))

const updateEnabled = () => {
  enabled.value = window.matchMedia('(pointer: fine)').matches
  document.body.classList.toggle('tech-cursor-enabled', enabled.value)
}

const animateHalo = () => {
  haloX.value += (pointerX.value - haloX.value) * 0.18
  haloY.value += (pointerY.value - haloY.value) * 0.18
  frameId = window.requestAnimationFrame(animateHalo)
}

const isInteractiveTarget = (target: EventTarget | null) =>
  target instanceof Element &&
  Boolean(target.closest('a, button, [role="button"], .tech-button, .tech-nav-link'))

const isTextTarget = (target: EventTarget | null) =>
  target instanceof Element &&
  Boolean(target.closest('input, textarea, [contenteditable="true"]'))

const handlePointerMove = (event: MouseEvent) => {
  pointerX.value = event.clientX
  pointerY.value = event.clientY
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

  pointerX.value = window.innerWidth / 2
  pointerY.value = window.innerHeight / 2
  haloX.value = pointerX.value
  haloY.value = pointerY.value

  frameId = window.requestAnimationFrame(animateHalo)

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
