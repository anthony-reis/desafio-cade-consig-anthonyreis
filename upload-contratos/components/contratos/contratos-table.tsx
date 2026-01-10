"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { type Contrato } from "@/lib/hooks/use-contratos";

interface ContratosTableProps {
  contratos: Contrato[];
  isLoading: boolean;
  isEmpty: boolean;
  emptyMessage: string;
}

export function ContratosTable({
  contratos,
  isLoading,
  isEmpty,
  emptyMessage,
}: ContratosTableProps) {
  function formatarValor(valor: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  }

  function formatarData(data: string) {
    return new Date(data).toLocaleDateString("pt-BR");
  }

  function getStatusVariant(
    status: string
  ): "default" | "secondary" | "outline" {
    switch (status) {
      case "ATIVO":
        return "default";
      case "INATIVO":
        return "secondary";
      default:
        return "outline";
    }
  }

  function getPlanoVariant(
    plano: string
  ): "enterprise" | "pro" | "basic" | "secondary" {
    switch (plano) {
      case "ENTERPRISE":
        return "enterprise";
      case "PRO":
        return "pro";
      case "BASIC":
        return "basic";
      default:
        return "secondary";
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-0">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isEmpty) {
    return (
      <Card>
        <CardContent className="p-0">
          <div className="flex flex-col items-center justify-center h-64 text-gray-500 px-4">
            <p className="text-base sm:text-lg font-medium text-center">
              Nenhum contrato encontrado
            </p>
            <p className="text-xs sm:text-sm mt-1 text-center">
              {emptyMessage}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <Card className="hidden md:block">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Plano</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data Início</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contratos.map((contrato) => (
                <TableRow key={contrato.id_contrato}>
                  <TableCell className="font-medium">
                    {contrato.nome_cliente}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {contrato.email_cliente}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPlanoVariant(contrato.tipo_plano)}>
                      {contrato.tipo_plano}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatarValor(parseFloat(contrato.valor_mensal))}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(contrato.status)}>
                      {contrato.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatarData(contrato.data_inicio)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {contratos.map((contrato) => (
          <Card key={contrato.id_contrato}>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">
                    {contrato.nome_cliente}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {contrato.email_cliente}
                  </p>
                </div>
                <Badge
                  variant={getStatusVariant(contrato.status)}
                  className="shrink-0"
                >
                  {contrato.status}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Plano</p>
                  <Badge variant={getPlanoVariant(contrato.tipo_plano)}>
                    {contrato.tipo_plano}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Valor</p>
                  <p className="font-semibold mt-1">
                    {formatarValor(parseFloat(contrato.valor_mensal))}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t">
                <p className="text-xs text-gray-500">
                  Início: {formatarData(contrato.data_inicio)}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
