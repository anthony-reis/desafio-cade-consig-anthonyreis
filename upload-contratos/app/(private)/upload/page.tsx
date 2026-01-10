"use client";

import { UploadHeader } from "@/components/upload/upload-header";
import { FileDropzone } from "@/components/upload/file-dropzone";
import { UploadMessages } from "@/components/upload/upload-messages";
import { UploadActions } from "@/components/upload/upload-actions";
import { UploadInstructions } from "@/components/upload/upload-instructions";
import { CSVPreview } from "@/components/upload/csv-preview";
import { useUploadContrato } from "@/lib/hooks/use-upload-contrato";

export default function UploadPage() {
  const {
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
  } = useUploadContrato();

  return (
    <main className="p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        <UploadHeader />

        <FileDropzone
          file={file}
          isUploading={isUploading}
          isParsing={isParsing}
          success={success}
          onFileChange={handleFileChange}
          onClearFile={clearFile}
        />

        {showPreview && (
          <CSVPreview
            data={parsedData}
            hasErrors={hasErrors}
            errorCount={errorCount}
          />
        )}

        <UploadMessages error={error} success={success} />

        {file && !isParsing && (
          <UploadActions
            file={file}
            isUploading={isUploading}
            success={success}
            hasErrors={hasErrors}
            onUpload={handleUpload}
          />
        )}

        <UploadInstructions />
      </div>
    </main>
  );
}
