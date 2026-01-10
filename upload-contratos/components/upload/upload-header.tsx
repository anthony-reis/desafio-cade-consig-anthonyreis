"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function UploadHeader() {
  const router = useRouter();

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.push("/")}
        className="shrink-0"
      >
        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </Button>
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
          Upload de Contratos
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Envie um arquivo CSV com os contratos
        </p>
      </div>
    </div>
  );
}
