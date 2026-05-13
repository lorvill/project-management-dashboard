<script setup lang="ts">
import authCover from '@/assets/images/bg-auth.jpg'
</script>

<template>
  <div class="h-dvh w-full bg-linear-to-br from-gray-100 via-gray-400 to-[#cfdaec] p-4">
    <div
        class="grid h-full w-full grid-cols-1 gap-4 overflow-hidden rounded-3xl bg-white/80 p-4.5 lg:grid-cols-[560px_minmax(0,1fr)]"
    >
      <section
          class="relative hidden h-full min-h-0 flex-col justify-between overflow-hidden rounded-3xl p-7 lg:flex"
          :style="{
        backgroundImage: `url(${authCover})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }"
      >
        <div class="flex items-center gap-2">
        <span class="text-3xl font-black text-white">
          DASHBY
        </span>
        </div>

        <div class="max-w-auto mx-auto">
          <p class="mb-5 ml-1 text-[23px] font-normal text-[#2b2b2b]">You can easily</p>
          <h1 class="text-5xl mb-8 font-normal text-black">
            get access your personal hub for clarity and productivity.
          </h1>
        </div>
      </section>

      <section class="min-h-0 rounded-3xl flex items-center justify-center bg-white px-4 py-8 lg:px-10 overflow-y-auto">
        <slot />
      </section>
    </div>
  </div>
</template>
