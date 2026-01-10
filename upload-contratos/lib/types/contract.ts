import { z } from "zod";

export const contratoSchema = z.object({
  nome: z.string().min(1, "Nome obrigatório"),
  email: z.string().email("Email inválido"),
  plano: z
    .string()
    .min(1, "Plano obrigatório")
    .refine(
      (val) => ["BASICO", "PRO", "ENTERPRISE"].includes(val.toUpperCase()),
      "Plano deve ser Basico, Pro ou Enterprise"
    )
    .transform((val) => val.toUpperCase()),
  valor: z
    .string()
    .min(1, "Valor obrigatório")
    .refine(
      (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
      "Valor deve ser um número positivo"
    ),
  status: z
    .string()
    .min(1, "Status obrigatório")
    .refine(
      (val) => ["ATIVO", "INATIVO"].includes(val.toUpperCase()),
      "Status deve ser Ativo ou Inativo"
    )
    .transform((val) => val.toUpperCase()),
  data_inicio: z
    .string()
    .min(1, "Data obrigatória")
    .refine((val) => !isNaN(Date.parse(val)), "Data inválida"),
});

export type ContratoCSV = z.infer<typeof contratoSchema>;

export interface ParsedRow {
  data: ContratoCSV;
  errors: Record<string, string>;
  rowIndex: number;
}
