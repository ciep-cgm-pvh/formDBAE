import React from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';

interface FileUploadProps {
  id: string;
  label: string;
  accept?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ id, label, accept }) => (
  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
    <div className="text-center">
      <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
      <div className="mt-4 flex text-sm/6 text-gray-600">
        <label
          htmlFor={id}
          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
        >
          <span>{label}</span>
          <input id={id} name={id} type="file" accept={accept} className="sr-only" />
        </label>
        <p className="pl-1">or drag and drop</p>
      </div>
      <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
    </div>
  </div>
);