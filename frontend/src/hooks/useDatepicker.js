import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import { Portuguese } from "flatpickr/dist/l10n/pt";
import { ref } from "vue";

export function useDatepicker() {
  const datepicker1 = ref(null);
  const datepicker2 = ref(null);

  const initializeDatepickers = () => {
    flatpickr(datepicker1.value, {
      dateFormat: "d-m-Y",
      locale: Portuguese,
    });
    flatpickr(datepicker2.value, {
      dateFormat: "d-m-Y",
      locale: Portuguese,
    });
  };

  return {
    datepicker1,
    datepicker2,
    initializeDatepickers,
  };
}
