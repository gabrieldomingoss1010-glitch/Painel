"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
      <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-xl max-w-lg">
        <h2 className="text-xl font-bold mb-4">Algo deu errado!</h2>
        <p className="text-sm mb-4 bg-black/20 p-3 rounded font-mono text-left break-words">
          {error.message || "Erro desconhecido"}
        </p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
