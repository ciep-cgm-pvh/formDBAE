<template>
  <div class="flex-grow">
    <h1 class=" text-lg font-bold justify-center flex mb-8">
      Anexo I – Formulário de Declaração de Informações de Bens e Atividades
      Econômicas
    </h1>
    <div class="border-2 flex flex-col items-center justify-center border-zinc-950">
      <h1 class="text-lg font-semibold flex justify-center">
        DECLARAÇÃO DE BENS E ATIVIDADES ECONÔMICAS OU PROFISSIONAIS – DBAE
      </h1>
      <h4 class="text-sm">
        ( Formulário de acordo com o art. 14 do Decreto n.º 18.270, de 20 de
        julho de 2022. )
      </h4>

      <h2 class="mt-7 font-semibold">
        Atenção: Todos os campos devem ser respondidos.
      </h2>
      <h2 class="font-semibold">Consulte as normas de preenchimento.</h2>
    </div>
    <div class="border flex flex-col border-zinc-950 mt-8 justify-center items-start">
      <form id="form" class="mt-8 w-full px-4 space-y-10 mb-10">
        <!--! Section 1 -->
        <h1 class="text-lg font-semibold px-4">I - DADOS PESSOAIS</h1>
        <div class="grid grid-cols-14 gap-4">
          <label for="fullName" class="flex items-center">
            1. Nome completo:
            <span class="text-red-500 ml-1">*</span>
          </label>
          <input type="text" id="fullName" class="border-2 border-gray-400 h-7 w-72" required
            @input="handleInputChange" />
          <label for="dataNas" class="mt-4">2. Data de nascimento:
            <span class="text-red-500 ml-1">*</span>
          </label>
          <input id="dataNas" type="date" class="border-b border-gray-400 focus:outline-none text-center w-56"
            @input="handleInputChange">
        </div>
        <div class="grid md:grid-cols-12 gap-4 items-center justify-start">
          <label class="col-span-3" for="skill">3. Formação profissional:
          </label>
          <input type="text" id="skill" class="border border-zinc-950 h-7 col-span-3" @input="handleInputChange" />
          <label class="md:col-span-2 md:mx-8" for="work">4. Cargo: </label>
          <input type="text" id="work" class="border border-zinc-950 h-7 col-span-3" @input="handleInputChange" />
        </div>
        <div class="grid md:grid-cols-12 gap-4 items-center justify-start">
          <label for="position" class="md:col-span-2">5. Cargo Efetivo:
          </label>
          <input type="text" id="position" class="border border-zinc-950 h-7 col-span-3" @input="handleInputChange" />
          <label class="md:col-span-2 md:mx-8" for="org">6. Órgão / Entidade:
          </label>
          <input type="text" id="org" class="border border-zinc-950 h-7 col-span-3 uppercase"
            @input="handleInputChange" />
        </div>
        <div class="grid md:grid-cols-4 items-center justify-start">
          <label for="dataNome" class="mb-1">7. Data da nomeação / designação:</label>
          <input id="dataNome" type="date" class="border-b border-gray-400 focus:outline-none text-center"
            @input="handleInputChange">
        </div>
        <div>
          <legend>
            8. Ocupa outro cargo ou emprego de quadro permanente na
            Administração Pública?
          </legend>
          <div class="md:grid-cols-3 md:grid flex flex-col gap-4 md:justify-around md:items-center mt-2">
            <div>
              <input type="radio" id="sim1" name="drone1" value="sim1" v-model="selectedOption1" />
              <label for="sim1">Sim</label>
            </div>
            <div>
              <input type="radio" id="nao1" name="drone1" value="nao1" v-model="selectedOption1" checked />
              <label for="nao1">Não</label>
            </div>
            <div v-if="selectedOption1 === 'sim1'">
              <label for="outro1">Qual?</label>
              <input type="text" id="outro1" class="h-7 w-56 mx-2 enabled:border enabled:border-zinc-950"
                :disabled="selectedOption1 !== 'sim1'" />
            </div>
            <div>
              <label class="md:mx-2" for="name">Órgão/entidade de origem: </label>
              <input type="text" id="name" class="border border-zinc-950 h-7 w-56" @input="handleInputChange" />
            </div>
          </div>
        </div>
        <div>
          <legend>
            9. É membro de Conselho Municipal ou Conselho de Empresa Municipal?
          </legend>
          <div class="md:grid-cols-3 md:grid flex flex-col gap-4 md:justify-around md:items-center mt-2">
            <div>
              <input type="radio" id="sim2" name="drone2" value="sim2" v-model="selectedOption2" checked />
              <label for="sim2">Sim</label>
            </div>
            <div>
              <input type="radio" id="nao2" name="drone2" value="nao2" v-model="selectedOption2" />
              <label for="nao2">Não</label>
            </div>
            <div v-if="selectedOption2 === 'sim2'">
              <label for="outro2" :disabled="selectedOption2 !== 'sim2'">Qual(is)?
              </label>
              <input type="text" id="outro2" class="h-7 w-56 mx-2 enabled:border enabled:border-zinc-950"
                :disabled="selectedOption2 !== 'sim2'" />
            </div>
          </div>
        </div>
        <div class="grid grid-cols-13 md:grid-cols-3 gap-4 items-center">
          <label for="cep1">10. CEP do trabalho:</label>
          <input v-model="cep1" @input="handleInputCep1" name="cep1" placeholder="00000-000"
            class="outline-none mx-2" />
          <input v-model="cidade1" name="cidade" placeholder="Cidade" disabled />
          <input v-model="logradouro1" name="rua" placeholder="Rua" disabled />
          <!-- N° -->
          <label for="numberAddress">N°</label>
          <input type="text" class="border border-zinc-950 h-7 w-20 text-center" size="5" id="numberAddress"
            @input="handleInputNumber" />
        </div>
        <div>
          <label for="phoneTra">11. Telefone do trabalho: </label>
          <input v-model="telefone" type="tel" placeholder="(99) 99999-9999" id="phoneTra"
            class="border border-gray-300 rounded-lg p-2 focus:outline-none" />
        </div>
        <div class="grid grid-cols-13 md:grid-cols-3 gap-4 items-center">
          <label for="cep2">12. CEP da residência: </label>
          <input v-model="cep2" @input="handleInputCep2" name="cep2" placeholder="00000-000"
            class="outline-none mx-2" />
          <input v-model="cidade2" name="cidade" placeholder="Cidade" disabled />
          <input v-model="logradouro2" name="rua" placeholder="Rua" disabled />
          <label for="numberAddress2">N°</label>
          <input type="text" class="border border-zinc-950 h-7 w-20 text-center" size="5" id="numberAddress2"
            @input="handleInputNumber2" />
        </div>
        <div>
          <label for="telefoneRes">13. Telefone residencial: </label>
          <input v-model="telefoneRes" type="tel" placeholder="(99) 99999-9999" id="telefoneRes"
            class="border border-gray-300 rounded-lg p-2 focus:outline-none" />
        </div>
        <div class="md:grid-cols-4 grid gap-4 items-center justify-start">
          <label for="email">14. E-mail: </label>
          <input type="email" id="email" size="20" placeholder=".+@example.com" @input="handleInputChange" />
          <label for="telefoneCel">15. Celular: </label>
          <input v-model="telefoneCel" type="tel" placeholder="(99) 99999-9999" id="telefoneCel"
            class="border border-gray-300 rounded-lg p-2 focus:outline-none" />
        </div>
        <div>
          <label>16. Endereço para correspondências: </label>
          <div class="flex items-center gap-4">
            <div>
              <input type="radio" id="Residencial" name="address" value="Residencial" checked
                @input="handleInputChange" />
              <label for="Residencial"> Residencial</label>
            </div>
            <div>
              <input type="radio" id="Trabalho" name="address" value="Trabalho" @input="handleInputChange" />
              <label for="Trabalho"> Trabalho</label>
            </div>
          </div>
        </div>
        <div>
          <label>17. Estado Civil </label>
          <div class="md:grid-cols-3 md:grid flex flex-col gap-4 md:justify-around md:items-center mt-2">
            <div>
              <input type="radio" id="Casado" name="civil" value="Casado" v-model="selectedOption3" checked />
              <label for="Casado"> Casado</label>
            </div>
            <div>
              <input type="radio" id="Solteiro" name="civil" v-model="selectedOption3" value="Solteiro" />
              <label for="Solteiro"> Solteiro</label>
            </div>
            <div>
              <input type="radio" id="outro3" name="civil" v-model="selectedOption3" value="outro3" />
              <label for="outro3"> Outros:</label>
            </div>
            <div v-if="selectedOption3 === 'outro3'">
              <label for="out">Qual?</label>
              <input type="text" id="out" class="h-7 w-56 mx-2 enabled:border enabled:border-zinc-950"
                :disabled="selectedOption3 !== 'outro3'" />
            </div>
          </div>
        </div>
        <div class="md:grid-cols-3 md:grid flex flex-col gap-4 md:justify-around md:items-center mt-2">
          <label class="col-span-3" for="skill2">18. Cônjuge /Companheiro (a)</label>
          <input type="text" id="skill2" class="border border-zinc-950 h-7 col-span-3" @input="handleInputChange" />
          <label class="md:col-span-5" for="work2">19. Atividade profissional do cônjuge</label>
          <input type="text" id="work2" class="border border-zinc-950 h-7 col-span-3" @input="handleInputChange" />
        </div>
        <!--! Section 2 -->
        <div>
          <h1 class="text-lg font-semibold">
            II - ATIVIDADE(S) ANTERIOR(ES) -
            <span class="text-sm font-medium">Atividades exercidas nos últimos 12 meses antes da posse
              atual</span>
          </h1>
        </div>
        <div class="md:grid md:grid-cols-3 gap-4">
          <div>
            <label for="atividade" class="block mb-2">20. Atividade</label>
            <input id="atividade" type="text" class="w-full p-2 border border-gray-300 rounded mb-4"
              @input="handleInputChange" />
            <input type="text" class="w-full p-2 border border-gray-300 rounded" @input="handleInputChange" />
          </div>
          <div>
            <label for="orgao" class="block mb-2">21. Órgão, Empresa, etc.</label>
            <input id="orgao" type="text" class="w-full p-2 border border-gray-300 rounded mb-4"
              @input="handleInputChange" />
            <input type="text" class="w-full p-2 border border-gray-300 rounded" @input="handleInputChange" />
          </div>
          <div>
            <label for="remuneracao" class="block mb-2">22. Remuneração/Renda</label>
            <input id="remuneracao" type="text" class="w-full p-2 border border-gray-300 rounded mb-4"
              @input="handleInputChange" />
            <input type="text" class="w-full p-2 border border-gray-300 rounded" @input="handleInputChange" />
          </div>
        </div>
        <div class="flex items-start gap-2">
          <label>23. </label>
          <div>
            <input type="checkbox" id="checkersection2" v-model="checked" class="mr-2" />
            <label for="checkersection2">
              Não exerci nenhuma atividade profissional neste período.
            </label>
          </div>
        </div>
        <div>
          <legend>
            24. Permanece exercendo alguma(s) atividade(s) citada(s) acima?
          </legend>
          <div class="flex gap-4 items-center justify-around mt-2">
            <div>
              <input type="radio" id="sim3" name="drone3" value="sim3" v-model="selectedOption4" checked />
              <label for="sim3">Sim</label>
            </div>
            <div>
              <input type="radio" id="nao3" name="drone3" value="nao3" v-model="selectedOption4" />
              <label for="nao3">Não</label>
            </div>
            <div v-if="selectedOption4 === 'sim3'">
              <label for="outro4" :disabled="selectedOption4 !== 'sim3'">Qual(is)?</label>
              <input type="text" id="outro4" class="h-7 w-56 mx-2 enabled:border enabled:border-zinc-950"
                :disabled="selectedOption4 !== 'sim3'" />
            </div>
          </div>
        </div>
        <!--! section 3 -->
        <div>
          <h1 class="text-lg font-semibold">
            III - BENS E DIREITOS -
            <span class="text-sm font-medium">Bens e direitos pessoais ou entrega de cópia da declaração de
              imposto de renda da RFB</span>
          </h1>
        </div>
        <div class="md:grid md:grid-cols-3 gap-4  items-end">
          <div>
            <label for="atividade2" class="block mb-2">25. Tipo</label>
            <input id="atividade2" type="text" class="w-full p-2 border border-gray-300 rounded mb-4"
              @input="handleInputChange" />
            <input type="text" class="w-full p-2 border border-gray-300 rounded mb-4" @input="handleInputChange" />
            <input type="text" class="w-full p-2 border border-gray-300 rounded" @input="handleInputChange" />
          </div>
          <div>
            <label for="orgao2" class="block mb-2">26. Administrador, se terceiro, e parentesco com o
              declarante.</label>
            <input id="orgao2" type="text" class="w-full p-2 border border-gray-300 rounded mb-4"
              @input="handleInputChange" />
            <input type="text" class="w-full p-2 border border-gray-300 rounded mb-4" @input="handleInputChange" />
            <input type="text" class="w-full p-2 border border-gray-300 rounded" @input="handleInputChange" />
          </div>
          <div>
            <label for="remuneracao2" class="block mb-2">27. Valor do bem</label>
            <input id="remuneracao2" type="text" class="w-full p-2 border border-gray-300 rounded mb-4"
              @input="handleInputChange" />
            <input type="text" class="w-full p-2 border border-gray-300 rounded mb-4" @input="handleInputChange" />
            <input type="text" class="w-full p-2 border border-gray-300 rounded" @input="handleInputChange" />
          </div>
        </div>
        <div>
          <legend>
            28. Possui participação superior a 5% (cinco por cento) do capital
            social ou votante de sociedade de economia mista, instituição
            financeira ou empresa que negocie com o Poder Executivo do Município
            de Porto Velho?
          </legend>
          <div class="flex gap-4 items-center justify-around mt-2">
            <div>
              <input type="radio" id="nao5" name="drone4" value="nao5" v-model="selectedOption5" checked />
              <label for="nao5"> Não</label>
            </div>
            <div>
              <input type="radio" id="sim5" name="drone4" value="sim5" v-model="selectedOption5" />
              <label for="sim5"> Sim</label>
            </div>
            <div v-if="selectedOption5 === 'sim5'">
              <label for="outro5" :disabled="selectedOption5 !== 'sim5'">Qual(is)?</label>
              <input type="text" id="outro5" class="h-7 w-56 mx-2 enabled:border enabled:border-zinc-950"
                :disabled="selectedOption5 !== 'sim5'" />
            </div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <label>29. </label>
          <div>
            <input type="checkbox" id="checkersection3" v-model="checked2" class="mr-2" />
            <label for="checkersection3">
              Não possuo nenhum bem ou direito.
            </label>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <label>30. </label>
          <div>
            <input type="checkbox" id="checkersection4" v-model="checked3" class="mr-2" />
            <label for="checkersection4">
              Não possuo bem ou direito além dos constantes na declaração de
              imposto de renda da RFB.
            </label>
          </div>
        </div>
        <div>
          <legend>
            31. Possui familiar proprietário de instituição cuja atividade está
            relacionada ao campo de atuação do órgão/entidade em que tomou posse
            atualmente?
          </legend>
          <div class="flex gap-4 items-center justify-around mt-2">
            <div>
              <input type="radio" id="nao6" name="drone5" value="nao6" v-model="selectedOption6" checked />
              <label for="nao6"> Não</label>
            </div>
            <div>
              <input type="radio" id="sim6" name="drone5" value="sim6" v-model="selectedOption6" />
              <label for="sim6"> Sim</label>
            </div>
            <div v-if="selectedOption6 === 'sim6'">
              <label for="outro6" :disabled="selectedOption6 !== 'sim6'">Descrever:</label>
              <input type="text" id="outro6" class="h-7 w-56 mx-2 enabled:border enabled:border-zinc-950"
                :disabled="selectedOption6 !== 'sim6'" />
            </div>
          </div>
        </div>
        <!--! section 4 -->
        <div>
          <h1 class="text-lg font-semibold">
            IV. SITUAÇÕES QUE PODEM SUSCITAR CONFLITO COM O INTERESSE PÚBLICO.
          </h1>
        </div>
        <div>
          <legend>
            32. Exerce outra(s) atividade(s) além do cargo, função ou emprego
            público?
          </legend>
          <div class="md:grid-cols-6 md:grid flex flex-col gap-4 md:justify-around md:items-center mt-2">
            <div class="flex items-center justify-start">
              <input type="radio" id="nao7" name="drone7" value="nao7" v-model="selectedOption7" checked />
              <label for="nao7"> Não</label>
            </div>
            <div>
              <input type="radio" id="sim7" name="drone7" value="sim7" v-model="selectedOption7" />
              <label for="sim7"> Sim</label>
            </div>
            <div v-if="selectedOption7 === 'sim7'">
              <label for="outro7" :disabled="selectedOption7 !== 'sim7'">Qual?
              </label>
            </div>
            <input type="text" id="outro7" class="h-7 w-56 mx-2 enabled:border enabled:border-zinc-950"
              :disabled="selectedOption7 !== 'sim7'" />
          </div>
        </div>
        <div>
          <legend>
            33. Possui outra renda além do cargo, função ou emprego público?
          </legend>
          <div class="md:grid-cols-6 md:grid flex flex-col gap-4 md:justify-around md:items-center mt-2">
            <div class="flex items-center justify-start">
              <input type="radio" id="nao8" name="drone8" value="nao8" v-model="selectedOption8" checked />
              <label for="nao8"> Não</label>
            </div>
            <div>
              <input type="radio" id="sim8" name="drone8" value="sim8" v-model="selectedOption8" />
              <label for="sim8"> Sim</label>
            </div>
            <div v-if="selectedOption8 === 'sim8'">
              <label for="outro8" :disabled="selectedOption8 !== 'sim8'">Qual?
              </label>
            </div>
            <input type="text" id="outro8" class="h-7 w-56 mx-2 enabled:border enabled:border-zinc-950"
              :disabled="selectedOption8 !== 'sim8'" />
          </div>
        </div>
        <div>
          <legend>
            34. Em caso afirmativo no campo 32 ou 33, há conflito potencial com
            o Interesse Público?
          </legend>
          <div class="md:grid-cols-3 md:grid flex flex-col gap-4 md:justify-around md:items-center mt-2">
            <div class="flex items-center justify-start">
              <input type="radio" id="nao9" name="drone9" value="nao9" v-model="selectedOption9" checked />
              <label for="nao9"> Não</label>
            </div>
            <div>
              <input type="radio" id="sim9" name="drone9" value="sim9" v-model="selectedOption9" />
              <label for="sim9"> Sim. Preencher campo 35</label>
            </div>
            <div>
              <input type="radio" id="tenho" name="drone9" value="tenho" v-model="selectedOption9" />
              <label for="tenho"> Tenho dúvida. Preencher campo 35</label>
            </div>
          </div>
        </div>
        <div>
          <legend>
            35. Descrever a situação ou atividade, no caso de marcar “Sim” ou
            “Tenho dúvida” no campo 34.
          </legend>
          <textarea name="campFinal" class="border w-full outline-none"></textarea>
        </div>
        <!--! section 5 -->
        <SectionFive />
        <div class="flex items-start gap-2">
          <label>36. </label>
          <div>
            <input type="checkbox" id="checkersection5" v-model="checked4" class="mr-2" />
            <label for="checkersection5">
              Isento de declarar Imposto de Renda de Pessoa Física (IRPF).
            </label>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <div>
            <input type="checkbox" id="checkersection6" v-model="checked5" class="mr-2" />
            <label for="checkersection6">Concordo que os dados fornecidos poderão ser utilizados pela prefeitura para
              fins administrativos e
              estatísticos.
              <router-link to="/protecao" class="text-blue-500" target="_blank">
                Leia mais.
              </router-link>
            </label>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <input type="checkbox" id="checkersection7" v-model="checked6" class="mr-2" />
          <label for="checkersection7">
            Comprometo-me com a veracidade dos fatos relatados e responsabilizo-me por possíveis omissões, que possam
            resultar na transgressão do Código de Conduta Ética do Agente Público e da Alta Administração municipal.
          </label>
        </div>
        <div class="flex flex-col items-end text-center p-4 space-y-4">
          <!-- Linha para Local e Data -->
          <div class="md:flex space-x-4">
            <div class="flex flex-col">
              <label for="local" class="mb-1">Local</label>
              <input id="local" type="text" class="border-b border-gray-400 focus:outline-none px-2 text-center"
                @input="handleInputChange" />
            </div>
            <div class="md:flex flex-col">
              <label for="data" class="mb-1">Data</label>
              <input id="data" type="date" class="border-b border-gray-400 focus:outline-none px-2 text-center"
                @input="handleInputChange" />
            </div>
          </div>

          <!-- Assinatura -->
          <div class="md:flex flex-col w-full max-w-xs">
            <label for="assinatura" class="mb-1">Assinatura:</label>
            <input id="assinatura" type="text" class="border-b border-gray-400 focus:outline-none px-2 text-center"
              @input="handleInputChange" />
          </div>

          <!-- Nome e CPF -->
          <div class="md:flex space-x-4">
            <div class="flex flex-col">
              <label for="nome" class="mb-1">Nome:</label>
              <input id="nome" type="text" class="border-b border-gray-400 focus:outline-none px-2 text-center"
                @input="handleInputChange" />
            </div>
            <div class="flex flex-col">
              <label for="cpf" class="mb-1">CPF:</label>
              <input id="cpf" type="text" v-model="cpf" placeholder="000.000.000-00"
                class="border-b border-gray-400 focus:outline-none px-2 text-center" maxlength="14" />
            </div>
          </div>
        </div>
        <!--! section 6 and final -->
        <SectionSix />
        <button
          class="border-2 w-56 h-14 bg-zinc-400 text-lg rounded-lg shadow-lg font-semibold hover:bg-zinc-300 mb-72">Enviar
          Formulário</button>
        <div />
      </form>
    </div>
  </div>
