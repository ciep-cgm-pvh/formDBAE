import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';

interface SelectProps {
  id: string;
  name: string;
  autoComplete?: string;
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({ id, name, autoComplete, children }) => (
  <div className="relative">
    <select
      id={id}
      name={name}
      autoComplete={autoComplete}
      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
    >
      {children}
    </select>
    <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
  </div>
);