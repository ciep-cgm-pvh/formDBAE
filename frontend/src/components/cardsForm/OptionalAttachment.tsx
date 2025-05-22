import { FileUpload } from '../../components/inputFiles';

type OptionalAttachmentProps = {
  onFilesChange: (files: File[]) => void;
};
const OptionalAttachment: React.FC<OptionalAttachmentProps> = ({ onFilesChange }) => {

  return (
    <div className="py-3 px-4">
      <div className="border-2 px-4 py-2 rounded-t-lg">
        <p className="font-bold text-lg text-nowrap">V - Anexos Opcionais</p>
      </div>
      
      <section className="flex flex-col gap-1 py-3 px-4 border-x border-b rounded-b-lg">
        <ul>
          <li className="text-sm">
            Imposto de Renda - Cópia da última declaração de bens e direitos.
          </li>
          <li className="text-sm">
            Imposto de Renda - Cópia da última declaração de rendimentos.
          </li>
          <li className="text-sm">
            Outros documentos
          </li>
        </ul>
          <FileUpload
            id="meus-pdfs"
            label="Selecionar PDFs"
          onFilesChange={onFilesChange}
          />
      </section>
    </div>
  )
}

export default OptionalAttachment;