<script setup>

</script>

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
      <h1 class="text-lg font-semibold">I - DADOS PESSOAIS</h1>
      <form id="form" class="mt-8 flex w-full px-4">
        <div class="flex grid-cols-2 flex-1">
          <div class="flex ">
            <label for="name">Nome completo: </label>
            <input type="text" id="name" class="border border-zinc-950 h-7" /><br>
          </div>
          <div class="flex flex-col -mt-6 mb-8">
            <label for="date">Data de nascimento</label>
            <input type="date" class="border border-zinc-950" id="date" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>