<template>
  <div
    class="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-valentine-100 via-pink-100 to-valentine-200"
  >
    <FloatingHearts />
    <main class="relative z-10 w-full max-w-[500px] flex items-center justify-center">
      <slot />
    </main>
  </div>
</template>
