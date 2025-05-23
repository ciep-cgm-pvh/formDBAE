'use client'
import BensDireitosCard from '@/components/cardsForm/BensEDireitosCard';
import ConflictCard from '@/components/cardsForm/ConflictCard';
import OptionalAttachment from '@/components/cardsForm/OptionalAttachment';
import PersonalDataCard from '@/components/cardsForm/PersonalDataCard';
import PreviousActivitiesCard from '@/components/cardsForm/PreviousActivities';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

interface PersonalData {
  nome: string,
  nascimento: string,
  formacaoProfissional: string,
  cargo: string,
  cargoEfetivo: string,
  orgao: string,
  dataNomeacao: string,
  cargoPublico: { boolean: string, qual: string },
  orgaoOrigem: string,
  conselho: { boolean: string, qual: string },
  enderecoTrabalho: string,
  cepTrabalho: string,
  telTrabalho: string,
  enderecoResidencial: string,
  cepResidencial: string,
  telResidencial: string,
  email: string,
  celular: string,
  enderecoCorrespondencia: string,
  estadoCivil: { boolean: string, qual: string },
  conjuge: string,
  atividadeConjuge: string,
}

interface Atividade {
  atividade: string
  orgao: string
  remuneracao: string
}

interface AtividadeData {
  naoExerceuProfissao: boolean,
  statusProfissao: { boolean: string, qual: string },
}

interface PreviousActivitiesData {
  atividades: Atividade[];
  statusProfissonal: AtividadeData
}

interface Bem {
  tipo: string
  administrador: string
  valorBem: string
}

interface BensDireitosData {
  naoPossuiBem: boolean
  naoPossuiBemAlemDoRFB: boolean
  familiarProprietario: { boolean: string, qual: string }
  participacao5perc: { boolean: string, qual: string }
}

interface BensDireitosForm {
  bens: Bem[]
  checkboxBens: BensDireitosData
}

interface ConflictData {
  atividadeAdjacente: { boolean: string, qual: string }
  rendaExtra: { boolean: string, qual: string }
  potencialConflito: { boolean: string, descricao: string }
  valorBem: string
}

interface FormValues {
  bensEDireitos: BensDireitosForm
  conflitoDeInteresse: ConflictData
  personalData: PersonalData
  previousActivities: PreviousActivitiesData
}

const FormClient = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      personalData: {
        nome: '',
        nascimento: '',
        formacaoProfissional: '',
        cargo: '',
        cargoEfetivo: '',
        orgao: '',
        dataNomeacao: '',
        cargoPublico: { boolean: '', qual: '' },
        orgaoOrigem: '',
        conselho: { boolean: '', qual: '' },
        enderecoTrabalho: '',
        cepTrabalho: '',
        telTrabalho: '',
        enderecoResidencial: '',
        cepResidencial: '',
        telResidencial: '',
        email: '',
        celular: '',
        enderecoCorrespondencia: '',
        estadoCivil: { boolean: '', qual: '' },
        conjuge: '',
        atividadeConjuge: ''
      },
      previousActivities: {
        atividades: [
          {
            atividade: '',
            orgao: '',
            remuneracao: ''
          }
        ],
        statusProfissonal: {
          naoExerceuProfissao: false,
          statusProfissao: { boolean: '', qual: '' }
        }
      },
      bensEDireitos: {
        bens: [ { tipo: '', administrador: '', valorBem: '' } ],
        checkboxBens: {
          naoPossuiBem: false,
          naoPossuiBemAlemDoRFB: false,
          familiarProprietario: { boolean: '', qual: '' },
          participacao5perc: { boolean: '', qual: '' }
        }
      },
      conflitoDeInteresse: {
        atividadeAdjacente: { boolean: '', qual: '' },
        rendaExtra: { boolean: '', qual: '' },
        potencialConflito: { boolean: '', descricao: '' },
      }
    }
  })
  const [ arquivos, setArquivos ] = useState<File[]>([]);

  const handleFilesChange = (files: File[]) => {
    setArquivos(files);
  };

  // const onSubmit = form.handleSubmit(async (data) => {
  //   try {
  //     // 1. Enviar JSON para o backend para gerar o PDF
  //     const response = await fetch("http://localhost:3003/api/gerarPdf", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(data),
  //     });

  //     const result = await response.json();

  //     if (!response.ok) {
  //       throw new Error(result.error || "Erro ao enviar dados.");
  //     }

  //     console.log("✅ Pdf gerado com sucesso!");

  //     // 2. Ler os arquivos PDF do FileUpload (arquivos do estado)
  //     const arquivosBuffers = await Promise.all(
  //       arquivos.map(file => file.arrayBuffer())
  //     );

  //     // 3. Baixar o PDF gerado do backend
  //     const pdfResponse = await fetch("http://localhost:3003/api/baixarPdf");
  //     const backendPdfBlob = await pdfResponse.blob();
  //     const backendPdfBuffer = await backendPdfBlob.arrayBuffer();

  //     // 4. Criar um PDF combinado com pdf-lib
  //     const mergedPdf = await PDFDocument.create();

  //     async function copyPagesFromPdf(pdfBuffer: ArrayBuffer) {
  //       const pdf = await PDFDocument.load(pdfBuffer);
  //       const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
  //       copiedPages.forEach(page => mergedPdf.addPage(page));
  //     }

  //     // Primeiro: copiar páginas do PDF do backend (formulário preenchido)
  //     await copyPagesFromPdf(backendPdfBuffer);

  //     // Depois: copiar páginas dos arquivos anexados
  //     for (const buffer of arquivosBuffers) {
  //       await copyPagesFromPdf(buffer);
  //     }

  //     // 5. Salvar e baixar o PDF combinado
  //     const mergedPdfBytes = await mergedPdf.save();
  //     const mergedBlob = new Blob([ mergedPdfBytes ], { type: "application/pdf" });
  //     saveAs(mergedBlob, "FormDBAE.pdf");

  //   } catch (err: any) {
  //     console.error("❌ Erro:", err.message);
  //     alert("Erro ao gerar os arquivos: " + err.message);
  //   }
  // })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const formData = new FormData();

      // 1. Adiciona o JSON do formulário
      formData.append("json", new Blob([ JSON.stringify(data) ], { type: "application/json" }));

      // 2. Adiciona os arquivos PDF
      arquivos.forEach((file, index) => {
        formData.append("anexos", file); // nome da chave igual ao usado no backend (ex: "anexos")
      });

      // 3. Envia tudo para o backend
      const response = await fetch("http://localhost:3003/api/gerarPdfComAnexos", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Erro ao gerar o PDF.");
      }

      // 4. Recebe e baixa o PDF final
      const pdfBlob = await response.blob();
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "FormDBAE.pdf";
      a.click();

      console.log("✅ PDF final baixado com sucesso!");

    } catch (err: any) {
      console.error("❌ Erro:", err.message);
      alert("Erro ao gerar o PDF: " + err.message);
    }
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className="flex flex-col items-center">
        <div className='mx-auto mt-6'>
          <PersonalDataCard />
          <PreviousActivitiesCard />
          <BensDireitosCard />
          <ConflictCard />
          <OptionalAttachment onFilesChange={handleFilesChange} />
        </div>
        <button type="submit" className=" w-fit mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded hover:cursor-pointer">
          Enviar formulário
        </button>
      </form>
    </FormProvider>
  )
}

export default FormClient;