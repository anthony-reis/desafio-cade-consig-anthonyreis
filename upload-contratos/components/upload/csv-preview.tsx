"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { type ParsedRow } from "@/lib/types/contract";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CSVPreviewProps {
  data: ParsedRow[];
  hasErrors: boolean;
  errorCount: number;
}

export function CSVPreview({ data, hasErrors, errorCount }: CSVPreviewProps) {
  if (data.length === 0) return null;

  const previewLimit = 10;
  const previewData = data.slice(0, previewLimit);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg">
            Preview do Arquivo
          </CardTitle>
          <div className="flex items-center gap-2">
            {hasErrors ? (
              <Badge variant="destructive" className="gap-1">
                <AlertTriangle className="w-3 h-3" />
                {errorCount} erro(s)
              </Badge>
            ) : (
              <Badge variant="default" className="gap-1">
                <CheckCircle className="w-3 h-3" />
                Válido
              </Badge>
            )}
          </div>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Mostrando {previewData.length} de {data.length} registro(s)
        </p>
      </CardHeader>
      <CardContent>
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Plano</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {previewData.map((row) => {
                const hasRowErrors = Object.keys(row.errors).length > 0;
                return (
                  <TableRow
                    key={row.rowIndex}
                    className={hasRowErrors ? "bg-destructive/5" : ""}
                  >
                    <TableCell className="font-mono text-xs">
                      {row.rowIndex}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{row.data.nome}</p>
                        {row.errors.nome_cliente && (
                          <p className="text-xs text-destructive mt-1">
                            {row.errors.nome_cliente}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{row.data.email}</p>
                        {row.errors.email && (
                          <p className="text-xs text-destructive mt-1">
                            {row.errors.email}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{row.data.plano}</p>
                        {row.errors.plano && (
                          <p className="text-xs text-destructive mt-1">
                            {row.errors.plano}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{row.data.valor}</p>
                        {row.errors.valor && (
                          <p className="text-xs text-destructive mt-1">
                            {row.errors.valor}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{row.data.status}</p>
                        {row.errors.status && (
                          <p className="text-xs text-destructive mt-1">
                            {row.errors.status}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{row.data.data_inicio}</p>
                        {row.errors.data_inicio && (
                          <p className="text-xs text-destructive mt-1">
                            {row.errors.data_inicio}
                          </p>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {previewData.map((row) => {
            const hasRowErrors = Object.keys(row.errors).length > 0;
            return (
              <Card
                key={row.rowIndex}
                className={hasRowErrors ? "border-destructive" : ""}
              >
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-muted-foreground">
                      Linha {row.rowIndex}
                    </span>
                    {hasRowErrors && (
                      <Badge variant="destructive" className="text-xs">
                        Erro
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="text-muted-foreground">Cliente: </span>
                      <span>{row.data.nome}</span>
                      {row.errors.nome && (
                        <p className="text-xs text-destructive mt-0.5">
                          {row.errors.nome}
                        </p>
                      )}
                    </div>

                    <div>
                      <span className="text-muted-foreground">Email: </span>
                      <span className="break-all">{row.data.email}</span>
                      {row.errors.email && (
                        <p className="text-xs text-destructive mt-0.5">
                          {row.errors.email}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-muted-foreground">Plano: </span>
                        <span>{row.data.plano}</span>
                        {row.errors.plano && (
                          <p className="text-xs text-destructive mt-0.5">
                            {row.errors.plano}
                          </p>
                        )}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Valor: </span>
                        <span>{row.data.valor}</span>
                        {row.errors.valor && (
                          <p className="text-xs text-destructive mt-0.5">
                            {row.errors.valor}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-muted-foreground">Status: </span>
                        <span>{row.data.status}</span>
                        {row.errors.status && (
                          <p className="text-xs text-destructive mt-0.5">
                            {row.errors.status}
                          </p>
                        )}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Data: </span>
                        <span>{row.data.data_inicio}</span>
                        {row.errors.data_inicio && (
                          <p className="text-xs text-destructive mt-0.5">
                            {row.errors.data_inicio}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {data.length > previewLimit && (
          <p className="text-xs text-muted-foreground text-center mt-4">
            + {data.length - previewLimit} registro(s) não exibido(s)
          </p>
        )}
      </CardContent>
    </Card>
  );
}
