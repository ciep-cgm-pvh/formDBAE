<template>
  <div>
    <h1 class="text-lg font-bold justify-center flex mb-8">
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
        <div class="grid grid-cols-3 gap-4">
          <label for="fullName">1. Nome completo: </label>
          <input type="text" id="fullName" class="border border-zinc-950 h-7 col-span-2" />
          <label for="date-input">2. Data de nascimento</label>
          <input ref="datepicker1" class="border border-zinc-950 w-40 placeholder-center centered-input" id="date-input"
            placeholder="dd/mm/yyyy" type="text" />
        </div>
        <div class="grid md:grid-cols-12 gap-4">
          <label class="col-span-3" for="skill">3. Formação profissional:
          </label>
          <input type="text" id="skill" class="border border-zinc-950 h-7 col-span-3" />
          <label class="md:col-span-2 md:mx-8" for="work">4. Cargo: </label>
          <input type="text" id="work" class="border border-zinc-950 h-7 col-span-3" />
        </div>
        <div class="md:grid-cols-12 md:grid gap-4 flex flex-col">
          <label class="md:col-span-2 md:mt-2" for="position">5. Cargo Efetivo:
          </label>
          <input type="text" id="position" class="border border-zinc-950 h-7 md:col-span-2 w-40 mt-2 md:-mx-6" />
          <label class="md:col-span-2 md:w-40 md:mt-2 md:-mx-2" for="org">6. Órgão / Entidade:
          </label>
          <input type="text" id="org" class="border border-zinc-950 h-7 col-span-3 mt-2 uppercase" />
          <div class="md:flex md:flex-col md:-mt-10 md:ml-8">
            <label class="w-56" for="date-input2">7. Data da nomeação/ <br />
              designação:
            </label>
            <input ref="datepicker2" class="border border-zinc-950 w-40 placeholder-center centered-input"
              id="date-input2" type="text" placeholder="dd/mm/yyyy" />
          </div>
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
              <input type="text" id="name" class="border border-zinc-950 h-7 w-56" />
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
        <div class="grid grid-cols-3 gap-3">
          <label for="cep1">10. CEP do trabalho:</label>
          <input v-model="cep1" @input="handleInputCep1" name="cep1" placeholder="D0000-000"
            class="outline-none mx-2" />
          <input v-model="cidade1" name="cidade" placeholder="Cidade" disabled />
          <input v-model="logradouro1" name="rua" placeholder="Rua" disabled />
          <!-- N° -->
          <label for="numberAddress">N°</label>
          <input type="text" class="border border-zinc-950 h-7" size="5" id="numberAddress"
            @input="handleInputNumber" />
        </div>
        <div>
          <label for="phoneTra">11. Telefone do trabalho: </label>
          <input type="text" id="phoneTra" v-model="formattedPhoneTra" @input="handleInputTra"
            placeholder="(00) 00000-0000" maxlength="16" />
        </div>
        <div class="grid grid-cols-3 gap-3">
          <label for="cep2">12. CEP da residência: </label>
          <input v-model="cep2" @input="handleInputCep2" name="cep2" placeholder="D0000-000"
            class="outline-none mx-2" />
          <input v-model="cidade2" name="cidade" placeholder="Cidade" disabled />
          <input v-model="logradouro2" name="rua" placeholder="Rua" disabled />
          <label for="numberAddress2">N°</label>
          <input type="text" class="border border-zinc-950 h-7 mx-2" size="5" id="numberAddress2"
            @input="handleInputNumber2" />
        </div>
        <div>
          <label for="phoneRes">13. Telefone residencial: </label>
          <input type="text" id="phoneRes" v-model="formattedPhoneRes" @input="handleInputRes"
            placeholder="(00) 00000-0000" maxlength="16" />
        </div>
        <div class="md:grid-cols-4 md:grid gap-4 flex flex-col">
          <label for="email">14. E-mail: </label>
          <input type="email" id="email" pattern=".+@example\.com" size="20" required placeholder=".+@example.com" />
          <label for="phoneCel">15. Celular: </label>
          <input type="text" id="phoneCel" v-model="formattedPhoneCel" @input="handleInputCel"
            placeholder="(00) 00000-0000" maxlength="16" />
        </div>
        <div>
          <label>16. Endereço para correspondências: </label>
          <div class="flex items-center gap-4">
            <div>
              <input type="radio" id="Residencial" name="address" value="Residencial" checked />
              <label for="Residencial"> Residencial</label>
            </div>
            <div>
              <input type="radio" id="Trabalho" name="address" value="Trabalho" />
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
          <input type="text" id="skill2" class="border border-zinc-950 h-7 col-span-3" />
          <label class="md:col-span-5" for="work2">19. Atividade profissional do cônjuge</label>
          <input type="text" id="work2" class="border border-zinc-950 h-7 col-span-3" />
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
            <input id="atividade" type="text" class="w-full p-2 border border-gray-300 rounded mb-4" />
            <input type="text" class="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label for="orgao" class="block mb-2">21. Órgão, Empresa, etc.</label>
            <input id="orgao" type="text" class="w-full p-2 border border-gray-300 rounded mb-4" />
            <input type="text" class="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label for="remuneracao" class="block mb-2">22. Remuneração/Renda</label>
            <input id="remuneracao" type="text" class="w-full p-2 border border-gray-300 rounded mb-4" />
            <input type="text" class="w-full p-2 border border-gray-300 rounded" />
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
        <div class="md:grid md:grid-cols-3 gap-4 items-end">
          <div>
            <label for="atividade2" class="block mb-2">25. Tipo</label>
            <input id="atividade2" type="text" class="w-full p-2 border border-gray-300 rounded mb-4" />
            <input type="text" class="w-full p-2 border border-gray-300 rounded mb-4" />
            <input type="text" class="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label for="orgao2" class="block mb-2">26. Administrador, se terceiro, e parentesco com o
              declarante.</label>
            <input id="orgao2" type="text" class="w-full p-2 border border-gray-300 rounded mb-4" />
            <input type="text" class="w-full p-2 border border-gray-300 rounded mb-4" />
            <input type="text" class="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label for="remuneracao2" class="block mb-2">27. Valor do bem</label>
            <input id="remuneracao2" type="text" class="w-full p-2 border border-gray-300 rounded mb-4" />
            <input type="text" class="w-full p-2 border border-gray-300 rounded mb-4" />
            <input type="text" class="w-full p-2 border border-gray-300 rounded" />
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
        <div>
          <h1 class="text-lg font-semibold">
            V. ANEXOS OPCIONAIS
          </h1>
        </div>
        <div class="border border-zinc-400">
          <h2 class="text-sm">
            ✅ Imposto de Renda - Cópia da última declaração de bens e direitos.
          </h2>
          <h2 class="text-sm">
            ✅ Imposto de Renda - Cópia da última declaração de rendimentos.
          </h2>
        </div>
        <h2 class="text-sm">✅ Outros documentos.</h2>
        <div class="flex items-start gap-2">
          <label>36. </label>
          <div>
            <input type="checkbox" id="checkersection5" v-model="checked4" class="mr-2" />
            <label for="checkersection5">
              Isento de declarar Imposto de Renda de Pessoa Física (IRPF).
            </label>
          </div>
        </div>
        <div class="flex items-start gap-2">
          <div>
            <input type="checkbox" id="checkersection6" v-model="checked5" class="mr-2" />
            <label for="checkersection6">
              <a href="../router/index.js" target="_blank" rel="noopener noreferrer" class="hover:text-blue-400">
                Concordo que os dados fornecidos poderão ser utilizados pela prefeitura para fins administrativos e
                estatísticos.
              </a>
            </label>
          </div>
        </div>
        <div>
          <h2 class="text-sm text-start">
            Comprometo-me com a veracidade dos fatos relatados e responsabilizo-me por possíveis omissões, que possam
            resultar na transgressão do Código de Conduta Ética do Agente Público e da Alta Administração municipal.
          </h2>
        </div>
        <div class="flex flex-col items-end text-center p-4 space-y-4">
          <!-- Linha para Local e Data -->
          <div class="md:flex space-x-4">
            <div class="flex flex-col">
              <label for="local" class="mb-1">Local</label>
              <input id="local" type="text" class="border-b border-gray-400 focus:outline-none px-2 text-center">
            </div>
            <div class="md:flex flex-col">
              <label for="data" class="mb-1">Data</label>
              <input id="data" type="date" class="border-b border-gray-400 focus:outline-none px-2 text-center">
            </div>
          </div>

          <!-- Assinatura -->
          <div class="md:flex flex-col w-full max-w-xs">
            <label for="assinatura" class="mb-1">Assinatura:</label>
            <input id="assinatura" type="text" class="border-b border-gray-400 focus:outline-none px-2 text-center">
          </div>

          <!-- Nome e CPF -->
          <div class="md:flex space-x-4">
            <div class="flex flex-col">
              <label for="nome" class="mb-1">Nome:</label>
              <input id="nome" type="text" class="border-b border-gray-400 focus:outline-none px-2 text-center">
            </div>
            <div class="flex flex-col">
              <label for="cpf" class="mb-1">CPF:</label>
              <input id="cpf" type="text" v-model="cpf" placeholder="000.000.000-00"
                class="border-b border-gray-400 focus:outline-none px-2 text-center" maxlength="14" />
            </div>
          </div>
        </div>
        <!--! section 6 and final -->
        <div>
          <h1 class="text-lg font-semibold text-center">
            NORMAS DE PREENCHIMENTO <br>
            DECLARAÇÃO DE BENS E ATIVIDADES ECONÔMICAS OU PROFISSIONAIS – DBAE
          </h1>
          <h2 class="mt-10 text-md font-semibold">ORIENTAÇÕES GERAIS</h2>
          <h2 class="text-sm">
            ✅ Esta Declaração deverá ser encaminhada à Comissão de Ética Pública do município de Porto Velho em até 10
            (dez) dias da posse no cargo/emprego/função e/ou anualmente conforme hipóteses deliberadas pela referida
            Comissão. <br>
            ✅ A declaração deverá ser devidamente assinada pelo declarante. <br>
            ✅ O formulário de DBAE poderá ser enviado à Comissão de Ética por meio eletrônico ou em meio físico. <br>
            ✅ Expressões que comprometam a clareza das informações, tais como “nada consta”, “nada a declarar” e outras,
            devem ser evitadas. <br>
            ✅ Após analisadas pela Comissão, as declarações confidenciais ficarão sob a guarda da Comissão de Ética
            Pública.
          </h2>
          <h2 class="mt-10 text-md font-semibold">I. DADOS PESSOAIS</h2>
          <h2 class="text-sm">
            Seção destinada à informação dos dados pessoais e profissionais do declarante. <br>
            Campo – 1: Nome completo do declarante, sem abreviações.<br>
            Campo – 2: Data de nascimento do declarante.<br>
            Campo – 3: Formação Profissional do declarante.<br>
            Campo – 4: Cargo público para o qual foi nomeado (exemplos: Secretário Municipal;; Secretário Municipal
            Adjunto; Presidente de órgão; Cargo Comissionado CC-22; CC-23, CC-24 etc.).<br>
            Campo – 5: Informar se o agente público é ocupante de cargo efetivo.<br>
            Campo – 6: Órgão ou entidade da posse atual.<br>
            Campo – 7: Data da nomeação ou designação no cargo comissionado atual.<br>
            Campo – 8: Informar se é integrante de quadro permanente de órgão ou entidade da Administração Pública
            (compreende União, Estados e Municípios). Caso positivo, informar qual cargo ou emprego e o órgão ou
            entidade de origem.<br>
            Campo – 9: Marcar se é membro de Conselho Municipal ou de Conselho de Empresa Municipal e, em caso positivo,
            informar qual(is).<br>
            Campo – 10: Endereço completo do trabalho atual no Serviço Público.<br>
            Campo – 11: Número do telefone precedido do código de área.<br>
            Campo – 12: Endereço onde mantém residência permanente, incluindo cidade, estado e CEP.<br>
            Campo – 13: Número do telefone precedido do código de área.<br>
            Campo – 14: Endereço de correio eletrônico pessoal ou institucional.<br>
            Campo – 15: Número do telefone precedido do código de área.<br>
            Campo – 16: Indicar qual endereço deve ser utilizado para correspondência.<br>
            Campo – 17: Informar o estado civil. Marcada a opção outros, informar situação atual.<br>
            Campo – 18: Nome completo do cônjuge ou companheiro (a) sem abreviações.<br>
            Campo – 19: Atividade profissional do cônjuge ou companheiro (a) do declarante.
          </h2>
          <h2 class="mt-10 text-md font-semibold">II. ATIVIDADE (S) ANTERIOR (ES)</h2>
          <h2 class="text-sm">
            Seção destinada a informações de atividades exercidas nos <strong class="underline">12 meses anteriores à
              nomeação ou designação atual.</strong> <br>
            Campo – 20: Atividade(s) que exerceu nos 12 meses anteriores à nomeação ou designação atual.<br>
            Campo – 21: Empresa, órgão ou entidade onde exerceu as atividades.<br>
            Campo – 22: Valor da remuneração/ renda obtida pela atividade anterior.<br>
            Campo – 23: Marcar, caso não tenha exercido atividade profissional nos 12 meses anteriores à nomeação ou
            designação atual.<br>
            Campo – 24: Indicar se ainda exerce alguma atividade informada no campo 20.
          </h2>
          <h2 class="mt-10 text-md font-semibold">III. BENS E DIREITOS</h2>
          <h2 class="text-sm">
            Seção destinada ao registro de informações relacionadas aos bens e direitos que compõem o patrimônio do
            agente público e de seus familiares proprietários de instituições que exercem atividades relacionadas ao
            órgão/entidade da posse atual.<br>
            Os campos 25, 26 e 27 devem ser preenchidos se houver algum bem que não conste na declaração de Imposto de
            Renda de Pessoa Física (IRPF), quando apresentada nessa forma.<br>
            Campo – 25: Tipo do bem ou direito (exemplos: casa, apartamento, automóvel, propriedade rural, etc).<br>
            Campo – 26: Nome do administrador do bem ou direito, quando não se tratar do próprio declarante, e
            parentesco com o declarante, se for o caso.<br>
            Campo – 27: Informar o valor (efetivo ou estimado) de mercado.<br>
            Campo – 28: Indicar se possui ou não possui participação superior a 5% (cinco por cento) do capital social
            ou capital votante de sociedade de economia mista, instituição financeira ou empresa que negocie com o Poder
            Executivo Municipal. Se possuir, informar em qual(is) empresa(s) possui a participação.<br>
            Campo – 29: Marcar se não possuir nenhum bem ou direito.<br>
            Campo – 30: Marcar se não há outro bem ou direito além da relação constante da Declaração de IRPF.<br>
            Campo – 31: Marcar se possui algum membro da família que seja proprietário de instituição que exerce
            atividade relacionada ao órgão/entidade da posse atual do declarante. Em caso afirmativo, descrever as
            principais características da instituição, além de informar qual seria o familiar e o grau de parentesco.
          </h2>
          <h2 class="mt-10 text-md font-semibold">IV. SITUAÇÕES QUE PODEM SUSCITAR CONFLITO COM O INTERESSE PÚBLICO</h2>
          <h2 class="text-sm">
            Seção destinada à apresentação de informações de situações que, efetiva ou potencialmente, possam suscitar
            conflito com o interesse público.<br>
            Campo – 32: Marcar se exerce atividade concomitante ao cargo, função ou emprego público. Se sim, informar
            qual.<br>
            Campo – 33: Marcar se possui outra renda além do cargo, função ou emprego público. Se sim, informar qual
            (exemplo: aposentadoria, pensão, dividendos etc.).<br>
            Campo – 34: Responder se acredita haver conflito de interesse entre a atividade privada e a renda que recebe
            com a função pública que exerce atualmente. Em caso positivo ou duvida preencher o campo 35.<br>
            Campo – 35: Para os casos positivos ou de dúvida no campo 34 , descrever a(s) situação(ões) ou atividade(s).
          </h2>
          <h2 class="mt-10 text-md font-semibold">V. ANEXOS OBRIGATÓRIOS</h2>
          <h2 class="text-sm">
            Anexar cópias das partes da última declaração de Imposto de Renda de Pessoa Física (IRPF) entregue à Receita
            Federal, <strong class="underline">que contenha a relação completa de bens, direitos e
              rendimentos.</strong><br>
            Campo – 36: Marcar se for isento de fazer declaração de IRPF.
          </h2>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { useCep } from "../hooks/useCep";
