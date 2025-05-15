import React from 'react';

interface RadioGroupProps {
  options: { id: string; label: string }[];
  onChange: (value: string) => void;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ options, onChange }) => (
  <div>
    {options.map(({ id, label }) => (
      <div key={id} className="flex items-center gap-x-3">
        <input
          id={id}
          name="radio-group"
          type="radio"
          value={id}
          onChange={(e) => onChange(e.target.value)}
          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
        <label htmlFor={id} className="text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
      </div>
    ))}
  </div>
);