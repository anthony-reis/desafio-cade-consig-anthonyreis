"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function UploadInstructions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm sm:text-base">
          Formato do arquivo
        </CardTitle>
      </CardHeader>
      <CardContent className="text-xs sm:text-sm text-gray-600">
        <p>O arquivo CSV deve conter as seguintes colunas:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>nome_cliente</li>
          <li>email_cliente</li>
          <li>tipo_plano</li>
          <li>valor_mensal</li>
          <li>status</li>
          <li>data_inicio</li>
        </ul>
      </CardContent>
    </Card>
  );
}
