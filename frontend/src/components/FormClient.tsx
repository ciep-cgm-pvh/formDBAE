'use client'
import BensDireitosCard from '@/components/cardsForm/BensEDireitosCard';
import ConflictCard from '@/components/cardsForm/ConflictCard';
import OptionalAttachment from '@/components/cardsForm/OptionalAttachment';
import PersonalDataCard from '@/components/cardsForm/PersonalDataCard';
import PreviousActivitiesCard from '@/components/cardsForm/PreviousActivities';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormValues } from '@/types/formTypes';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const handleFilesChange = (files: File[]) => {
    setArquivos(files);
  };

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const formData = new FormData();

      data.optionalAttachments.anexos = arquivos.map(file => file.name);

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

      router.push("/success");

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