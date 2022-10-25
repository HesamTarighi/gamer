<template>
  <div class="w-full flex flex-col items-center">
    <article class="w-2/3 space-y-4">
      <h2 class="text-2xl dnSans"> <slot name="title"/> </h2>
      <div class="w-full bg-white px-4 py-4 rounded-xl rounded-tr-none relative text-box">
        <p class="leading-7 opacity-80"> <slot name="description"/> </p>
      </div>
    </article>
  </div>
</template>
