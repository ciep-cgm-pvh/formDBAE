export const handleInputNumber = (event) => {
  let input = event.target.value.replace(/\D/g, "");
  const numberAddressInPortoVelho = 5;
  if (input.length > numberAddressInPortoVelho) {
    input = input.slice(0, numberAddressInPortoVelho);
  }
  event.target.value = input;
};

export const handleInputNumber2 = (event) => {
  let input = event.target.value.replace(/\D/g, "");
  const numberAddressInPortoVelho = 5;
  if (input.length > numberAddressInPortoVelho) {
    input = input.slice(0, numberAddressInPortoVelho);
  }
  event.target.value = input;
};
