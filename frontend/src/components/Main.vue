<template>
  <div>
    <h1 class="text-lg font-bold justify-center flex mb-8">Anexo I – Formulário de Declaração de Informações de Bens e
      Atividades Econômicas</h1>
    <div class="border-2 flex flex-col items-center justify-center border-zinc-950">
      <h1 class="text-lg font-semibold flex justify-center">DECLARAÇÃO DE BENS E ATIVIDADES ECONÔMICAS OU PROFISSIONAIS
        – DBAE</h1>
      <h4 class="text-sm">( Formulário de acordo com o art. 14 do Decreto n.º 18.270, de 20 de julho de 2022. )</h4>

      <h2 class="mt-7 font-semibold">Atenção: Todos os campos devem ser respondidos.</h2>
      <h2 class="font-semibold">Consulte as normas de preenchimento.</h2>
    </div>
    <div class="border flex flex-col border-zinc-950 mt-8 justify-center items-start">
      <form id="form" class="mt-8 w-full px-4 space-y-10">
        <h1 class="text-lg font-semibold px-4">I - DADOS PESSOAIS</h1>
        <div class="grid grid-cols-3 gap-4">
          <label for="fullName">1. Nome completo: </label>
          <input type="text" id="fullName" class="border border-zinc-950 h-7 col-span-2" />
          <label for="date-input">2. Data de nascimento</label>
          <input ref="datepicker1" class="border border-zinc-950 w-40 placeholder-center centered-input" id="date-input"
            placeholder="dd/mm/yyyy" type="text" />
        </div>
        <div class="grid grid-cols-12 gap-4">
          <label class="col-span-3" for="skill">3. Formação profissional: </label>
          <input type="text" id="skill" class="border border-zinc-950 h-7 col-span-3" />
          <label class="col-span-2 mx-8" for="work">4. Cargo: </label>
          <input type="text" id="work" class="border border-zinc-950 h-7 col-span-3" />
        </div>
        <div class="grid grid-cols-12 gap-4">
          <label class="col-span-2 mt-2" for="position">5. Cargo Efetivo: </label>
          <input type="text" id="position" class="border border-zinc-950 h-7 col-span-2 w-40 mt-2 -mx-6" />
          <label class="col-span-2 w-40 mt-2 -mx-2" for="org">6. Órgão / Entidade: </label>
          <input type="text" id="org" class="border border-zinc-950 h-7 col-span-3 mt-2 uppercase" />
          <div class="flex flex-col -mt-10 ml-8">
            <label class="w-56" for="date-input">7. Data da nomeação/
              <br> designação: </label>
            <input ref="datepicker2" class="border border-zinc-950 w-40 placeholder-center centered-input"
              id="date-input" type="text" placeholder="dd/mm/yyyy" />
          </div>
        </div>
        <div>
          <legend>8. Ocupa outro cargo ou emprego de quadro permanente na Administração Pública?</legend>
          <div class="flex items-center gap-4 justify-around mt-2">
            <div>
              <input type="radio" id="sim1" name="drone1" value="sim1" v-model="selectedOption1" checked />
              <label for="sim1">Sim</label>
            </div>
            <div>
              <input type="radio" id="nao1" name="drone1" value="nao1" v-model="selectedOption1" />
              <label for="nao1">Não</label>
            </div>
            <div v-if="selectedOption1 === 'sim1'">
              <label for="outro1">Qual?</label>
              <input type="text" id="outro1" class="h-7 w-56 mx-2 enabled:border enabled:border-zinc-950"
                :disabled="selectedOption1 !== 'sim1'" />
            </div>
            <div>
              <label class="mx-2" for="name">Órgão/entidade de origem: </label>
              <input type="text" id="name" class="border border-zinc-950 h-7 w-56" />
            </div>
          </div>
        </div>
        <div>
          <legend>9. É membro de Conselho Municipal ou Conselho de Empresa Municipal?</legend>
          <div class="flex gap-4 items-center justify-around mt-2">
            <div>
              <input type="radio" id="sim2" name="drone2" value="sim2" v-model="selectedOption2" checked />
              <label for="sim2">Sim</label>
            </div>
            <div>
              <input type="radio" id="nao2" name="drone2" value="nao2" v-model="selectedOption2" />
              <label for="nao2">Não</label>
            </div>
            <div v-if="selectedOption2 === 'sim2'">
              <label for="outro2" :disabled="selectedOption2 !== 'sim2'">Qual?</label>
              <input type="text" id="outro2" class="h-7 w-56 mx-2 enabled:border enabled:border-zinc-950"
                :disabled="selectedOption2 !== 'sim2'" />
            </div>
          </div>
        </div>
        <div>
          <label for="cep1">10. CEP do trabalho:</label>
          <input v-model="cep1" @input="handleInputCep1" name="cep1" placeholder="D0000-000"
            class="outline-none mx-2" />
          <input v-model="cidade1" name="cidade" placeholder="Cidade" disabled />
          <input v-model="logradouro1" name="rua" placeholder="Rua" disabled />
          <!-- N° -->
          <label for="numberAddress">N°</label>
          <input type="text" class="border border-zinc-950 h-7 mx-2" size="5" id="numberAddress"
            @input="handleInputNumber" />
        </div>
        <div>
          <label for="phone">11. Telefone do trabalho: </label>
          <input type="text" id="phone" v-model="formattedPhone" @input="handleInput" placeholder="(00) 00000-0000"
            maxlength="16">
        </div>
        <div>
          <label for="cep2">12. CEP da residência: </label>
          <input v-model="cep2" @input="handleInputCep2" name="cep2" placeholder="D0000-000" class="outline-none mx-2"
            size="19" />
          <input v-model="cidade2" name="cidade" placeholder="Cidade" disabled />
          <input v-model="logradouro2" name="rua" placeholder="Rua" disabled />
          <!-- N° 2 -->
          <label for="numberAddress2">N°</label>
          <input type="text" class="border border-zinc-950 h-7 mx-2" size="5" id="numberAddress2"
            @input="handleInputNumber2" />
        </div>
        <div>
          <label for="phone">13. Telefone residencial: </label>
          <input type="text" id="phone" v-model="formattedPhone" @input="handleInput" placeholder="(00) 00000-0000"
            maxlength="16">
        </div>
        <div>
          <label for="email">14. E-mail: </label>
          <input type="email" id="email" pattern=".+@example\.com" size="20" required class="border border-zinc-950"
            placeholder=".+@example.com" />
        </div>
        <div>
          <label for="phone">15. Celular: </label>
          <input type="text" id="phone" v-model="formattedPhone" @input="handleInput" placeholder="(00) 00000-0000"
            maxlength="16">
        </div>
        <div>

        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useCep } from './lib/useCep';
