import { ref, watch } from "vue";

export function useCep() {
  const cep1 = ref("");
  const cep2 = ref("");
  const cidade1 = ref("");
  const cidade2 = ref("");
  const logradouro1 = ref("");
  const logradouro2 = ref("");
  const formattedCep1 = ref("");
  const formattedCep2 = ref("");

  const formatCep = (cep) => {
    let value = cep.replace(/\D/g, "");

    if (value.length > 8) {
      value = value.slice(0, 8);
    }

    if (value.length <= 5) {
      return value;
    } else {
      return `${value.slice(0, 5)}-${value.slice(5)}`;
    }
  };

  const fetchCepData = async (cepRef, cidadeRef, logradouroRef) => {
    const value = cepRef.value.replace(/\D/g, "");
    const url = `https://viacep.com.br/ws/${value}/json/`;

    try {
      const response = await fetch(url);
      const json = await response.json();

      if (json.logradouro) {
        logradouroRef.value = json.logradouro;
        cidadeRef.value = json.localidade;
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  };

  watch(cep1, (newValue) => {
    formattedCep1.value = formatCep(newValue);
    cep1.value = formattedCep1.value;
  });

  watch(cep2, (newValue) => {
    formattedCep2.value = formatCep(newValue);
    cep2.value = formattedCep2.value;
  });

  return {
    cep1,
    cep2,
    formattedCep1,
    formattedCep2,
    logradouro1,
    logradouro2,
    cidade1,
    cidade2,
    fetchCepData,
  };
}
