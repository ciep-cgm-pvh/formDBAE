"use client"
import { useFieldArray, useFormContext, Controller } from "react-hook-form"

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function formatCurrency(value: string) {
  const numeric = value.replace(/\D/g, ""); // remove não números
  const formatted = (Number(numeric) / 100).toFixed(2);
  return currencyFormatter.format(Number(formatted));
}

const BensDireitosCard = () => {
  const { register, control, watch } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    name: "bensEDireitos.bens",
    control,
  })

  const participacaoAtual = watch("bensEDireitos.checkboxBens.participacao5perc.boolean");
  const familiarProprietario = watch("bensEDireitos.checkboxBens.familiarProprietario.boolean");

  return (
    <div className="py-3 px-4">
      <div className="border-2 px-4 py-2 rounded-t-lg flex gap-1 items-center sm:items-end">
        <p className="font-bold text-lg text-nowrap">III - Bens e Direitos</p>
        <p className="text-sm font-medium tracking-tighter">- Bens e direitos pessoais ou entrega de cópia da declaração de imposto de renda da RFB</p>
      </div>
    
      <section className="py-3 px-4 border-x border-b rounded-b-lg">
      <div className="flex flex-col"> {/*Tabela de atividades */}
          <div className="grid grid-cols-4 pb-2 items-center">
            <span className="px-1">25. Tipo</span>
            <span className="px-1 col-span-2 leading-5">26. Administrador, se terceiro, e parentesco com o declarante.</span>
            <span className="px-1">27. Valor do bem</span>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-4 gap-2 items-center mb-2">
              <input
                {...register(`bensEDireitos.bens.${index}.tipo`)}
                className="border p-1"
                placeholder="Tipo"
              />
              <input
                {...register(`bensEDireitos.bens.${index}.administrador`)}
                className="border p-1 col-span-2"
                placeholder="Administrador"
              />
              <div className="flex items-center gap-1">
                <Controller
                  control={control}
                  name={`previousActivities.atividades.${index}.valorBem`}
                  render={({ field: { onChange, value, ...rest } }) => (
                    <input
                      {...rest}
                      className="border p-1 w-full"
                      placeholder="R$0,00"
                      value={value ?? ""}
                      onChange={(e) => {
                        const rawValue = e.target.value;
                        const numeric = rawValue.replace(/\D/g, "");
                        const formatted = new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(Number(numeric) / 100);
                        onChange(formatted);
                      }}
                    />
                  )}
                />
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-600 font-bold px-2 hover:text-red-800"
                    title="Remover linha"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ tipo: "", administrador: "", valorBem: "" })}
            className="bg-blue-500 w-fit flex self-end text-white text-sm px-3 py-1 mr-1 rounded hover:bg-blue-600 hover:cursor-pointer"
          >
            + Adicionar linha
          </button>
        </div>

        <div className="col-span-2 py-2">
            <label className="block text-sm mb-1">
              28. Possui participação superior a 5% (cinco por cento) do capital social ou votante de sociedade de economia mista, instituição financeira ou empresa que negocie com o Poder Executivo do Município de Porto Velho?
            </label>
            <div className="flex items-center gap-4 flex-wrap">
              <label>
                <input
                  type="radio"
                  {...register("bensEDireitos.checkboxBens.participacao5perc.boolean")}
                  value="nao"
                />{" "}
                Não
              </label>
              <label>
                <input
                  type="radio"
                  {...register("bensEDireitos.checkboxBens.participacao5perc.boolean")}
                  value="sim"
                />{" "}
                Sim
              </label>

              {/* Input "Qual?" só aparece se radio === "sim" */}
              {participacaoAtual === "sim" && (
                <input
                  type="text"
                  placeholder="Qual?"
                  {...register("bensEDireitos.checkboxBens.participacao5perc.qual")}
                  className="border p-1 w-40"
                />
              )}
            </div>
          </div>

        <div className="py-2">
          <label className="text-sm flex items-center gap-1">
            29.
            <input
              type="checkbox"
              {...register("bensEDireitos.checkboxBens.naoPossuiBem")} />
              Não possuo nenhum bem ou direito. 
          </label>
          <label className="text-sm flex items-center gap-1 py-1">
            30.
            <input
              type="checkbox"
              {...register("bensEDireitos.checkboxBens.naoPossuiBemAlemDoRFB")} />
              Não possuo bem ou direito além dos constantes na declaração de imposto de renda da RFB
          </label>
        </div>

        <div className="col-span-2">
            <label className="block text-sm mb-1">
              31. Possui familiar proprietário de instituição cuja atividade está relacionada ao campo de atuação do órgão/entidade em que tomou posse atualmente? 
            </label>
            <div className="flex items-center gap-4 flex-wrap">
              <label>
                <input
                  type="radio"
                  {...register("bensEDireitos.checkboxBens.familiarProprietario.boolean")}
                  value="nao"
                />{" "}
                Não
              </label>
              <label>
                <input
                  type="radio"
                  {...register("bensEDireitos.checkboxBens.familiarProprietario.boolean")}
                  value="sim"
                />{" "}
                Sim
              </label>

              {/* Input "Qual?" só aparece se radio === "sim" */}
              {familiarProprietario === "sim" && (
                <input
                  type="text"
                  placeholder="Qual?"
                {...register("bensEDireitos.checkboxBens.familiarProprietario.qual")}
                  className="border p-1 w-40"
                />
              )}
            </div>
          </div>
      </section>
    </div>
  )
}

export default BensDireitosCard;