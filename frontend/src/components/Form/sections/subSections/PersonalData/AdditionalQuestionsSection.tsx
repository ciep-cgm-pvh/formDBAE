'use client';

import { CheckboxGroup } from '@/components/ui/CheckboxGroup';

export const AdditionalQuestionsSection = () => (
  <div>
    <div className="mt-10">
      <CheckboxGroup
        options={[
          { id: "ocupa-outro-cargo-nao", label: "Não" },
          { id: "ocupa-outro-cargo-sim", label: "Sim. Qual?" },
        ]}
        onChange={(value) => console.log(value)}
      />
      <span className="ml-2">Ocupa outro cargo ou emprego de quadro permanente na Administração Pública?</span>
    </div>
    <div className="mt-4">
      <CheckboxGroup
        options={[
          { id: "membro-conselho-nao", label: "Não" },
          { id: "membro-conselho-sim", label: "Sim. Qual(is)?" },
        ]}
        onChange={(value) => console.log(value)}
      />
      <span className="ml-2">É membro de Conselho Municipal ou Conselho de Empresa Municipal?</span>
    </div>
  </div>
);