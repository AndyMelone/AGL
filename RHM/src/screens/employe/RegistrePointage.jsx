import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import usePresenceStore from "../../stores/Pointage";
import { defaultColDef } from "../../constantes/gridText";

export default function RegistrePointage() {
  const [rowData, setRowData] = useState([]);
  // const [loading, setLoading] = useState(true);
  const { presenceListTotal, loaPresenceListTotal } = usePresenceStore();
console.log(presenceListTotal.at(0)?.Breaks.Break)
console.log("presence",presenceListTotal.at(0))
  useEffect(() => {
    loaPresenceListTotal(); 
  }, [loaPresenceListTotal]);

  useEffect(() => {
    setRowData(presenceListTotal);
  }, [presenceListTotal]);

  const [colDefs] = useState([
    {
      field: "employee",
      headerName: "Label",
      headerClass: "bg-[#ecf1fd]",
      cellRenderer: (params) => params.value,
      cellStyle: { display: 'flex', alignItems: 'center' } 
    },
    {
      field: "matricule",
      headerName: "matricule",
      headerClass: "bg-[#ecf1fd]",
      cellStyle: { display: 'flex', alignItems: 'center' } 

    },
    {
      field: "date",
      headerName: "Date",
      headerClass: "bg-[#ecf1fd]",
      cellStyle: { display: 'flex', alignItems: 'center' } 
      
    },
    {
      field: "heureDebut",
      headerName: "Heure de début",
      headerClass: "bg-[#ecf1fd]",
      cellStyle: { display: 'flex', alignItems: 'center' } 

    },
    {
      field: "Breaks",
      headerName: "Pause",
      headerClass: "bg-[#ecf1fd]",
      cellStyle: { display: 'flex', alignItems: 'center' } 

    },
    {
      field: "EndBreak",
      headerName: "Reprise",
      headerClass: "bg-[#ecf1fd]",
      cellStyle: { display: 'flex', alignItems: 'center' } 

    },
    {
      field: "fin",
      headerName: "Fin de service",
      headerClass: "bg-[#ecf1fd]",
      cellStyle: { display: 'flex', alignItems: 'center' } 

    },
  ]);



  const handleRowClick = (event) => {
    const { id } = event.data;
    console.log("Row clicked:", id);
  };

  return (
    <div>
      <div className="ag-theme-quartz" style={{ height: "70vh" }}>
        <AgGridReact
          pagination={true}
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          onRowClicked={handleRowClick}
          // loading={loading} 
        />
      </div>
    </div>
  );
}
