<template>
  <div class="flex flex-1 py-20 gap-10">
    <div class="w-1/3">
      <video :src="interaction.visual" autoplay loop muted></video>
      <div class="flex justify-between"></div>
    </div>
    <div class="w-1/3 flex flex-col flex-wrap gap-4">
      <div v-for="n in numbers">
        <p class="text-sm uppercase">{{ n.description }}</p>
        <p class="text-8xl" style="line-height: 0.7">{{ n.value }}</p>
      </div>
      <div v-for="p in percents">
        <p class="text-sm uppercase">{{ p.description }}</p>
        <input :value="p.value" min="0" max="100" type="range" disabled />
      </div>
    </div>
    <div class="w-1/3 flex flex-col gap-4">
      <div v-for="t in texts">
        <p class="text-sm uppercase">{{ t.description }}</p>
        <p>{{ t.value }}</p>
      </div>
      <div>
        <p class="text-2xl uppercase">{{ interaction.title }}</p>
        <p class="text-2xl uppercase">{{ interaction.from }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  interaction: {
    type: Object,
    required: true
  }
})

const numbers = computed(() =>
  props.interaction.metrics.filter(
    (m: any) => m.unit !== 'text' && m.unit !== 'percent'
  )
)
const percents = computed(() =>
  props.interaction.metrics.filter((m: any) => m.unit === 'percent')
)
const texts = computed(() =>
  props.interaction.metrics.filter((m: any) => m.unit === 'text')
)
</script>
