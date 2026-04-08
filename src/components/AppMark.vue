<template>
  <span class="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-neon/25 bg-[linear-gradient(145deg,rgba(7,19,37,0.96),rgba(16,47,80,0.92),rgba(28,88,96,0.9))] text-white shadow-[0_16px_32px_rgba(10,22,40,0.2)] sm:h-11 sm:w-11">
    <svg
      viewBox="0 0 44 44"
      class="h-7 w-7 sm:h-8 sm:w-8"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="app-mark-gradient"
          x1="7"
          y1="7"
          x2="37"
          y2="37"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stop-color="#66E4FF"
          />
          <stop
            offset="1"
            stop-color="#8BF0D9"
          />
        </linearGradient>
      </defs>

      <path
        d="M12 12.5H23.5L18.5 20.5H12V12.5Z"
        fill="url(#app-mark-gradient)"
      />
      <path
        d="M20.5 23.5H32V31.5H20.5L25.5 23.5Z"
        fill="url(#app-mark-gradient)"
        opacity="0.92"
      />
      <path
        d="M23 12.5H32L21 31.5H12L23 12.5Z"
        fill="none"
        stroke="white"
        stroke-width="2.6"
        stroke-linejoin="round"
      />
    </svg>
  </span>
</template>
