import {
  useQueryStates,
  parseAsInteger,
  parseAsString,
  parseAsArrayOf,
} from "nuqs";
import { useMemo } from "react";
import { type Contrato } from "@/lib/types/contract";

export function useContratosFilters(contratos: Contrato[]) {
  const [params, setParams] = useQueryStates({
    status: parseAsString.withDefault("all"),
    filtros: parseAsArrayOf(parseAsString).withDefault([]),
    page: parseAsInteger.withDefault(1),
  });

  const { status, filtros, page } = params;
  const limit = 20;

  const contratosFiltrados = useMemo(() => {
    let resultados = [...contratos];

    if (status !== "all") {
      resultados = resultados.filter((c) => c.status === status);
    }

    if (filtros.length > 0) {
      resultados = resultados.filter((c) => {
        return filtros.every((termo) => {
          const termoLower = termo.toLowerCase().trim();

          if (c.nome_cliente.toLowerCase().includes(termoLower)) return true;
          if (c.email_cliente.toLowerCase().includes(termoLower)) return true;
          if (c.tipo_plano.toLowerCase().includes(termoLower)) return true;
          if (c.status.toLowerCase().includes(termoLower)) return true;

          const valorNumerico = parseFloat(c.valor_mensal);
          if (c.valor_mensal.includes(termoLower)) return true;
          if (valorNumerico.toString().includes(termoLower)) return true;

          const dataFormatada = new Date(c.data_inicio).toLocaleDateString(
            "pt-BR"
          );
          const dataISO = c.data_inicio;
          if (dataFormatada.includes(termoLower)) return true;
          if (dataISO.includes(termoLower)) return true;

          const ano = new Date(c.data_inicio).getFullYear().toString();
          if (ano.includes(termoLower)) return true;

          const mesAno = dataFormatada.slice(3);
          if (mesAno.includes(termoLower)) return true;

          return false;
        });
      });
    }

    return resultados;
  }, [contratos, status, filtros]);

  const contratosPaginados = useMemo(() => {
    const inicio = (page - 1) * limit;
    const fim = inicio + limit;
    return contratosFiltrados.slice(inicio, fim);
  }, [contratosFiltrados, page]);

  const total = contratosFiltrados.length;
  const totalPaginas = Math.ceil(total / limit);

  const adicionarFiltro = (termo: string) => {
    if (!termo.trim()) return;
    if (filtros.includes(termo.trim())) return;

    setParams({
      filtros: [...filtros, termo.trim()],
      page: 1,
    });
  };

  const removerFiltro = (termo: string) => {
    setParams({
      filtros: filtros.filter((f) => f !== termo),
      page: 1,
    });
  };

  const handleStatusChange = (newStatus: string) => {
    setParams({
      status: newStatus,
      page: 1,
    });
  };

  const limparFiltros = () => {
    setParams({
      status: "all",
      filtros: [],
      page: 1,
    });
  };

  const setPage = (newPage: number) => {
    setParams({ page: newPage });
  };

  return {
    status,
    filtros,
    page,
    limit,
    contratosFiltrados,
    contratosPaginados,
    total,
    totalPaginas,
    handleStatusChange,
    adicionarFiltro,
    removerFiltro,
    setPage,
    limparFiltros,
  };
}
