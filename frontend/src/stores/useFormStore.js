import { defineStore } from "pinia";

export const useFormStore = defineStore("form", {
  state: () => ({
    selectedOption1: localStorage.getItem("selectedOption1") || "nao1",
    selectedOption2: localStorage.getItem("selectedOption2") || "nao2",
    selectedOption3: localStorage.getItem("selectedOption3") || "Casado",
    selectedOption4: localStorage.getItem("selectedOption4") || "sim3",
    selectedOption5: localStorage.getItem("selectedOption5") || "nao5",
    selectedOption6: localStorage.getItem("selectedOption6") || "nao6",
    selectedOption7: localStorage.getItem("selectedOption7") || "nao7",
    selectedOption8: localStorage.getItem("selectedOption8") || "nao8",
    selectedOption9: localStorage.getItem("selectedOption9") || "nao9",
    checked: localStorage.getItem("checked") === "true",
    checked2: localStorage.getItem("checked2") === "true",
    checked3: localStorage.getItem("checked3") === "true",
    checked4: localStorage.getItem("checked4") === "true",
    checked5: localStorage.getItem("checked5") === "true",
    checked6: localStorage.getItem("checked6") === "true",
    otherInputs: JSON.parse(localStorage.getItem("otherInputs")) || {},
  }),
  actions: {
    updateOtherInput(id, value) {
      this.otherInputs[id] = value;
      localStorage.setItem("otherInputs", JSON.stringify(this.otherInputs));
    },
    updateSelection(key, value) {
      this[key] = value;
      localStorage.setItem(key, value);
    },
    updateCheckbox(key, value) {
      this[key] = value;
      localStorage.setItem(key, value);
    },
  },
});
