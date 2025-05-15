"use client"

import { useForm, useFieldArray, SubmitHandler } from "react-hook-form"

interface Atividade {
  atividade: string
  orgao: string
  remuneracao: string
}

interface AtividadeData {
  naoExerceuProfissao: boolean,
  statusProfissao: {boolean: string, qual: string},
}

interface FormData {
  atividades: Atividade[];
  statusProfissonal: AtividadeData
}

const PreviousActivitiesCard = () => {

  const { register, control, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      atividades: [
        { atividade: "", orgao: "", remuneracao: "" },
        { atividade: "", orgao: "", remuneracao: "" },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: "atividades",
    control,
  })

  const naoExerceu = watch("statusProfissonal.naoExerceuProfissao") === true;
  const atividadeAtual = watch("statusProfissonal.statusProfissao.boolean");

  const onSubmit = (data: FormData) => {
    console.log(data)
  }
  return (
    <form className="py-3 px-4" onSubmit={handleSubmit(onSubmit)}>
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
                {...register(`atividades.${index}.atividade`)}
                className="border p-1"
                placeholder="Atividade"
              />
              <input
                {...register(`atividades.${index}.orgao`)}
                className="border p-1"
                placeholder="Órgão"
              />
              <div className="flex items-center gap-1">
                <input
                  {...register(`atividades.${index}.remuneracao`)}
                  className="border p-1 w-full"
                  placeholder="R$0,00"
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
            className="bg-blue-500 w-fit flex self-end text-white text-sm px-3 py-1 mr-1 rounded hover:bg-blue-600"
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
              {...register("statusProfissonal.naoExerceuProfissao")}
              onChange={(e) => {
                const checked = e.target.checked;
                setValue("statusProfissonal.naoExerceuProfissao", checked);
                if (checked) {
                  setValue("statusProfissonal.statusProfissao.boolean", "");
                  setValue("statusProfissonal.statusProfissao.qual", "");
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
                  {...register("statusProfissonal.statusProfissao.boolean")}
                  value="nao"
                />{" "}
                Não
              </label>
              <label>
                <input
                  type="radio"
                  {...register("statusProfissonal.statusProfissao.boolean")}
                  value="sim"
                />{" "}
                Sim
              </label>

              {/* Input "Qual?" só aparece se radio === "sim" */}
              {atividadeAtual === "sim" && (
                <input
                  type="text"
                  placeholder="Qual?"
                  {...register("statusProfissonal.statusProfissao.qual")}
                  className="border p-1 w-40"
                />
              )}
            </div>
          </div>
        )}

      </section>

      {/* <button
        type="submit"
        className="ml-4 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
      >
        Enviar
      </button> */}
    </form>
  )
}
export default PreviousActivitiesCard;