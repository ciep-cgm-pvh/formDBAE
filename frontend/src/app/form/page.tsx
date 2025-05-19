import FormClient from './../../components/FormClient'

const Form = () => {
  
  return (
    <div className="max-w-6xl px-4 mt-4">
      <section className='flex items-center mx-auto px-4'>
        <img src="/logo.png" alt="Logo" className="w-fit h-20 px-4" />
        <div className='w-full flex flex-col items-center justify-center'>
          <p className='font-bold text-xl'>PREFEITURA DO MUNICÍPIO DE PORTO VELHO</p>
          <p>Comissão de Ética Pública</p>
        </div>
      </section>

      <section className='flex flex-col items-center mx-auto px-4 pt-2'>
        <p className='font-bold py-2'>Anexo I – Formulário de Declaração de Informações de Bens e Atividades Econômicas</p>
        <div className="w-full py-3 flex flex-col justify-center items-center border">
          <p className='font-bold text-lg'>DECLARAÇÃO DE BENS E ATIVIDADES ECONÔMICAS OU PROFISSIONAIS – DBAE</p>
          <p className='text-sm'>
            (Formulário de acordo com o art. 14 do Decreto n.º 18.270, de 20 de julho de 2022.)
          </p>
          <p className='font-semibold text-center leading-4 pt-2'>Atenção: Todos os campos devem ser respondidos.<br/> Consulte as normas de preenchimento.</p>
        </div>
      </section>
      
      <FormClient />
    </div>
  )
}
export default Form;