"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Upload, RefreshCw } from "lucide-react";

interface ContratosHeaderProps {
  totalContratos: number;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export function ContratosHeader({
  totalContratos,
  onRefresh,
  isRefreshing,
}: ContratosHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Contratos</h1>
        <p className="text-gray-500 mt-1 text-xs">
          {totalContratos} contrato(s) no total
        </p>
      </div>
      <div className="flex gap-2 px-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw
            className={`w-2 h-2 ${isRefreshing ? "animate-spin" : ""}`}
          />
        </Button>
        <Button
          size="lg"
          onClick={() => router.push("/upload")}
          className="flex items-center text-xs gap-2"
        >
          <Upload className="w-2 h-2" />
          Upload CSV
        </Button>
      </div>
    </div>
  );
}
