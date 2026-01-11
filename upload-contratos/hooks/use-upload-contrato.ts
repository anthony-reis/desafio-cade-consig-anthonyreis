import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { contratosService } from "@/lib/services/contratos-service";
import Papa from "papaparse";
import { contratoSchema, type ParsedRow } from "@/lib/types/contract";
import { toast } from "sonner";

export function useUploadContrato() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<ParsedRow[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.name.endsWith(".csv")) {
        setError("Por favor, selecione um arquivo CSV");
        return;
      }
      setFile(selectedFile);
      setError(null);
      setSuccess(false);
      setParsedData([]);
      setShowPreview(false);

      parseCSV(selectedFile);
    }
  }

  function parseCSV(file: File) {
    setIsParsing(true);
    setError(null);

    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows: ParsedRow[] = results.data.map((row, index) => {
          try {
            const validation = contratoSchema.safeParse(row);

            if (validation.success) {
              return {
                data: validation.data,
                errors: {},
                rowIndex: index + 1,
              };
            } else {
              const errors: Record<string, string> = {};
              validation.error.issues.forEach((issue) => {
                const field = issue.path[0];
                if (field) {
                  errors[String(field)] = issue.message;
                }
              });
              return {
                data: row as any,
                errors,
                rowIndex: index + 1,
              };
            }
          } catch (err) {
            console.error("Erro ao validar linha:", err);
            return {
              data: row as any,
              errors: { _error: "Erro ao processar linha" },
              rowIndex: index + 1,
            };
          }
        });
        toast.success("Arquivo CSV analisado com sucesso!");
        setParsedData(rows);
        setShowPreview(true);
        setIsParsing(false);
      },
      error: (error) => {
        setError("Erro ao ler arquivo CSV: " + error.message);
        setIsParsing(false);
      },
    });
  }

  function clearFile() {
    setFile(null);
    setError(null);
    setSuccess(false);
    setParsedData([]);
    setShowPreview(false);
  }

  const hasErrors = parsedData.some(
    (row) => Object.keys(row.errors).length > 0
  );
  const errorCount = parsedData.filter(
    (row) => Object.keys(row.errors).length > 0
  ).length;

  async function handleUpload() {
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      await contratosService.upload(file);
      setSuccess(true);

      await queryClient.invalidateQueries({ queryKey: ["contratos"] });

      toast.success("Arquivo enviado com sucesso!");
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1500);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao fazer upload";
      setError(errorMessage);
      toast.error("Erro ao enviar arquivo: " + errorMessage);
    } finally {
      setIsUploading(false);
    }
  }

  return {
    file,
    isUploading,
    isParsing,
    success,
    error,
    parsedData,
    showPreview,
    hasErrors,
    errorCount,
    handleFileChange,
    handleUpload,
    clearFile,
  };
}
