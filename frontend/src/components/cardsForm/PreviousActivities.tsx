"use client"
import { useFormContext, useFieldArray, Controller } from "react-hook-form"

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function formatCurrency(value: string) {
  const numeric = value.replace(/\D/g, ""); // remove não números
  const formatted = (Number(numeric) / 100).toFixed(2);
  return currencyFormatter.format(Number(formatted));
}

const PreviousActivitiesCard = () => {
  const { register, control, watch, setValue } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    name: "previousActivities.atividades",
    control,
  })

  const naoExerceu = watch("previousActivities.statusProfissonal.naoExerceuProfissao") === true;
  const atividadeAtual = watch("previousActivities.statusProfissonal.statusProfissao.boolean");

  return (
    <div className="py-3 px-4">
      <div className="border-2 px-4 py-2 rounded-t-lg flex items-end">
        <p className="font-bold text-lg">II - Atividade(s) Anterior(es)</p>
        <p className="text-sm font-medium pl-1">- Atividades exercidadas nos últimos 12 meses antes da posse atual</p>
      </div>

      <section className="py-3 px-4 border-x border-b rounded-b-lg">
        <div className="flex flex-col"> {/*Tabela de atividades */}
          <div className="grid grid-cols-3 pb-2">
            <span className="px-1">20. Atividade</span>
            <span className="px-1">21. Órgão, Empresa, etc.</span>
            <span className="px-1">22. Remuneração/Renda</span>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-3 gap-2 items-center mb-2">
              <input
                {...register(`previousActivities.atividades.${index}.atividade`)}
                className="border p-1"
                placeholder="Atividade"
              />
              <input
                {...register(`previousActivities.atividades.${index}.orgao`)}
                className="border p-1"
                placeholder="Órgão"
              />
              <div className="flex items-center gap-1">
                <Controller
                  control={control}
                  name={`previousActivities.atividades.${index}.remuneracao`}
                  render={({ field: { onChange, value, ...rest } }) => (
                    <input
                      {...rest}
                      className="border p-1 w-full"
                      placeholder="R$0,00"
                      value={value}
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
            onClick={() => append({ atividade: "", orgao: "", remuneracao: "" })}
            className="bg-blue-500 w-fit flex self-end text-white text-sm px-3 py-1 mr-1 rounded hover:bg-blue-600 hover:cursor-pointer"
          >
            + Adicionar linha
          </button>
        </div>
        {/* Checkbox: Não exerci nenhuma atividade */}
        <div className="py-3">
          <label className="text-sm flex items-center gap-1">
            23.
            <input
              type="checkbox"
              {...register("previousActivities.statusProfissonal.naoExerceuProfissao")}
              onChange={(e) => {
                const checked = e.target.checked;
                setValue("previousActivities.statusProfissonal.naoExerceuProfissao", checked);
                if (checked) {
                  setValue("previousActivities.statusProfissonal.statusProfissao.boolean", "");
                  setValue("previousActivities.statusProfissonal.statusProfissao.qual", "");
                }
              }}/>
              Não exerci nenhuma atividade profissional neste período.
          </label>
        </div>

        {!naoExerceu && (
          <div className="col-span-2">
            <label className="block text-sm mb-1">
              24. Permanece exercendo alguma(s) atividade(s) citada(s) acima?
            </label>
            <div className="flex items-center gap-4 flex-wrap">
              <label>
                <input
                  type="radio"
                  {...register("previousActivities.statusProfissonal.statusProfissao.boolean")}
                  value="nao"
                />{" "}
                Não
              </label>
              <label>
                <input
                  type="radio"
                  {...register("previousActivities.statusProfissonal.statusProfissao.boolean")}
                  value="sim"
                />{" "}
                Sim
              </label>

              {/* Input "Qual?" só aparece se radio === "sim" */}
              {atividadeAtual === "sim" && (
                <input
                  type="text"
                  placeholder="Qual?"
                  {...register("previousActivities.statusProfissonal.statusProfissao.qual")}
                  className="border p-1 w-40"
                />
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
export default PreviousActivitiesCard;