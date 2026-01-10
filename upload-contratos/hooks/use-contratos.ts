import { useQuery } from "@tanstack/react-query";
import { contratosService } from "@/lib/services/contratos-service";
import { toast } from "sonner";

export interface Contrato {
  id_contrato: string;
  nome_cliente: string;
  email_cliente: string;
  tipo_plano: string;
  valor_mensal: string;
  status: string;
  data_inicio: string;
  created_at: string;
  updated_at: string;
}

export function useContratos() {
  return useQuery({
    queryKey: ["contratos"],
    queryFn: async () => {
      const data = await contratosService.listar({
        page: 1,
        limit: 1000,
      });
      return data.items || [];
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}
