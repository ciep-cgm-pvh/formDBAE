import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 px-4 text-center">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Formulário enviado com sucesso!</h1>
      <p className="text-gray-700 mb-6">Recebemos suas informações e os arquivos foram processados corretamente.</p>
      <Link
        href="/form"
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition-colors"
      >
        Voltar para o formulário
      </Link>
    </div>
  );
}
