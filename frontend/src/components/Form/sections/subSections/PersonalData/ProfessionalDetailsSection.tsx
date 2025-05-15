import { DateInput } from '@/components/ui/DateInput';
import { Input } from '@/components/ui/Input';
import React from 'react';


export const ProfessionalDetailsSection = () => (
  <div>
    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
      <Input id="cargo-efetivo" name="cargo-efetivo" label="5. Cargo Efetivo" />
      <Input id="orgao-entidade" name="orgao-entidade" label="6. Órgão / Entidade" />
      <DateInput id="data-nomeacao" name="data-nomeacao" label="7. Data da nomeação/designação." />
    </div>
  </div>
);