import { useQuery } from "@tanstack/react-query";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { getCategories } from "../../api/stocks";
import { defaultColDef } from "../../constantes/gridText";

export function ProductTypeScreen() {
  const { data, status } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <section className="p-8 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-700">
          Catégories de produits
        </h2>

        <button className="py-2 px-4 rounded-2xl bg-[#E89D85] font-light">
          Nouvelle Catégorie
        </button>
      </div>

      {status === "pending" && null}

      {status === "error" && <p>Une erreur est survenue</p>}

      {status === "success" && (
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
                field: "label",
                headerName: "Libellé",
                headerClass: "bg-[#ecf1fd]",
              },
            ]}
          />
        </div>
      )}
    </section>
  );
}
