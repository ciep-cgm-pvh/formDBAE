"use client";

import React, { useState } from 'react';
// import JSZip from 'jszip';
// import { saveAs } from 'file-saver';
import { PhotoIcon } from '@heroicons/react/24/solid';

type FileUploadProps = {
  id: string;
  label: string;
  onFilesChange: (files: File[]) => void;
};

export const FileUpload: React.FC<FileUploadProps> = ({ id, label, onFilesChange }) => {
  const [ arquivos, setArquivos ] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).filter(
        (file) => file.type === 'application/pdf'
      );
      const newFiles = [ ...arquivos, ...filesArray ];
      setArquivos(newFiles);
      onFilesChange(newFiles);
    }
  };

  // const handleDownloadAll = async () => {
  //   if (arquivos.length === 0) return;

  //   const zip = new JSZip();

  //   // Função para ler um arquivo como ArrayBuffer
  //   const readFileAsync = (file: File): Promise<ArrayBuffer> => {
  //     return new Promise((resolve, reject) => {
  //       const reader = new FileReader();
  //       reader.onload = () => resolve(reader.result as ArrayBuffer);
  //       reader.onerror = () => reject(reader.error);
  //       reader.readAsArrayBuffer(file);
  //     });
  //   };

  //   // Lê todos os arquivos em paralelo
  //   try {
  //     const filesPromises = arquivos.map(async (file, index) => {
  //       const content = await readFileAsync(file);
  //       zip.file(file.name, content);
  //     });

  //     await Promise.all(filesPromises);

  //     // Gera o .zip
  //     const blob = await zip.generateAsync({ type: 'blob' });
  //     saveAs(blob, 'arquivos-selecionados.zip');
  //   } catch (error) {
  //     console.error('Erro ao ler arquivos:', error);
  //   }
  // };

  return (
    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-3">
      <div className="text-center w-full">
        <PhotoIcon aria-hidden="true" className="mx-auto size-8 text-gray-300" />
        <div className="mt-1 flex text-sm justify-center text-gray-600">
          <label
            htmlFor={id}
            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
          >
            <span>{label}</span>
            <input
              id={id}
              name={id}
              type="file"
              multiple
              accept=".pdf,application/pdf"
              className="sr-only"
              onChange={handleFileChange}
            />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs text-gray-600">PDF up to 10MB</p>

        {/* Lista de arquivos */}
        {arquivos.length > 0 && (
          <div className="mt-4 text-left">
            <strong className="block mb-1 text-sm">Arquivos selecionados:</strong>
            <ul className="list-disc pl-5 space-y-1 text-xs text-gray-700 max-h-24 overflow-y-auto">
              {arquivos.map((file, index) => (
                <li key={index}>
                  {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};