import { ref, watch } from "vue";

export function useFormatPhoneTra() {
  const phoneTra = ref("");
  const formattedPhoneTra = ref("");

  const formatPhoneTra = () => {
    let value = phoneTra.value.replace(/\D/g, "");

    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    if (value.length <= 2) {
      formattedPhoneTra.value = `(${value}`;
    } else if (value.length <= 7) {
      formattedPhoneTra.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else {
      formattedPhoneTra.value = `(${value.slice(0, 2)}) ${value.slice(
        2,
        7
      )}-${value.slice(7)}`;
    }

    phoneTra.value = formattedPhoneTra.value;
  };

  watch(formattedPhoneTra, (newValue) => {
    phoneTra.value = newValue.replace(/\D/g, "");
  });

  return {
    phoneTra,
    formattedPhoneTra,
    formatPhoneTra,
  };
}

export function useFormatPhoneCel() {
  const phoneCel = ref("");
  const formattedPhoneCel = ref("");

  const formatPhoneCel = () => {
    let value = phoneCel.value.replace(/\D/g, "");

    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    if (value.length <= 2) {
      formattedPhoneCel.value = `(${value}`;
    } else if (value.length <= 7) {
      formattedPhoneCel.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else {
      formattedPhoneCel.value = `(${value.slice(0, 2)}) ${value.slice(
        2,
        7
      )}-${value.slice(7)}`;
    }

    phoneCel.value = formattedPhoneCel.value;
  };

  watch(formattedPhoneCel, (newValue) => {
    phoneCel.value = newValue.replace(/\D/g, "");
  });

  return {
    phoneCel,
    formattedPhoneCel,
    formatPhoneCel,
  };
}

export function useFormatPhoneRes() {
  const phoneRes = ref("");
  const formattedPhoneRes = ref("");

  const formatPhoneRes = () => {
    let value = phoneRes.value.replace(/\D/g, "");

    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    if (value.length <= 2) {
      formattedPhoneRes.value = `(${value}`;
    } else if (value.length <= 7) {
      formattedPhoneRes.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else {
      formattedPhoneRes.value = `(${value.slice(0, 2)}) ${value.slice(
        2,
        7
      )}-${value.slice(7)}`;
    }

    phoneRes.value = formattedPhoneRes.value;
  };

  watch(formattedPhoneRes, (newValue) => {
    phoneRes.value = newValue.replace(/\D/g, "");
  });

  return {
    phoneRes,
    formattedPhoneRes,
    formatPhoneRes,
  };
}