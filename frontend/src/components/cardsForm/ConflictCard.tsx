"use client"
import { useForm, SubmitHandler } from "react-hook-form"

interface ConflictData {
  atividadeAdjacente: {boolean: string, qual: string},
  rendaExtra: {boolean: string, qual: string},
  potencialConflito: {boolean: string, descricao: string},
  valorBem: string
  }

const ConflictCard = () => {
  const { register, control, handleSubmit, watch, setValue } = useForm<ConflictData>()

  const atividadeAdjacente = watch("atividadeAdjacente.boolean");
  const rendaExtra = watch("rendaExtra.boolean");

  const onSubmit = (data: ConflictData) => {
    console.log(data)
  }

  return (
    <form className="py-3 px-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="border-2 px-4 py-2 rounded-t-lg">
        <p className="font-bold text-lg text-nowrap">IV - Situações que podem suscitar conflito com o interesse público</p>
      </div>
    
      <section className="flex flex-col gap-1 py-3 px-4 border-x border-b rounded-b-lg">

        <div className="col-span-2 py-2">
          <label className="block mb-1">
            32. Exerce outra(s) atividade(s) além do cargo, função ou emprego público?
          </label>
          <div className="flex items-center gap-4 flex-wrap">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                {...register("atividadeAdjacente.boolean")}
                value="nao"
              />
              Não
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                {...register("atividadeAdjacente.boolean")}
                value="sim"
              />
              Sim
            </label>

            {/* Input "Qual?" só aparece se radio === "sim" */}
            {atividadeAdjacente === "sim" && (
              <input
                type="text"
                placeholder="Qual?"
                {...register("atividadeAdjacente.qual")}
                className="border p-1 w-40 h-7"
              />
            )}
          </div>
        </div>

        <div className="col-span-2 py-2">
          <label className="block mb-1">
            33. Possui outra renda além do cargo, função ou emprego público?
          </label>
          <div className="flex items-center gap-4 flex-wrap">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                {...register("rendaExtra.boolean")}
                value="nao"
              />
              Não
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                {...register("rendaExtra.boolean")}
                value="sim"
              />
              Sim
            </label>

            {/* Input "Qual?" só aparece se radio === "sim" */}
            {rendaExtra === "sim" && (
              <input
                type="text"
                placeholder="Qual?"
                {...register("rendaExtra.qual")}
                className="border h-7 p-1 w-40"
              />
            )}
          </div>
        </div>

        <div className="col-span-2 py-2">
          <label className="block mb-1">
            34. Exerce outra(s) atividade(s) além do cargo, função ou emprego público?
          </label>
          <div className="flex items-center gap-4 flex-wrap">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                {...register("potencialConflito.boolean")}
                value="nao"
              />
              Não
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                {...register("potencialConflito.boolean")}
                value="sim"
              />
              Sim. Preencher campo 35
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                {...register("potencialConflito.boolean")}
                value="tem dúvida"
              />
              Tenho dúvida. Preencher campo 35
            </label>
          </div>
        </div>

        <div>
          <label className="block mb-1">
            35. Descrever a situação ou atividade, no caso de marcar “Sim” ou “Tenho dúvida” no campo 34.
          </label>
          <textarea
            {...register("potencialConflito.descricao")}
            className="border p-1 w-full h-20"
          />
        </div>

      {/* <button
        type="submit"
        className="ml-4 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
      >
        Enviar
      </button> */}
      </section>
    </form>
  )
}
export default ConflictCard;