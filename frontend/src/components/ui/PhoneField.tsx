import React from 'react';

interface PhoneFieldProps {
  id: string;
  name: string;
  label: string;
}

export const PhoneField: React.FC<PhoneFieldProps> = ({ id, name, label }) => (
  <div className='flex flex-col'>
    <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
      {label}
    </label>
    <div className="mt-2">
      <input
        id={id}
        name={name}
        placeholder="(DDD) XXXX-XXXX"
        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  </div>
);