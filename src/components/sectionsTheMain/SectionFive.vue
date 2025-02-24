<template>
  <div>
    <h1 class="text-lg font-semibold">V. ANEXOS OPCIONAIS</h1>
    <div class="border border-zinc-400 p-4 gap-2">
      <div v-for="(item, index) in anexos" :key="index"
        class="flex flex-col md:flex-row items-center justify-between mb-2">
        <h2 class="text-sm">
          <span v-if="item.pdf">{{ item.icon }}</span>
          <span v-else>❌</span>
          {{ item.text }}
        </h2>
        <input type="file" accept=".pdf" @change="(event) => handleFileUpload(event, index)"
          class="mt-2 md:mt-0 md:ml-2 w-full md:w-auto" ref="fileInputs" />
        <button v-if="item.pdf" @click="() => removeFile(index)"
          class="mt-2 md:mt-0 md:ml-2 bg-red-500 text-white px-2 py-1 rounded w-full md:w-auto">
          Excluir
        </button>
      </div>
    </div>
    <div class="flex flex-col md:flex-row items-center justify-between">
      <h2 class="text-sm">
        <span v-if="outrosDocumentos.pdf">{{ outrosDocumentos.icon }}</span>
        <span v-else>❌</span>
        Outros documentos.
      </h2>
      <input type="file" accept=".pdf" @change="handleOutrosDocumentosUpload"
        class="mt-2 md:mt-0 md:ml-2 w-full md:w-auto" ref="outrosDocumentosInput" />
      <button v-if="outrosDocumentos.pdf" @click="removeOutrosDocumentos"
        class="mt-2 md:mt-0 md:ml-2 bg-red-500 text-white px-2 py-1 rounded w-full md:w-auto">
        Excluir
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const anexos = ref([
  {
    text: "Imposto de Renda - Cópia da última declaração de bens e direitos.",
    pdf: null,
    icon: "✅",
  },
  {
    text: "Imposto de Renda - Cópia da última declaração de rendimentos.",
    pdf: null,
    icon: "✅",
  },
]);

const outrosDocumentos = ref({ pdf: null, icon: "✅" });

const fileInputs = ref([]);
const outrosDocumentosInput = ref(null);

const handleFileUpload = (event, index) => {
  const file = event.target.files[ 0 ];
  if (file && file.type === "application/pdf") {
    anexos.value[ index ].pdf = file;
    anexos.value[ index ].icon = "✅";
  } else {
    alert("Por favor, selecione um arquivo PDF.");
  }
  event.preventDefault();
};

const handleOutrosDocumentosUpload = (event) => {
  const file = event.target.files[ 0 ];
  if (file && file.type === "application/pdf") {
    outrosDocumentos.value.pdf = file;
    outrosDocumentos.value.icon = "✅";
  } else {
    alert("Por favor, selecione um arquivo PDF.");
  }
  event.preventDefault();
};

const removeFile = (index) => {
  anexos.value[ index ].pdf = null;
  anexos.value[ index ].icon = "❌";
  fileInputs.value[ index ].value = "";
};

const removeOutrosDocumentos = () => {
  outrosDocumentos.value.pdf = null;
  outrosDocumentos.value.icon = "❌";
  outrosDocumentosInput.value.value = "";
};
</script>
