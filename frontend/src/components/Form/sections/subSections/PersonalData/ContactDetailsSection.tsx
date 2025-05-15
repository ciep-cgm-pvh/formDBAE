import { AddressField } from '@/components/ui/AdressField';
import { Input } from '@/components/ui/Input';
import { PhoneField } from '@/components/ui/PhoneField';
import React from 'react';


export const ContactDetailsSection = () => (
  <div>
    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
      <AddressField
        id="endereco-trabalho"
        name="endereco-trabalho"
        label="10. Endereço do trabalho"
        cepId="cep-trabalho"
        cepName="cep-trabalho"
      />
      <PhoneField id="telefone-trabalho" name="telefone-trabalho" label="11. Telefone do trabalho" />
      <AddressField
        id="endereco-residencial"
        name="endereco-residencial"
        label="12. Endereço residencial"
        cepId="cep-residencial"
        cepName="cep-residencial"
      />
      <PhoneField id="telefone-residencial" name="telefone-residencial" label="13. Telefone residencial" />
      <Input id="email" name="email" label="14. E-mail" />
      <PhoneField id="celular" name="celular" label="15. Celular" />
    </div>
  </div>
);