import { useDatepicker } from "../hooks/useDatepicker";
import { useFormatPhoneTra, useFormatPhoneCel, useFormatPhoneRes } from "../hooks/useFormatPhone";

export default {
  setup() {
    const { datepicker1, datepicker2, initializeDatepickers } = useDatepicker();
    const selectedOption1 = ref("nao1");
    const selectedOption2 = ref("nao2");
    const selectedOption3 = ref("Casado");
    const selectedOption4 = ref("sim3");
    const selectedOption5 = ref("nao5");
    const selectedOption6 = ref("nao6");
    const selectedOption7 = ref("nao7");
    const selectedOption8 = ref("nao8");
    const selectedOption9 = ref("nao9");
    const checked = ref(false);
    const checked2 = ref(false);
    const checked3 = ref(false);
    const checked4 = ref(false);
    const checked5 = ref(false);
    const cpf = ref('');

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

    const { phoneTra, formattedPhoneTra, formatPhoneTra } = useFormatPhoneTra();
    const { phoneCel, formattedPhoneCel, formatPhoneCel } = useFormatPhoneCel();
    const { phoneRes, formattedPhoneRes, formatPhoneRes } = useFormatPhoneRes();

    const handleInputNumber = (event) => {
      let input = event.target.value.replace(/\D/g, "");
      const numberAddressInPortoVelho = 5;
      if (input.length > numberAddressInPortoVelho) {
        input = input.slice(0, numberAddressInPortoVelho);
      }
      numberAddress.value = input;
    };

    const handleInputNumber2 = (event) => {
      let input = event.target.value.replace(/\D/g, "");
      const numberAddressInPortoVelho = 5;
      if (input.length > numberAddressInPortoVelho) {
        input = input.slice(0, numberAddressInPortoVelho);
      }
      numberAddress2.value = input;
    };

    // Formatting phone
    const handleInputTra = (event) => {
      phoneTra.value = event.target.value.replace(/\D/g, "");
      formatPhoneTra();
    };
    const handleInputRes = (event) => {
      phoneRes.value = event.target.value.replace(/\D/g, "");
      formatPhoneRes();
    };
    const handleInputCel = (event) => {
      phoneCel.value = event.target.value.replace(/\D/g, "");
      formatPhoneCel();
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

    watch(cpf, (newValue) => {
      cpf.value = formatCPF(newValue);
    });

    // Função de formatação de CPF
    function formatCPF(value) {
      value = value.replace(/\D/g, '');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      return value;
    }

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
      phoneRes,
      phoneTra,
      phoneCel,
      formattedPhoneRes,
      formattedPhoneTra,
      formattedPhoneCel,
      formatPhoneRes,
      formatPhoneTra,
      formatPhoneCel,
      handleInputRes,
      handleInputTra,
      handleInputCel,
      handleInputNumber,
      handleInputNumber2,
      // options
      selectedOption1,
      selectedOption2,
      selectedOption3,
      selectedOption4,
      selectedOption5,
      selectedOption6,
      selectedOption7,
      selectedOption8,
      selectedOption9,
      // checkout
      checked,
      checked2,
      checked3,
      checked4,
      checked5,
      cpf,
    };
  },
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