</template>

<script setup>
import SectionSix from "@/components/sectionsTheMain/SectionsSix.vue";
import SectionFive from "@/components/sectionsTheMain/SectionFive.vue";
import { useFormStore } from "@/stores/useFormStore";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { handleInputCep1, handleInputCep2, cep1, cep2, logradouro1, logradouro2, cidade1, cidade2 } from "@/hooks/useCep";
import { telefone, telefoneCel, telefoneRes } from "@/hooks/formatTel";
import { handleInputNumber, handleInputNumber2 } from "@/hooks/formatNCasa";
import { cpf } from "@/hooks/formatCPF";

const formStore = useFormStore();
const {
  selectedOption1, selectedOption2, selectedOption3, selectedOption4, selectedOption5,
  selectedOption6, selectedOption7, selectedOption8, selectedOption9,
  checked, checked2, checked3, checked4, checked5, checked6,
  otherInputs
} = storeToRefs(formStore);

const handleInputChange = (event) => {
  formStore.updateOtherInput(event.target.id, event.target.value);
};

onMounted(() => {
  setTimeout(() => {
    Object.entries(otherInputs.value).forEach(([ id, value ]) => {
      const input = document.getElementById(id);
      if (input) input.value = value;
    });
  }, 300);
});
</script>

<style scoped>
body {
  overflow: hidden;
}

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