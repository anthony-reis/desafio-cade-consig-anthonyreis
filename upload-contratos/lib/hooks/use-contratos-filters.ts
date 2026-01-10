import { useState, useMemo } from "react";
import { type Contrato } from "./use-contratos";

export function useContratosFilters(contratos: Contrato[]) {
  const [status, setStatus] = useState<string>("all");
  const [filtros, setFiltros] = useState<string[]>([]); // Array de filtros
  const [inputPesquisa, setInputPesquisa] = useState(""); // Input temporário
  const [page, setPage] = useState(1);
  const limit = 20;

  const contratosFiltrados = useMemo(() => {
    let resultados = [...contratos];

    // Filtro de status
    if (status !== "all") {
      resultados = resultados.filter((c) => c.status === status);
    }

    // Aplica TODOS os filtros (AND)
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
    if (filtros.includes(termo.trim())) return; // Evita duplicados

    setFiltros([...filtros, termo.trim()]);
    setInputPesquisa("");
    setPage(1);
  };

  const removerFiltro = (termo: string) => {
    setFiltros(filtros.filter((f) => f !== termo));
    setPage(1);
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    setPage(1);
  };

  const limparFiltros = () => {
    setStatus("all");
    setFiltros([]);
    setInputPesquisa("");
    setPage(1);
  };

  return {
    status,
    filtros,
    inputPesquisa,
    page,
    limit,
    contratosFiltrados,
    contratosPaginados,
    total,
    totalPaginas,
    handleStatusChange,
    setInputPesquisa,
    adicionarFiltro,
    removerFiltro,
    setPage,
    limparFiltros,
  };
}
