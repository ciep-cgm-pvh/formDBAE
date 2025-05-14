import { ref, watch } from "vue";

export const telefone = ref("");
export const telefoneCel = ref("");
export const telefoneRes = ref("");

const formatarTelefone = (valor) => {
  let num = valor.replace(/\D/g, "");

  if (num.length === 0) return "";

  if (num.length > 11) num = num.slice(0, 11);

  if (num.length <= 10) {
    return num.replace(
      /(\d{2})(\d{0,4})(\d{0,4})/,
      (_, ddd, p1, p2) => `(${ddd}${p1 ? `) ${p1}` : ""}${p2 ? `-${p2}` : ""}`
    );
  } else {
    return num.replace(
      /(\d{2})(\d{0,5})(\d{0,4})/,
      (_, ddd, p1, p2) => `(${ddd}${p1 ? `) ${p1}` : ""}${p2 ? `-${p2}` : ""}`
    );
  }
};

watch(telefone, (valor) => {
  telefone.value = formatarTelefone(valor);
});

const formatarTelefoneRes = (valor) => {
  let num = valor.replace(/\D/g, "");

  if (num.length === 0) return "";

  if (num.length > 11) num = num.slice(0, 11);

  if (num.length <= 10) {
    return num.replace(
      /(\d{2})(\d{0,4})(\d{0,4})/,
      (_, ddd, p1, p2) => `(${ddd}${p1 ? `) ${p1}` : ""}${p2 ? `-${p2}` : ""}`
    );
  } else {
    return num.replace(
      /(\d{2})(\d{0,5})(\d{0,4})/,
      (_, ddd, p1, p2) => `(${ddd}${p1 ? `) ${p1}` : ""}${p2 ? `-${p2}` : ""}`
    );
  }
};

watch(telefoneRes, (valor) => {
  telefoneRes.value = formatarTelefoneRes(valor);
});

const formatarTelefoneCel = (valor) => {
  let num = valor.replace(/\D/g, "");

  if (num.length === 0) return "";

  if (num.length > 11) num = num.slice(0, 11);

  if (num.length <= 10) {
    return num.replace(
      /(\d{2})(\d{0,4})(\d{0,4})/,
      (_, ddd, p1, p2) => `(${ddd}${p1 ? `) ${p1}` : ""}${p2 ? `-${p2}` : ""}`
    );
  } else {
    return num.replace(
      /(\d{2})(\d{0,5})(\d{0,4})/,
      (_, ddd, p1, p2) => `(${ddd}${p1 ? `) ${p1}` : ""}${p2 ? `-${p2}` : ""}`
    );
  }
};

watch(telefoneCel, (valor) => {
  telefoneCel.value = formatarTelefoneCel(valor);
});
