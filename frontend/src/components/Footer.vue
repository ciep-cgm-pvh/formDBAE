<template>
  <footer class="w-full bg-gray-800 text-white py-4 text-center  bottom-0 left-0 right-0 fixed">
    <p>&copy; {{ currentYear }}. Todos os direitos reservados a CGM - Controladoria Geral do Município.</p>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();
</script>