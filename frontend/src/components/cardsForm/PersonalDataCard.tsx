"use client"
import { useFormContext } from 'react-hook-form';

const PersonalDataCard = () => {
  const { register } = useFormContext()

  return (
    <div className='px-4 py-2'>
      <div className="border-2 px-4 py-2 rounded-t-lg flex items-end">
        <p className="font-bold text-lg">I - Dados Pessoais</p>
      </div>
      <section className="py-3 px-4 border-x border-b rounded-b-lg">
        {/* Linha 1 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">1. Nome completo</label>
            <input type="text" required {...register("personalData.nome", {required: "O nome é obrigatório"})} className="w-full border p-1" />
          </div>
          <div>
            <label className="block text-sm">2. Data de nascimento</label>
            <input required type="date" {...register("personalData.nascimento")} className="w-full border p-1" />
          </div>
        </div>

        {/* Linha 2 */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm">3. Formação profissional</label>
            <input required type="text" {...register("personalData.formacaoProfissional")} className="w-full border p-1" />
          </div>
          <div>
            <label className="block text-sm">4. Cargo</label>
            <input required type="text" {...register("personalData.cargo")} className="w-full border p-1" />
          </div>
          <div>
            <label className="block text-sm">5. Cargo efetivo</label>
            <input required type="text" {...register("personalData.cargoEfetivo")} className="w-full border p-1" />
          </div>
        </div>

        {/* Linha 3 */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm">6. Órgão / Entidade</label>
            <input required type="text" {...register("personalData.orgao")} className="w-full border p-1" />
          </div>
          <div>
            <label className="block text-sm">7. Data da nomeação/designação</label>
            <input required type="date" {...register("personalData.dataNomeacao")} className="w-full border p-1" />
          </div>
        </div>

        {/* Linha 4 – Cargo público */}
        <div className="grid grid-cols-4 md:grid-cols-3 gap-4 mt-4">
          <div className='col-span-2'>
            <label className="block text-sm mb-1">
            8. Ocupa outro cargo ou emprego de quadro permanente na Administração Pública?
            </label>
            <div className="flex items-center gap-4 flex-wrap">
              <label>
                <input required type="radio" {...register("personalData.cargoPublico.boolean")} value="nao" /> Não
              </label>
              <label>
                <input required type="radio" {...register("personalData.cargoPublico.boolean")} value="sim" /> Sim
                </label>
              <input type="text" placeholder="Qual?" {...register("personalData.cargoPublico.qual")} className="border p-1 w-40" />
            </div>
          </div>
          <div className='col-span-2 md:col-span-1'>
            <label className="block text-sm mb-1">
            Órgão/entidade de origem:
            </label>
            <input required type="text" {...register("personalData.orgaoOrigem")} placeholder="Órgão/entidade de origem" className="border p-1 w-60" />
          </div>
        </div>

        {/* Linha 5 – Conselho */}
        <div className="mt-4">
          <label className="block text-sm mb-1">
            9. É membro de Conselho Municipal ou Conselho de Empresa Municipal?
          </label>
          <div className="flex items-center gap-4 flex-wrap">
            <label><input required type="radio" {...register("personalData.conselho.boolean")} value="nao" /> Não</label>
            <label><input required type="radio" {...register("personalData.conselho.boolean")} value="sim" /> Sim</label>
            <input type="text" {...register("personalData.conselho.qual")} placeholder="Qual(is)?" className="border p-1 w-60" />
          </div>
        </div>

        {/* Linha 6 – Endereço trabalho */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm">10. Endereço do trabalho</label>
            <input required type="text" {...register("personalData.enderecoTrabalho")} className="w-full border p-1" />
          </div>
          <div>
            <label className="block text-sm">CEP</label>
            <input required type="text" {...register("personalData.cepTrabalho")} className="w-full border p-1" />
          </div>
          <div>
            <label className="block text-sm">11. Telefone do trabalho</label>
            <input required type="tel" {...register("personalData.telTrabalho", { maxLength: {value: 11, message: "Insira no máximo 11 caracteres"}})} className="w-full border p-1" />
          </div>
        </div>

        {/* Linha 7 – Endereço residencial */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm">12. Endereço residencial</label>
            <input required type="text" {...register("personalData.enderecoResidencial")} className="w-full border p-1" />
          </div>
          <div>
            <label className="block text-sm">CEP</label>
            <input required type="text" {...register("personalData.cepResidencial")} className="w-full border p-1" />
          </div>
          <div>
            <label className="block text-sm">13. Telefone residencial</label>
            <input required type="tel" {...register("personalData.telResidencial", { maxLength: {value: 11, message: "Insira no máximo 11 caracteres"}})} className="w-full border p-1" />
          </div>
        </div>

        {/* Linha 8 – Email e celular */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm">14. E-mail</label>
            <input required type="email" {...register("personalData.email")} className="w-full border p-1" />
          </div>
          <div>
            <label className="block text-sm">15. Celular</label>
            <input required type="tel" {...register("personalData.celular")} className="w-full border p-1" />
          </div>
        </div>

        {/* Linha 9 – Endereço para correspondência e estado civil */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className='col-span-1'>
            <label className="block text-sm mb-2">16. Endereço para correspondências</label>
            <input required type="text" {...register("personalData.enderecoCorrespondencia")} className="w-full border p-1" />
          </div>
          <div className='col-span-2'>
            <label className="block text-sm mb-1">17. Estado Civil</label>
            <div className="flex items-center gap-4 flex-wrap">
              <label>
                <input required type="radio" {...register("personalData.estadoCivil.boolean")} value="casado" /> Casado
              </label>
              <label>
                <input required type="radio" {...register("personalData.estadoCivil.boolean")} value="solteiro" /> Solteiro
              </label>
              <label>
                <input required type="radio" {...register("personalData.estadoCivil.boolean")} value="outros" /> Outros
              </label>
              <input type="text" {...register("personalData.estadoCivil.qual")} placeholder="Qual?" className="border p-1 w-40" />
            </div>
          </div>
        </div>

        {/* Linha 10 – Cônjuge e atividade */}
        <div className="grid grid-cols-2 gap-4 mt-4 mb-2">
          <div>
            <label className="block text-sm">18. Cônjuge / Companheiro(a)</label>
            <input type="text" {...register("personalData.conjuge")} className="w-full border p-1" />
          </div>
          <div>
            <label className="block text-sm">19. Atividade profissional do cônjuge</label>
            <input type="text" {...register("personalData.atividadeConjuge")} className="w-full border p-1" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default PersonalDataCard;