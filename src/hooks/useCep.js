import { ref, watch } from "vue";

export function useCep() {
  const cep1 = ref(localStorage.getItem("cep1") || "");
  const cep2 = ref(localStorage.getItem("cep2") || "");
  const cidade1 = ref(localStorage.getItem("cidade1") || "");
  const cidade2 = ref(localStorage.getItem("cidade2") || "");
  const logradouro1 = ref(localStorage.getItem("logradouro1") || "");
  const logradouro2 = ref(localStorage.getItem("logradouro2") || "");
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
        // Atualiza o localStorage com os novos valores
        localStorage.setItem("logradouro1", logradouroRef.value);
        localStorage.setItem("cidade1", cidadeRef.value);
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  };

  watch(cep1, (newValue) => {
    formattedCep1.value = formatCep(newValue);
    cep1.value = formattedCep1.value;
    localStorage.setItem("cep1", cep1.value); // Atualiza o localStorage
    if (!newValue) {
      cidade1.value = "";
      logradouro1.value = "";
      localStorage.removeItem("cidade1");
      localStorage.removeItem("logradouro1");
    }
  });

  watch(cep2, (newValue) => {
    formattedCep2.value = formatCep(newValue);
    cep2.value = formattedCep2.value;
    localStorage.setItem("cep2", cep2.value); // Atualiza o localStorage
    if (!newValue) {
      cidade2.value = "";
      logradouro2.value = "";
      localStorage.removeItem("cidade2");
      localStorage.removeItem("logradouro2");
    }
  });

  // Adiciona watchers para cidade e logradouro
  watch(cidade1, (newValue) => {
    localStorage.setItem("cidade1", newValue);
  });

  watch(logradouro1, (newValue) => {
    localStorage.setItem("logradouro1", newValue);
  });

  watch(cidade2, (newValue) => {
    localStorage.setItem("cidade2", newValue);
  });

  watch(logradouro2, (newValue) => {
    localStorage.setItem("logradouro2", newValue);
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

export const handleInputCep1 = (cepRef, cidadeRef, logradouroRef) => {
  if (cep1.value.replace(/\D/g, "").length === 8) {
    fetchCepData(cep1, cidade1, logradouro1);
  }
};

export const handleInputCep2 = (cepRef, cidadeRef, logradouroRef) => {
  if (cep2.value.replace(/\D/g, "").length === 8) {
    fetchCepData(cep2, cidade2, logradouro2);
  }
};

// Exporta os valores iniciais do hook
export const {
  cep1,
  cep2,
  logradouro1,
  logradouro2,
  cidade1,
  cidade2,
  fetchCepData,
} = useCep();
