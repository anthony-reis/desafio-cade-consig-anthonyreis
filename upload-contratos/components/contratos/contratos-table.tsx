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
import { type Contrato } from "@/hooks/use-contratos";
import { TableSkeleton, CardsSkeleton } from "./contratos-table-skeleton";

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
      <>
        <TableSkeleton />
        <CardsSkeleton />
      </>
    );
  }

  if (isEmpty) {
    return (
      <Card>
        <CardContent className="p-0">
          <div className="flex flex-col items-center justify-center h-64 px-4 text-gray-500">
            <p className="text-base font-medium text-center sm:text-lg">
              Nenhum contrato encontrado
            </p>
            <p className="mt-1 text-center text-xs sm:text-sm">
              {emptyMessage}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
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

      <div className="space-y-3 md:hidden">
        {contratos.map((contrato) => (
          <Card key={contrato.id_contrato}>
            <CardContent className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    {contrato.nome_cliente}
                  </p>
                  <p className="truncate text-xs text-gray-500">
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
                  <p className="mb-1 text-xs text-gray-500">Plano</p>
                  <Badge variant={getPlanoVariant(contrato.tipo_plano)}>
                    {contrato.tipo_plano}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Valor</p>
                  <p className="mt-1 font-semibold">
                    {formatarValor(parseFloat(contrato.valor_mensal))}
                  </p>
                </div>
              </div>

              <div className="border-t pt-2">
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