import { useDatepicker } from "./lib/useDatepicker";
import { useFormatPhone } from "./lib/useFormatPhone";

export default {
  data() {
    return {
      selectedOption1: null,
      selectedOption2: null
    };
  },
  setup() {

    const {
      datepicker1,
      datepicker2,
      initializeDatepickers
    } = useDatepicker();

    const {
      cep1,
      cep2,
      formattedCep1,
      formattedCep2,
      logradouro1,
      logradouro2,
      cidade1,
      cidade2,
      fetchCepData,
    } = useCep();

    const {
      phone,
      formattedPhone,
      formatPhone
    } = useFormatPhone();

    const handleInputNumber = (event) => {
      let input = event.target.value.replace(/\D/g, '');
      let numberAddressInPortoVelho = 5
      if (input.length > numberAddressInPortoVelho) {
        input = input.slice(0, numberAddressInPortoVelho);
      }
      numberAddress.value = input;
    };

    const handleInputNumber2 = (event) => {
      let input = event.target.value.replace(/\D/g, '');
      let numberAddressInPortoVelho = 5
      if (input.length > numberAddressInPortoVelho) {
        input = input.slice(0, numberAddressInPortoVelho);
      }
      numberAddress2.value = input;
    };

    // Formatting phone
    const handleInput = (event) => {
      phone.value = event.target.value.replace(/\D/g, '');
      formatPhone();
    };
    // Formatting cep
    const handleInputCep1 = () => {
      if (cep1.value.replace(/\D/g, "").length === 8) {
        fetchCepData(cep1, cidade1, logradouro1);
      }
    };

    const handleInputCep2 = () => {
      if (cep2.value.replace(/\D/g, "").length === 8) {
        fetchCepData(cep2, cidade2, logradouro2);
      }
    };

    onMounted(() => {
      initializeDatepickers();
    });

    return {
      // formatting cep
      cep1,
      cep2,
      formattedCep1,
      formattedCep2,
      logradouro1,
      logradouro2,
      cidade1,
      cidade2,
      handleInputCep1,
      handleInputCep2,
      // formatting date
      datepicker1,
      datepicker2,
      // formatting phone
      phone,
      formattedPhone,
      formatPhone,
      handleInput,
      handleInputNumber,
      handleInputNumber2
    };
  }
};
</script>

<style scoped>
.placeholder-center::placeholder {
  text-align: center;
}

.centered-input {
  text-align: center;
}

input#phone {
  font-size: 16px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>