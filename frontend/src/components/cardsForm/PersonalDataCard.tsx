"use client"
import { fetchAddressByCep } from '@/utils/fetchCep';
import { useEffect } from 'react';
import { useFormContext, Controller, useWatch } from 'react-hook-form';
import { IMaskInput } from "react-imask";

const PersonalDataCard = () => {
  const { register, control, setValue, formState: { errors } } = useFormContext()

  // Monitorando os campos de CEP
  const cepResidencial = useWatch({ control, name: "personalData.cepResidencial" });
  const cepTrabalho = useWatch({ control, name: "personalData.cepTrabalho" });

  // Efeito para buscar o endereço do CEP residencial
  useEffect(() => {
    const fetchEndereco = async (cep: string, targetField: "personalData.enderecoResidencial" | "personalData.enderecoTrabalho") => {
      const sanitizedCep = cep?.replace(/\D/g, "");
      if (sanitizedCep?.length === 8) {
        try {
          const res = await fetch(`https://viacep.com.br/ws/${sanitizedCep}/json/`);
          const data = await res.json();
          if (!data.erro) {
            const enderecoCompleto = `${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}`;
            setValue(targetField, enderecoCompleto);
          }
        } catch (error) {
          console.error("Erro ao buscar o CEP:", error);
        }
      }
    };

    if (cepResidencial) {
      fetchEndereco(cepResidencial, "personalData.enderecoResidencial");
    }
  }, [ cepResidencial, setValue ]);

  // Efeito para buscar o endereço do CEP do trabalho
  useEffect(() => {
    if (cepTrabalho) {
      const sanitizedCep = cepTrabalho.replace(/\D/g, "");
      if (sanitizedCep.length === 8) {
        fetch(`https://viacep.com.br/ws/${sanitizedCep}/json/`)
          .then(res => res.json())
          .then(data => {
            if (!data.erro) {
              const enderecoCompleto = `${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}`;
              setValue("personalData.enderecoTrabalho", enderecoCompleto);
            }
          })
          .catch(error => console.error("Erro ao buscar o CEP:", error));
      }
    }
  }, [ cepTrabalho, setValue ]);
  return (
    <div className='px-4 py-2'>
      <div className="border-2 px-4 py-2 rounded-t-lg flex items-end">
        <p className="font-bold text-lg">I - Dados Pessoais </p>
      </div>
      <section className="py-3 px-4 border-x border-b rounded-b-lg">
        {/* Linha 1 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">1. Nome completo<span className="text-red-500 ml-1">*</span></label>
            <input type="text" required {...register("personalData.nome")} className="w-full border px-2 py-1"/>
          </div>
          <div>
            <label className="block text-sm">2. Data de nascimento<span className="text-red-500 ml-1">*</span></label>
            <input type="date" required {...register("personalData.nascimento")} className="w-full border px-2 py-1" />
          </div>
        </div>

        {/* Linha 2 */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm">3. CPF<span className="text-red-500 ml-1">*</span> </label>
            {/* <input type="text" required {...register("personalData.cpf")} className="w-full border px-2 py-1" /> */}
            <Controller
              name="personalData.cpf"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <IMaskInput
                  {...field}
                  mask="000.000.000-00"
                  placeholder="___.___.___-__"
                  className="w-full border px-2 py-1"
                  // onAccept para atualizar valor no react-hook-form
                  onAccept={(value: string) => field.onChange(value)}
                />
              )}
            />
          </div>
          <div>
            <label className="block text-sm">4. Formação profissional<span className="text-red-500 ml-1">*</span></label>
            <input type="text" required {...register("personalData.formacaoProfissional")} className="w-full border px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm">5. Cargo comissionado<span className="text-red-500 ml-1">*</span></label>
            <input type="text" required {...register("personalData.cargo")} className="w-full border px-2 py-1" />
          </div>
        </div>

        {/* Linha 3 */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm">6. Órgão / Entidade<span className="text-red-500 ml-1">*</span></label>
            <input type="text" required {...register("personalData.orgao")} className="w-full border px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm">5. Cargo efetivo</label>
            <input type="text" {...register("personalData.cargoEfetivo")} className="w-full border px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm">7. Data da nomeação/designação<span className="text-red-500 ml-1">*</span></label>
            <input type="date" required {...register("personalData.dataNomeacao")} className="w-full border px-2 py-1" />
          </div>
        </div>

        {/* Linha 4 – Cargo público */}
        <div className="grid grid-cols-4 md:grid-cols-3 gap-4 mt-4">
          <div className='col-span-2'>
            <label className="block text-sm mb-1">
              8. Ocupa outro cargo ou emprego de quadro permanente na Administração Pública em outro órgão?
            </label>
            <div className="flex items-center gap-4 flex-wrap">
              <label>
                <input type="radio" {...register("personalData.cargoPublico.boolean")} value="nao" /> Não
              </label>
              <label>
                <input type="radio" {...register("personalData.cargoPublico.boolean")} value="sim" /> Sim
              </label>
              <input type="text" placeholder="Qual?" {...register("personalData.cargoPublico.qual")} className="border px-2 py-1 w-40" />
            </div>
          </div>
          <div className='col-span-2 md:col-span-1'>
            <label className="block text-sm mb-1">
              Órgão/entidade de origem:
            </label>
            <input type="text" {...register("personalData.orgaoOrigem")} placeholder="Órgão/entidade de origem" className="border px-2 py-1 w-60" />
          </div>
        </div>

        {/* Linha 5 – Conselho */}
        <div className="mt-4">
          <label className="block text-sm mb-1">
            9. É membro de Conselho Municipal ou Conselho de Empresa Municipal?
          </label>
          <div className="flex items-center gap-4 flex-wrap">
            <label><input type="radio" {...register("personalData.conselho.boolean")} value="nao" /> Não</label>
            <label><input type="radio" {...register("personalData.conselho.boolean")} value="sim" /> Sim</label>
            <input type="text" {...register("personalData.conselho.qual")} placeholder="Qual(is)?" className="border px-2 py-1 w-60" />
          </div>
        </div>

        {/* Linha 6 – Endereço trabalho */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm">10. Endereço do trabalho<span className="text-red-500 ml-1">*</span></label>
            <input type="text" required {...register("personalData.enderecoTrabalho")} className="w-full border px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm">CEP<span className="text-red-500 ml-1">*</span></label>
            <Controller
            name="personalData.cepTrabalho"
            control={control}
            render={({ field }) => (
              <IMaskInput
                id="cepTrabalho"
                mask="00000-000"
                {...field}
                onAccept={(value) => field.onChange(value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            )}
          />
          {(errors.personalData as any)?.cepTrabalho && (
              <span className="text-red-500 text-sm">{(errors.personalData as any).cepTrabalho.message as string}</span>
          )}
          </div>
          <div>
            <label className="block text-sm">11. Telefone do trabalho<span className="text-red-500 ml-1">*</span></label>
            <Controller
              name="personalData.telTrabalho"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <IMaskInput
                  {...field}
                  mask="(00)0000-0000"
                  placeholder="(00)0000-0000"
                  className="w-full border px-2 py-1"
                  onAccept={(value: string) => field.onChange(value)}
                />
              )}
            />
          </div>
        </div>

        {/* Linha 7 – Endereço residencial */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm">12. Endereço residencial<span className="text-red-500 ml-1">*</span></label>
            <input type="text" required {...register("personalData.enderecoResidencial")} className="w-full border px-2 py-1"/>
          </div>
          <div>
            <label className="block text-sm">CEP<span className="text-red-500 ml-1">*</span></label>
            <Controller
              name="personalData.cepResidencial"
              control={control}
              render={({ field }) => (
                <IMaskInput
                  id="cepResidencial"
                  mask="00000-000"
                  {...field}
                  onAccept={(value) => field.onChange(value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              )}
            />
            {(errors.personalData as any)?.cepResidencial && (
              <span className="text-red-500 text-sm">{(errors.personalData as any).cepResidencial.message as string}</span>
            )}
          </div>
          <div>
            <label className="block text-sm">13. Telefone residencial<span className="text-red-500 ml-1">*</span></label>
            <Controller
              name="personalData.telResidencial"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <IMaskInput
                  {...field}
                  mask="(00)0000-0000"
                  placeholder="(00)0000-0000"
                  className="w-full border px-2 py-1"
                  onAccept={(value: string) => field.onChange(value)}
                />
              )}
            />
          </div>
        </div>

        {/* Linha 8 – Email e celular */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm">14. E-mail<span className="text-red-500 ml-1">*</span></label>
            <input 
              type="email" 
              required
              placeholder='usuario@exemplo.com'
              {...register("personalData.email", {
                required: "O e-mail é obrigatório.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Formato de e-mail inválido.",
                },
              })}
              className="w-full border px-2 py-1"
            />
            {(errors.personalData as any)?.email && (
              <span className="text-red-500 text-sm">
                {(errors.personalData as any).email.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm">15. Celular</label>
            <Controller
              name="personalData.celular"
              control={control}
              render={({ field }) => (
                <IMaskInput
                  {...field}
                  mask="(00)00000-0000"
                  placeholder="(00)00000-0000"
                  className="w-full border px-2 py-1"
                  onAccept={(value: string) => field.onChange(value)}
                />
              )}
            />
          </div>
        </div>

        {/* Linha 9 – Endereço para correspondência e estado civil */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className='col-span-1'>
            <label className="block text-sm mb-2">16. Endereço para correspondências<span className="text-red-500 ml-1">*</span></label>
            <input type="text" required {...register("personalData.enderecoCorrespondencia")} className="w-full border px-2 py-1" />
          </div>
          <div className='col-span-2'>
            <label className="block text-sm mb-1">17. Estado Civil<span className="text-red-500 ml-1">*</span></label>
            <div className="flex items-center gap-4 flex-wrap">
              <label>
                <input type="radio" required {...register("personalData.estadoCivil.boolean")} value="casado" /> Casado
              </label>
              <label>
                <input type="radio" {...register("personalData.estadoCivil.boolean")} value="solteiro" /> Solteiro
              </label>
              <label>
                <input type="radio" {...register("personalData.estadoCivil.boolean")} value="outros" /> Outros
              </label>
              <input type="text" {...register("personalData.estadoCivil.qual")} placeholder="Qual?" className="border px-2 py-1 w-40" />
            </div>
          </div>
        </div>

        {/* Linha 10 – Cônjuge e atividade */}
        <div className="grid grid-cols-2 gap-4 mt-4 mb-2">
          <div>
            <label className="block text-sm">18. Cônjuge / Companheiro(a)</label>
            <input type="text" {...register("personalData.conjuge")} className="w-full border px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm">19. Atividade profissional do cônjuge</label>
            <input type="text" {...register("personalData.atividadeConjuge")} className="w-full border px-2 py-1" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default PersonalDataCard;