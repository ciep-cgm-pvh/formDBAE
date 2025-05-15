'use client';

import React from 'react';

interface CheckboxGroupProps {
  options: { id: string; label: string }[];
  onChange: (value: string) => void;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ options, onChange }) => (
  <div>
    {options.map(({ id, label }) => (
      <div key={id} className="flex items-center gap-x-3">
        <input
          id={id}
          name={id}
          type="checkbox"
          onChange={(e) => onChange(e.target.value)}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
        <label htmlFor={id} className="text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
      </div>
    ))}
  </div>
);