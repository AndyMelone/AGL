import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../api/orders";
import { defaultColDef } from "../../constantes/gridText";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

export function OrdersScreens() {
  const { data, status } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  return (
    <section className="p-8 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-700">Commandes</h2>

        <button className="py-2 px-4 rounded-2xl bg-[#E89D85] font-light">
          Nouvelle Commande
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
                field: "supplier",
                headerName: "Fournisseur",
                headerClass: "bg-[#ecf1fd]",
              },
              {
                field: "amount",
                headerName: "Total",
                headerClass: "bg-[#ecf1fd]",
                cellRenderer: (params) => `${params.value} FCFA`,
              },
              {
                field: "status",
                headerName: "Statut",
                headerClass: "bg-[#ecf1fd]",
                cellRenderer: (params) => {
                  const status = params.value;
                  return (
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs ${
                        status === "pending"
                          ? "bg-[#FFD700] text-gray-800"
                          : status === "En cours"
                          ? "bg-[#FFA500] text-gray-800"
                          : "bg-[#32CD32] text-white"
                      }`}
                    >
                      {
                        {
                          pending: "En attente",
                          ongoing: "En cours",
                          delivered: "Livré",
                        }[status]
                      }
                    </span>
                  );
                },
              },
              {
                field: "date",
                headerName: "Date",
                headerClass: "bg-[#ecf1fd]",
              },
            ]}
          />
        </div>
      )}
    </section>
  );
}
