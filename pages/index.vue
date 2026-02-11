<script setup lang="ts">
// Change Ashley's name here
const valentineName = 'Ashley'

const hasSaidYes = ref(false)
const hasSaidMaybeLater = ref(false)
// Celebration burst: hearts animate up and fade
const isBursting = ref(false)

const handleYes = () => {
  hasSaidYes.value = true
  isBursting.value = true
  setTimeout(() => {
    isBursting.value = false
  }, 2000)
}

const maybeLaterMessages = [
  "But I love you SO much",
  "You're my sugar snow bunny forever, please please",
  "What if I promise to buy you Chanel one day?",
  "That's okay, I'm still very in love with you.",
]
const maybeLaterIndex = ref(0)

const handleMaybeLater = () => {
  if (hasSaidMaybeLater.value) {
    maybeLaterIndex.value = (maybeLaterIndex.value + 1) % maybeLaterMessages.length
  } else {
    hasSaidMaybeLater.value = true
    maybeLaterIndex.value = 0
  }
}

const restart = () => {
  hasSaidYes.value = false
  hasSaidMaybeLater.value = false
  maybeLaterIndex.value = 0
  creditsScrollable.value = false
  creditsAnimationDone.value = false
  nextTick(() => {
    const viewport = creditsViewportEl.value
    const roll = creditsRollEl.value
    if (viewport && roll) {
      const overflow = Math.max(0, roll.offsetHeight - viewport.clientHeight)
      creditsEndPx.value = -overflow
    }
  })
  setTimeout(enableCreditsScroll, 12000)
}

const creditsScrollable = ref(false)
const creditsViewportEl = ref<HTMLElement | null>(null)
const creditsRollEl = ref<HTMLElement | null>(null)
const creditsEndPx = ref(0)

const creditsAnimationDone = ref(false)
const creditsMinScrollTop = ref(0)

const preventScrollBack = (e: Event) => {
  const viewport = e.target as HTMLElement
  if (viewport.scrollTop < creditsMinScrollTop.value) {
    viewport.scrollTop = creditsMinScrollTop.value
  }
}

const enableCreditsScroll = () => {
  creditsScrollable.value = true
  nextTick(() => {
    const viewport = creditsViewportEl.value
    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight - viewport.clientHeight
      creditsMinScrollTop.value = viewport.scrollTop
    }
    creditsAnimationDone.value = true
  })
}

onMounted(() => {
  nextTick(() => {
    const viewport = creditsViewportEl.value
    const roll = creditsRollEl.value
    if (viewport && roll) {
      const overflow = Math.max(0, roll.offsetHeight - viewport.clientHeight)
      creditsEndPx.value = -overflow
    }
  })
  setTimeout(enableCreditsScroll, 12000)
})

// Celebration burst hearts - fan pattern positions (relative to center)
const burstHearts = Array.from({ length: 18 }, (_, i) => {
  const angle = (i / 18) * 360 - 90
  const dist = 40 + (i % 3) * 25
  const rad = (angle * Math.PI) / 180
  return {
    id: i,
    x: Math.cos(rad) * dist,
    y: Math.sin(rad) * dist,
    delay: i * 0.05,
  }
})
</script>

<template>
  <section
    class="relative w-full rounded-3xl bg-white/90 backdrop-blur-md shadow-xl p-8 md:p-10 transition-opacity duration-300"
  >
    <!-- Celebration burst: hearts animate up and fade -->
    <template v-if="isBursting">
      <span
        v-for="heart in burstHearts"
        :key="heart.id"
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        :style="{
          marginLeft: `${heart.x}px`,
          marginTop: `${heart.y}px`,
        }"
        aria-hidden="true"
      >
        <span
          class="inline-block text-valentine-500 text-xl animate-burst-hearts"
          :style="{ animationDelay: `${heart.delay}s` }"
        >
          ♥
        </span>
      </span>
    </template>

    <Transition name="fade" mode="out-in">
      <div v-if="!hasSaidYes" key="question" class="text-center space-y-6">
        <h1 class="text-2xl md:text-3xl font-semibold text-valentine-800">
          Will you be my Valentine, {{ valentineName }}?
        </h1>
        <div
          ref="creditsViewportEl"
          class="credits-viewport h-40 md:h-44 transition-[overflow] scroll-smooth"
          :class="creditsScrollable ? 'overflow-y-auto overscroll-contain' : 'overflow-hidden'"
          @scroll="creditsScrollable && preventScrollBack($event)"
        >
          <div
            ref="creditsRollEl"
            class="credits-roll text-valentine-700/90 text-base md:text-lg leading-relaxed text-center px-2"
            :class="{ 'credits-roll-done': creditsAnimationDone }"
            :style="{ '--credits-end': creditsEndPx + 'px' }"
          >
            <p class="whitespace-pre-line">
              Three years with you have filled my life with more love, laughter, and adventure than I ever imagined possible. You breathed life back into me and turned every moment — from our picnics to our travels — into something beautiful. You make every season feel like home, every day like an adventure, and every touch (even your little bites) a reminder of your love.

              You are my heart, my peace, my greatest blessing. I love you more deeply than words can say.
            </p>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
          <button
            type="button"
            class="px-8 py-3 rounded-xl bg-valentine-500 text-white font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
            @click="handleYes"
          >
            Yes
          </button>
          <button
            type="button"
            class="px-8 py-3 rounded-xl border-2 border-valentine-300 text-valentine-700 font-medium hover:bg-valentine-50 transition-colors duration-200"
            @click="handleMaybeLater"
          >
            Maybe later
          </button>
        </div>

        <p
          v-if="hasSaidMaybeLater"
          class="text-valentine-600 text-sm pt-2"
        >
          {{ maybeLaterMessages[maybeLaterIndex] }}
        </p>
      </div>

      <div v-else key="success" class="text-center space-y-6 py-4">
        <h2 class="text-2xl md:text-3xl font-semibold text-valentine-600">
          Yay!
        </h2>
        <p class="text-valentine-700/90 text-base md:text-lg leading-relaxed">
          You just made my day. I can't wait for our Valentine's date.
        </p>
        <button
          type="button"
          class="text-sm text-valentine-600 hover:text-valentine-700 underline underline-offset-2 bg-transparent border-none cursor-pointer"
          @click="restart"
        >
          Ask again
        </button>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Movie credits: starts blank, text scrolls smoothly up through the whole message */
@keyframes creditsRoll {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(var(--credits-end, 0));
  }
}
.credits-viewport {
  position: relative;
  /* Hide scrollbar so handoff from animation to scroll doesn’t cause a jump */
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.credits-viewport::-webkit-scrollbar {
  display: none;
}
.credits-roll {
  animation: creditsRoll 12s ease-out forwards;
  transform: translateY(100%);
}
.credits-roll-done {
  animation: none;
  transform: none;
}
</style>
