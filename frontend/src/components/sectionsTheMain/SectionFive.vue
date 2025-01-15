<template>
  <div>
    <h1 class="text-lg font-semibold">
      V. ANEXOS OPCIONAIS
    </h1>
    <div class="border border-zinc-400 p-4 gap-2">
      <div v-for="(item, index) in anexos" :key="index"
        class="flex flex-col md:flex-row items-center justify-between mb-2">
        <h2 class="text-sm">
          <span v-if="item.pdf">{{ item.icon }}</span>
          <span v-else>❌</span>
          {{ item.text }}
        </h2>
        <input type="file" accept=".pdf" @change="(event) => handleFileUpload(event, index)"
          class="mt-2 md:mt-0 md:ml-2" />
        <button v-if="item.pdf" @click="removeFile(index)"
          class="mt-2 md:mt-0 md:ml-2 bg-red-500 text-white px-2 py-1 rounded">
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
      <input type="file" accept=".pdf" @change="handleOutrosDocumentosUpload" class="mt-2 md:mt-0 md:ml-2" />
      <button v-if="outrosDocumentos.pdf" @click="removeOutrosDocumentos"
        class="mt-2 md:mt-0 md:ml-2 bg-red-500 text-white px-2 py-1 rounded">
        Excluir
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      anexos: [
        { text: 'Imposto de Renda - Cópia da última declaração de bens e direitos.', pdf: null, icon: '✅' },
        { text: 'Imposto de Renda - Cópia da última declaração de rendimentos.', pdf: null, icon: '✅' },
      ],
      outrosDocumentos: { pdf: null, icon: '✅' },
    };
  },
  methods: {
    handleFileUpload(event, index) {
      const file = event.target.files[ 0 ];
      if (file && file.type === 'application/pdf') {
        this.anexos[ index ].pdf = file;
        this.anexos[ index ].icon = '✅';
      } else {
        alert('Por favor, selecione um arquivo PDF.');
      }
      event.preventDefault();
    },
    handleOutrosDocumentosUpload(event) {
      const file = event.target.files[ 0 ];
      if (file && file.type === 'application/pdf') {
        this.outrosDocumentos.pdf = file;
        this.outrosDocumentos.icon = '✅';
      } else {
        alert('Por favor, selecione um arquivo PDF.');
      }
      event.preventDefault();
    },
    removeFile(index) {
      this.anexos[ index ].pdf = null;
      this.anexos[ index ].icon = '❌';
    },
    removeOutrosDocumentos() {
      this.outrosDocumentos.pdf = null;
      this.outrosDocumentos.icon = '❌';
    },
  },
};
</script>

