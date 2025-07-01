// utils/fetchCep.ts
export const fetchAddressByCep = async (cep: string) => {
  const cleanedCep = cep.replace(/\D/g, '');
  if (cleanedCep.length !== 8) return null;

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
    const data = await response.json();
    if (data.erro) return null;
    return data;
  } catch (error) {
    console.error('Erro ao buscar o CEP:', error);
    return null;
  }
};
