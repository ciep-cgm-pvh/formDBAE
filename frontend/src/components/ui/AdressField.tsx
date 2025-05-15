import React from 'react';

interface AddressFieldProps {
  id: string;
  name: string;
  label: string;
  cepId: string;
  cepName: string;
}

export const AddressField: React.FC<AddressFieldProps> = ({ id, name, label, cepId, cepName }) => (
  <div className='flex flex-col'>
    <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
      {label}
    </label>
    <div className="mt-2">
      <input
        id={id}
        name={name}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <div className="mt-2 flex gap-x-4">
        <input
          id={cepId}
          name={cepName}
          placeholder="CEP"
          className="block w-24 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <button type="button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Buscar
        </button>
      </div>
    </div>
  </div>
);