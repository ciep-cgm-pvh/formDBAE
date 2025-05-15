import { DateInput } from '../../../../ui/DateInput';
import { Input } from '../../../../ui/Input';


export const PersonalDetailsSection = () => (
  <div>
    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
      <Input id="nome-completo" name="nome-completo" label="1. Nome completo" />
      <DateInput id="data-nascimento" name="data-nascimento" label="2. Data de nascimento" />
      <Input id="formacao-profissional" name="formacao-profissional" label="3. Formação profissional" />
      <Input id="cargo" name="cargo" label="4. Cargo" />
    </div>
  </div>
);