import React from 'react';

interface DateInputProps {
  id: string;
  name: string;
  label: string;
}

export const DateInput: React.FC<DateInputProps> = ({ id, name, label }) => (
  <div className='flex flex-col'>
    <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
      {label}
    </label>
    <div className="mt-2">
      <input
        id={id}
        name={name}
        type="date"
        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  </div>
);