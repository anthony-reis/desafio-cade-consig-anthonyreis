"use client";

import { CheckCircle, AlertCircle } from "lucide-react";

interface UploadMessagesProps {
  error: string | null;
  success: boolean;
}

export function UploadMessages({ error, success }: UploadMessagesProps) {
  if (!error && !success) return null;

  return (
    <div className="space-y-3">
      {error && (
        <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md text-xs sm:text-sm flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-green-50 text-green-700 px-4 py-3 rounded-md text-xs sm:text-sm flex items-center gap-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>Upload realizado com sucesso! Redirecionando...</span>
        </div>
      )}
    </div>
  );
}
