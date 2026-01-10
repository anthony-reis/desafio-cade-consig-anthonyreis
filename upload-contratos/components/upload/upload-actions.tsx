"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, AlertTriangle } from "lucide-react";

interface UploadActionsProps {
  file: File | null;
  isUploading: boolean;
  success: boolean;
  hasErrors: boolean;
  onUpload: () => void;
}

export function UploadActions({
  file,
  isUploading,
  success,
  hasErrors,
  onUpload,
}: UploadActionsProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button
        onClick={onUpload}
        disabled={!file || isUploading || success}
        className="flex-1 h-10 sm:h-11"
        variant={hasErrors ? "destructive" : "default"}
      >
        {isUploading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Enviando...
          </>
        ) : hasErrors ? (
          <>
            <AlertTriangle className="w-4 h-4 mr-2" />
            Fazer Upload Mesmo Assim
          </>
        ) : (
          <>
            <Upload className="w-4 h-4 mr-2" />
            Fazer Upload
          </>
        )}
      </Button>
      <Button
        variant="outline"
        onClick={() => router.push("/")}
        disabled={isUploading}
        className="h-10 sm:h-11"
      >
        Cancelar
      </Button>
    </div>
  );
}
