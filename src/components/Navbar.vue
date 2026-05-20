<template>
  <nav class="border-b border-black bg-primary-bg sticky top-0 z-50">
    <div class="container mx-auto flex justify-between items-stretch">
      <a href="/" class="flex items-center border-black">
        <img src="/logo.svg" class="px-8 py-8" alt="logo" />
      </a>

      <ul class="flex flex-1 justify-end items-stretch">
        <li class="flex items-stretch border-l border-black">
          <div class="flex items-center h-full">
            <input
              type="text"
              placeholder="搜尋作品名稱、藝術家名稱"
              class="w-64 bg-primary-bg text-secondary placeholder:text-secondary focus:outline-none pl-12 pr-6 py-2 text-sm transition"
            />
            <i class="text-xl mr-12 fa-solid fa-magnifying-glass text-black"></i>
          </div>
        </li>

        <li class="flex items-stretch border-l border-black">
          <a
            href="#"
            class="text-black font-bold hover:text-primary transition px-10 h-full flex items-center"
            >探索</a
          >
        </li>

        <li class="flex items-stretch border-l border-black">
          <a
            href="#"
            class="text-black font-black hover:text-primary transition px-10 h-full flex items-center"
            >市值</a
          >
        </li>

        <li class="flex items-stretch border-l border-black">
          <a
            href="#"
            class="text-black text-2xl hover:text-primary transition px-10 h-full flex items-center"
          >
            <i class="fa-solid fa-wallet"></i>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>
