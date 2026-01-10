"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ContratosPaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function ContratosPagination({
  page,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: ContratosPaginationProps) {
  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 py-4 border rounded-lg bg-white">
      <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
        Mostrando <span className="font-medium">{startItem}</span> a{" "}
        <span className="font-medium">{endItem}</span> de{" "}
        <span className="font-medium">{totalItems}</span> resultado(s)
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="h-8"
        >
          <ChevronLeft className="h-4 w-4 sm:mr-1" />
          <span className="hidden sm:inline">Anterior</span>
        </Button>
        <span className="flex items-center gap-1 px-2 sm:px-3 text-xs sm:text-sm text-gray-600">
          <span className="hidden sm:inline">Página</span>
          <span>
            {page} / {totalPages || 1}
          </span>
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="h-8"
        >
          <span className="hidden sm:inline">Próxima</span>
          <ChevronRight className="h-4 w-4 sm:ml-1" />
        </Button>
      </div>
    </div>
  );
}
