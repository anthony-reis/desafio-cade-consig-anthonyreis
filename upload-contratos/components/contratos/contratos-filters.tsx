"use client";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KeyboardEvent, useState } from "react";

interface ContratosFiltersProps {
  filtros: string[];
  status: string;
  onAdicionarFiltro: (value: string) => void;
  onRemoverFiltro: (value: string) => void;
  onStatusChange: (value: string) => void;
  onLimparFiltros: () => void;
  resultadosCount: number;
}

export function ContratosFilters({
  filtros,
  status,
  onAdicionarFiltro,
  onRemoverFiltro,
  onStatusChange,
  onLimparFiltros,
  resultadosCount,
}: ContratosFiltersProps) {
  const [inputPesquisa, setInputPesquisa] = useState("");

  const temFiltrosAtivos = filtros.length > 0 || status !== "all";

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputPesquisa.trim()) {
      e.preventDefault();
      onAdicionarFiltro(inputPesquisa);
      setInputPesquisa("");
    }
  };

  const handleAdicionarClick = () => {
    onAdicionarFiltro(inputPesquisa);
    setInputPesquisa("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-base sm:text-lg">
          <span>Filtros</span>
          {temFiltrosAtivos && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onLimparFiltros}
              className="h-8 text-xs"
            >
              Limpar todos
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Digite e pressione Enter para adicionar filtro..."
                  value={inputPesquisa}
                  onChange={(e) => setInputPesquisa(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="pl-9 pr-3"
                />
              </div>
              <Button
                size="icon"
                variant="secondary"
                onClick={handleAdicionarClick}
                disabled={!inputPesquisa.trim()}
                className="h-10 w-10 shrink-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="hidden flex-wrap gap-2 text-xs text-gray-500 sm:flex">
              <span>Exemplos:</span>
              <button
                onClick={() => {
                  onAdicionarFiltro("cliente");
                }}
                className="underline hover:text-gray-700"
              >
                cliente
              </button>
              <span>•</span>
              <button
                onClick={() => {
                  onAdicionarFiltro("50");
                }}
                className="underline hover:text-gray-700"
              >
                50
              </button>
              <span>•</span>
              <button
                onClick={() => {
                  onAdicionarFiltro("2024");
                }}
                className="underline hover:text-gray-700"
              >
                2024
              </button>
              <span>•</span>
              <button
                onClick={() => {
                  onAdicionarFiltro("enterprise");
                }}
                className="underline hover:text-gray-700"
              >
                enterprise
              </button>
            </div>
          </div>

          {filtros.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {filtros.map((filtro) => (
                <Badge
                  key={filtro}
                  variant="default"
                  className="gap-1.5 px-3 py-1.5 text-sm"
                >
                  {filtro}
                  <button
                    onClick={() => onRemoverFiltro(filtro)}
                    className="hover:bg-white/20 rounded-full"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              <SelectItem value="ATIVO">Ativo</SelectItem>
              <SelectItem value="INATIVO">Inativo</SelectItem>
            </SelectContent>
          </Select>

          {temFiltrosAtivos && (
            <div className="flex items-center justify-between border-t pt-3">
              <span className="text-xs text-gray-500">
                {filtros.length} filtro(s) ativo(s)
                {status !== "all" && " + status"}
              </span>
              <span className="text-sm font-medium">
                {resultadosCount} resultado(s)
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
