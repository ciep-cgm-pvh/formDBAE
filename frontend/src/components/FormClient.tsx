'use client'
import PreviousActivitiesCard from '@/components/cardsForm/PreviousActivities';
import PersonalDataCard from '@/components/cardsForm/PersonalDataCard';
import BensDireitosCard from '@/components/cardsForm/BensEDireitosCard';
import ConflictCard from '@/components/cardsForm/ConflictCard';
import OptionalAttachment from '@/components/cardsForm/OptionalAttachment';
import { useForm, FormProvider } from 'react-hook-form';

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
        bens: [{ tipo: '', administrador: '', valorBem: '' }],
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

  const onSubmit = form.handleSubmit(data => {
    console.log('Dados finais:', data)
    // aqui você envia para o backend
  })

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className="flex flex-col items-center p-4">
          <div className='mx-auto mt-6 px-4'>
            <PersonalDataCard />
            <PreviousActivitiesCard />
            <BensDireitosCard />
            <ConflictCard />
            <OptionalAttachment />
          </div>
          <button type="submit" className=" w-fit mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded hover:cursor-pointer">
            Enviar formulário
          </button>
      </form>
    </FormProvider>
  )
}

export default FormClient;