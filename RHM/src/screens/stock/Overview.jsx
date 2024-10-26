import { useQuery } from "@tanstack/react-query";
import { getStocks } from "../../api/stocks";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { defaultColDef } from "../../constantes/gridText";

export function OverviewScreen() {
  const { data, status } = useQuery({
    queryKey: ["stocks"],
    queryFn: getStocks,
  });

  return (
    <section className="p-8 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-700">Produits en stock</h2>

        <button className="py-2 px-4 rounded-2xl bg-[#E89D85] font-light">
          Ajouter un produit
        </button>
      </div>

      {status === "pending" && null}

      {status === "error" && <p>Une erreur est survenue</p>}

      {status === "success" &&
        (data.length > 0 ? (
          <div className="ag-theme-quartz h-[70vh]">
            <AgGridReact
              rowData={data}
              rowHeight={50}
              pagination={true}
              defaultColDef={defaultColDef}
              columnDefs={[
                {
                  field: "num",
                  headerName: "N°",
                  headerClass: "bg-[#ecf1fd]",
                  valueGetter: (params) => params.node.rowIndex + 1,
                  flex: 0.3,
                },
                {
                  field: "name",
                  headerName: "Nom",
                  headerClass: "bg-[#ecf1fd]",
                  filter: false,
                },
                {
                  field: "price",
                  headerName: "Prix",
                  headerClass: "bg-[#ecf1fd]",
                  cellRenderer: (params) => `${params.value} FCFA`,
                },
                {
                  field: "description",
                  headerName: "Description",
                  headerClass: "bg-[#ecf1fd]",
                },
              ]}
            />
          </div>
        ) : (
          <p>Aucun produit en stock pour le moment.</p>
        ))}
    </section>
  );
}
