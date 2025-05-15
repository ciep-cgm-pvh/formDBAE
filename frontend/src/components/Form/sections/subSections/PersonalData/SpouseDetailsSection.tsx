'use client';

import { Input } from '@/components/ui/Input';
import { RadioGroup } from '@/components/ui/RadioGroup';


export const SpouseDetailsSection = () => (
  <div>
    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
      <RadioGroup
        options={[
          { id: "estado-civil-casado", label: "Casado" },
          { id: "estado-civil-solteiro", label: "Solteiro" },
          { id: "estado-civil-outros", label: "Outros: Qual?" },
        ]}
        onChange={(value) => console.log(value)}
      />
      <Input id="conjugue" name="conjugue" label="18. Cônjuge / Companheiro (a)" />
      <Input id="atividade-conjugue" name="atividade-conjugue" label="19. Atividade profissional do cônjuge" />
    </div>
  </div>
);