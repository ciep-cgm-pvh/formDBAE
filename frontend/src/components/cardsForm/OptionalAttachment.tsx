"use client"
import { useForm } from 'react-hook-form'
import { FileUpload } from '../../components/inputFiles';

interface AttachmentData {
  anexoIRBensDireitos: File
  anexoIRRendimentos: FileList
  anexosOutrosDocs: FileList
  }
const OptionalAttachment = () => {

  return (
    <form className="py-3 px-4">
      <div className="border-2 px-4 py-2 rounded-t-lg">
        <p className="font-bold text-lg text-nowrap">V - Anexos Opcionais</p>
      </div>
      
      <section className="flex flex-col gap-1 py-3 px-4 border-x border-b rounded-b-lg">
        <div>
          <label>Imposto de Renda  -  Cópia da última declaração de bens e direitos.
          </label>
          <FileUpload
            id="anexoIRBensDireitos"
            label='Selecione o arquivo'
            accept="application/pdf"
          />
        </div>

      </section>
    </form>
  )
}

export default OptionalAttachment;