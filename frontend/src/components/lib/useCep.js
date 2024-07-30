import { ref } from "vue";

export function useCep() {
  const cep1 = ref("");
  const cep2 = ref("");
  const cidade1 = ref("");
  const cidade2 = ref("");
  const logradouro1 = ref("");
  const logradouro2 = ref("");

  const fetchCepData1 = async () => {
    const value = cep1.value.replace(/[^0-9]+/, "");
    const url = `https://viacep.com.br/ws/${value}/json/`;

    try {
      const response = await fetch(url);
      const json = await response.json();

      if (json.logradouro) {
        logradouro1.value = json.logradouro;
        cidade1.value = json.localidade;
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  };

  const fetchCepData2 = async () => {
    const value2 = cep2.value.replace(/[^0-9]+/, "");
    const url = `https://viacep.com.br/ws/${value2}/json/`;

    try {
      const response = await fetch(url);
      const json = await response.json();

      if (json.logradouro) {
        logradouro2.value = json.logradouro;
        cidade2.value = json.localidade;
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  };

  return {
    cep1,
    cep2,
    fetchCepData1,
    fetchCepData2,
    logradouro1,
    logradouro2,
    cidade1,
    cidade2,
  };
}
