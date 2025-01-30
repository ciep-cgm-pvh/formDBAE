<template>
  <footer class="bg-gray-800 text-white py-4 text-center w-full">
    <p>&copy; {{ currentYear }}. Todos os direitos reservados a CGM - Controladoria Geral do Município.</p>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>
