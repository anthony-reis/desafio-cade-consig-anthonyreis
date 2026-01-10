"use client";

import { useContratos } from "@/lib/hooks/use-contratos";
import { useContratosFilters } from "@/lib/hooks/use-contratos-filters";
import { ContratosHeader } from "@/components/contratos/contratos-header";
import { ContratosFilters } from "@/components/contratos/contratos-filters";
import { ContratosTable } from "@/components/contratos/contratos-table";
import { ContratosPagination } from "@/components/contratos/contratos-pagination";

export default function Home() {
  const { data: contratos = [], isLoading, refetch } = useContratos();

  const {
    status,
    filtros,
    inputPesquisa,
    page,
    limit,
    contratosPaginados,
    total,
    totalPaginas,
    handleStatusChange,
    setInputPesquisa,
    adicionarFiltro,
    removerFiltro,
    setPage,
    limparFiltros,
  } = useContratosFilters(contratos);

  const emptyMessage =
    filtros.length > 0 || status !== "all"
      ? "Tente ajustar os filtros"
      : "Faça upload de um arquivo CSV para começar";

  return (
    <main className="min-h-screen overflow-x-hidden p-4 sm:p-6 md:p-8">
      <div className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6">
        <ContratosHeader
          totalContratos={contratos.length}
          onRefresh={refetch}
          isRefreshing={isLoading}
        />
        <ContratosFilters
          filtros={filtros}
          inputPesquisa={inputPesquisa}
          status={status}
          onInputChange={setInputPesquisa}
          onAdicionarFiltro={adicionarFiltro}
          onRemoverFiltro={removerFiltro}
          onStatusChange={handleStatusChange}
          onLimparFiltros={limparFiltros}
          resultadosCount={total}
        />
        <div className="w-full overflow-x-auto">
          <ContratosTable
            contratos={contratosPaginados}
            isLoading={isLoading}
            isEmpty={contratosPaginados.length === 0}
            emptyMessage={emptyMessage}
          />
        </div>
        {contratosPaginados.length > 0 && (
          <ContratosPagination
            page={page}
            totalPages={totalPaginas}
            totalItems={total}
            itemsPerPage={limit}
            onPageChange={setPage}
          />
        )}
      </div>
    </main>
  );
}
