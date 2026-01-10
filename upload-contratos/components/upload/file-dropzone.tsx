"use client";

import { Upload, FileText, X, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FileDropzoneProps {
  file: File | null;
  isUploading: boolean;
  isParsing: boolean;
  success: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearFile?: () => void;
}

export function FileDropzone({
  file,
  isUploading,
  isParsing,
  success,
  onFileChange,
  onClearFile,
}: FileDropzoneProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">
          Selecione o arquivo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-6 sm:p-8 text-center transition-colors ${
            file
              ? "border-primary bg-primary/5"
              : "border-gray-300 hover:border-gray-400"
          }`}
        >
          <input
            type="file"
            accept=".csv"
            onChange={onFileChange}
            className="hidden"
            id="file-upload"
            disabled={isUploading || success || isParsing}
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            {isParsing ? (
              <>
                <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-primary animate-spin mb-3" />
                <p className="text-sm font-medium text-gray-900">
                  Analisando arquivo...
                </p>
              </>
            ) : file ? (
              <>
                <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-3" />
                <p className="text-sm font-medium text-gray-900 break-all px-4">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
                {onClearFile && !isUploading && !success && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onClearFile();
                    }}
                    className="mt-3 text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    Remover arquivo
                  </button>
                )}
              </>
            ) : (
              <>
                <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mb-3" />
                <p className="text-sm font-medium text-gray-900">
                  Clique para selecionar um arquivo
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Apenas arquivos CSV
                </p>
              </>
            )}
          </label>
        </div>
      </CardContent>
    </Card>
  );
}
