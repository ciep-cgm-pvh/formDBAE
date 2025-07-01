'use client'; // Importante, pois usamos useState e useEffect

import { useEffect, useState } from 'react';

export default function ProcessingPage() {
  const messages = [
    'Enviando dados do formulário...',
    'Gerando PDF...',
    'Gerando PDF...',
    'Enviando ao e-mail...',
    'Enviando ao e-mail...',
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) =>
        prev >= messages.length - 1 ? 0 : prev + 1
      );
    }, 2500); // Alterna a cada 2.5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 px-4 text-center">
      {/* Spinner */}
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-6"></div>

      {/* Mensagem dinâmica */}
      <p className="text-xl font-medium text-gray-700 mb-6">
        {messages[currentMessageIndex]}
      </p>

    </div>
  );
}