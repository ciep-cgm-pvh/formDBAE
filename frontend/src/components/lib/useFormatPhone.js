import { ref, watch } from "vue";

export function useFormatPhone() {
  const phone = ref("");
  const formattedPhone = ref("");

  const formatPhone = () => {
    let value = phone.value.replace(/\D/g, "");

    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    if (value.length <= 2) {
      formattedPhone.value = `(${value}`;
    } else if (value.length <= 7) {
      formattedPhone.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else {
      formattedPhone.value = `(${value.slice(0, 2)}) ${value.slice(
        2,
        7
      )}-${value.slice(7)}`;
    }

    phone.value = formattedPhone.value;
  };

  watch(formattedPhone, (newValue) => {
    phone.value = newValue.replace(/\D/g, "");
  });

  return {
    phone,
    formattedPhone,
    formatPhone,
  };
}
