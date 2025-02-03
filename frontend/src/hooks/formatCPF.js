import { ref, watch } from "vue";

export const cpf = ref("");

export function formatCPF(value) {
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  return value;
};

watch(cpf, (newValue) => {
  cpf.value = formatCPF(newValue);
});