<script setup lang="ts">
const hearts = [
  { id: 1, delay: 0, left: 5, size: 16 },
  { id: 2, delay: 2, left: 15, size: 20 },
  { id: 3, delay: 4, left: 25, size: 14 },
  { id: 4, delay: 1, left: 35, size: 18 },
  { id: 5, delay: 5, left: 45, size: 22 },
  { id: 6, delay: 3, left: 55, size: 12 },
  { id: 7, delay: 6, left: 65, size: 19 },
  { id: 8, delay: 2, left: 75, size: 15 },
  { id: 9, delay: 4, left: 85, size: 17 },
  { id: 10, delay: 1, left: 92, size: 13 },
]
</script>

<template>
  <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <span
      v-for="heart in hearts"
      :key="heart.id"
      class="absolute text-valentine-400/40 animate-float-hearts"
      :style="{
        left: `${heart.left}%`,
        fontSize: `${heart.size}px`,
        animationDelay: `${heart.delay}s`,
      }"
      aria-hidden="true"
    >
      ♥
    </span>
  </div>
</template>
