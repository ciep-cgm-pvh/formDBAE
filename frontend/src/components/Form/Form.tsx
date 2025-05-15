import { PersonalInformationSection } from './sections/PersonalInformationSection';

const Form = () => (
  <form className="space-y-8 border p-6 my-2 rounded-lg shadow-lg ">
    <PersonalInformationSection />
    {/* Add other sections here */}
    <div className="mt-6 flex items-center justify-end gap-x-6">
      <button type="button" className="text-sm font-semibold text-gray-900">
        Cancelar
      </button>
      <button
        type="submit"
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Enviar
      </button>
    </div>
  </form>
);

export default Form;