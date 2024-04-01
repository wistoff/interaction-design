<template>
  <div class="w-full flex flex-col items-center">
    <Insight
      class="w-full max-w-[1000px]"
      v-for="interaction in interactions"
      :interaction
    />
  </div>
  <div class="w-full p-2 flex justify-center gap-2 uppercase">
    <p>interactive insights ({{ interactions.length }})</p>
    <a
      href="https://optional.is/required/2014/03/26/meyrin-cern-terminal-font/"
      target="_blank"
    >
      meyrin: cern terminal font
    </a>
  </div>
</template>

<script setup lang="ts">
const { data: interactions } = await useFetch('/api/insights')
console.log(
  'https://optional.is/required/2014/03/26/meyrin-cern-terminal-font/'
)
</script>
