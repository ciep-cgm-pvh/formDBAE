<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-4xl font-bold text-green-600 mb-6 animate-fade-in">
      Formulário Concluído com Sucesso!
    </h1>
    <p class="text-lg text-gray-700 mb-8">Obrigado por preencher o formulário.</p>
    <button @click="startConfetti"
      class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300">
      Celebrar Novamente!
    </button>
  </div>
</template>

<script setup>
import confetti from 'canvas-confetti';
import { onMounted } from 'vue';

function startConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}

onMounted(() => {
  startConfetti();
});
</script>

<style>
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 2s ease-in-out;
}
</style>