import { AdditionalQuestionsSection } from './subSections/PersonalData/AdditionalQuestionsSection';
import { ContactDetailsSection } from './subSections/PersonalData/ContactDetailsSection';
import { PersonalDetailsSection } from './subSections/PersonalData/PersonalDetailsSection';
import { ProfessionalDetailsSection } from './subSections/PersonalData/ProfessionalDetailsSection';
import { SpouseDetailsSection } from './subSections/PersonalData/SpouseDetailsSection';

export const PersonalInformationSection = () => (
  <div>
    <blockquote className="flex flex-col items-center justify-center text-center text-xl font-semibold leading-8 text-gray-900">
      <h1 className="w-full py-4 text-2xl font-extrabold tracking-tight text-white bg-slate-500 rounded-lg shadow-md">
        I - DADOS PESSOAIS
      </h1>
      <p className="mt-4 text-lg text-gray-700">
        Preencha os campos abaixo com as informações pessoais do(a) candidato(a).
      </p>
    </blockquote>
    <PersonalDetailsSection />
    <ProfessionalDetailsSection />
    <AdditionalQuestionsSection />
    <ContactDetailsSection />
    <SpouseDetailsSection />
  </div>
);