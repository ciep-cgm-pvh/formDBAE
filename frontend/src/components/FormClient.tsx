'use client'
import BensDireitosCard from '@/components/cardsForm/BensEDireitosCard';
import ConflictCard from '@/components/cardsForm/ConflictCard';
import OptionalAttachment from '@/components/cardsForm/OptionalAttachment';
import PersonalDataCard from '@/components/cardsForm/PersonalDataCard';
import PreviousActivitiesCard from '@/components/cardsForm/PreviousActivities';
import { FormValues } from '@/types/formTypes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as dotenv from 'dotenv';
dotenv.config();

const FormClient = () => {
  const form = useForm<FormValues>({
    mode: "onTouched",
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
    router.push("/loading");
    try {
      const formData = new FormData();

      data.optionalAttachments.anexos = arquivos.map(file => file.name);

      // Adiciona a data atual formatada (ex: 26/05/2025)
      const dataAtual = new Date();
      const dataFormatada = dataAtual.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      // Insere a data de geração no objeto de dados
      const dadosComData: FormValues = {
        ...data,
        dataGeracao: dataFormatada
      };

      // 1. Adiciona o JSON do formulário
      formData.append("json", new Blob([ JSON.stringify(dadosComData) ], { type: "application/json" }));

      // 2. Adiciona os arquivos PDF
      arquivos.forEach((file) => {
        formData.append("anexos", file); // nome da chave igual ao usado no backend (ex: "anexos")
      });

      // 3. Envia tudo para o backend usando a variável de ambiente
      const isProduction = process.env.NODE_ENV === 'production';
      const apiUrl = isProduction
        ? process.env.NEXT_PUBLIC_API_URL
        : process.env.NEXT_PUBLIC_API_URL_LOCAL;

      // Verifica se a URL da API está definida para evitar erros
      if (!apiUrl) {
        throw new Error("A URL da API não está configurada nas variáveis de ambiente.");
      }
      const response = await fetch(`${apiUrl}/api/gerarPdfComAnexos`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const result = await response.json();
        router.push("/form");
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

    } catch (err: unknown) {
      let message: string;
      // Verifica se err é uma instância de Error ou uma string
      // e define a mensagem de erro apropriada
      if (err instanceof Error) {
        message = err.message;
      } else if (typeof err === 'string') {
        message = err;
      } else {
        message = 'Unknown error';
      }

      console.error("❌ Erro:", message);
      alert("Erro ao gerar o PDF: " + message);
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
        <button type="submit" className=" w-fit mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded hover:cursor-pointer mb-4">
          Enviar formulário
        </button>
      </form>
    </FormProvider>
  )
}

export default FormClient;