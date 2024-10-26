import { useQuery } from "@tanstack/react-query";
import { getStocks } from "../../api/stocks";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

export function OverviewScreen() {
  const { data, status } = useQuery({
    queryKey: ["stocks"],
    queryFn: getStocks,
  });

  return (
    <section className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-700">
        Produits en stock
      </h2>

      {status === "pending" && null}

      {status === "error" && <p>Une erreur est survenue</p>}

      {status === "success" &&
        (data.length > 0 ? (
          <AgGridReact
            rowData={data}
            rowHeight={50}
            pagination={true}
            defaultColDef={defaultColDef}
            columnDefs={[
              {
                field: "name",
                headerName: "Produit",
                headerClass: "bg-[#ecf1fd]",
                filter: false,
                cellRenderer: (params) => params.value,
              },
            ]}
          />
        ) : (
          <p>Aucun produit en stock pour le moment.</p>
        ))}
    </section>
  );
}
