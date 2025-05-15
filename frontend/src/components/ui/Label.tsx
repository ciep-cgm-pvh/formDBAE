import React from 'react';

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block mb-2 text-sm font-medium leading-none text-gray-900">
    {children}
  </label>
);