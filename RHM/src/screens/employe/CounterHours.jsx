import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Thème pour AgGrid
import { AgGridReact } from 'ag-grid-react'; // Composant AgGrid
import dayjs from 'dayjs';
import { BiExport } from "react-icons/bi";
import { TbFileDownload } from "react-icons/tb";

const employees = [
  { name: 'Prudence Gnamién AMANI', tto: '136:00h', HS: '2:00h', contract: 'CDI', CTR: '7:00h', total: '7:00h', Coût: '0.00' },
  { name: 'AMANI', tto: '102:00h', HS: '2:00h', contract: 'CDD', CTR: '7:00h', total: '7:00h', Coût: '0.00' },
  { name: 'PRINCE', tto: '95:00h', HS: '1:00h', contract: 'stage', CTR: '7:00h', total: '7:00h', Coût: '0.00' },
  { name: 'AXEL', tto: '95:00h', HS: '00:00h', contract: 'CDI', CTR: '7:00h', total: '7:00h', Coût: '0.00' },
];

export default function CounterHours() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDate, setCurrentDate] = useState(dayjs());

  const handleSearch = (event) => setSearchTerm(event.target.value);

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePreviousMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
  const handleCurrentMonth = () => setCurrentDate(dayjs());
  const handleNextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

  // Colonnes pour AgGrid
  const columnDefs = [
    { headerName: "Employé", 
      field: "name", 
      sortable: true, 
      filter: true },
    { headerName: "Tps Total Observé", 
      field: "tto", 
      sortable: true, 
      filter: true },
    { headerName: "Heure Sup.", 
      field: "HS", 
      sortable: true, 
      filter: true },
    { headerName: "Contrat", 
      field: "contract", 
      sortable: true, 
      filter: true },
    { headerName: "Coût", 
      field: "Coût", cellRenderer: () => <TbFileDownload 
      className="text-blue-500" /> }
  ];

  return (
    <div className="w-full bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg">
        {/* Boutons de navigation des mois */}
        <div className="flex items-center">
          <button className="text-gray-500 hover:text-blue-500 border border-slate-300 hover:border-indigo-300 p-1" onClick={handlePreviousMonth}>
            &lt;
          </button>
          <button className="text-gray-500 hover:text-blue-500 border border-slate-300 hover:border-indigo-300 p-1" onClick={handleCurrentMonth} disabled={currentDate.isSame(dayjs(), 'month')}>
            Mois courant
          </button>
          <button className="text-gray-500 hover:text-blue-500 border border-slate-300 hover:border-indigo-300 p-1" onClick={handleNextMonth} disabled={currentDate.isSame(dayjs(), 'month')}>
            &gt;
          </button>
          <span className="font-bold">{currentDate.format('MMMM YYYY')}</span>
        </div>

        {/* Barre de recherche */}
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <svg className="absolute left-3 top-2.5 text-gray-400" width="16" height="16" fill="currentColor">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zm-5.44 1.103a5.5 5.5 0 1 1 7.778-7.778 5.5 5.5 0 0 1-7.778 7.778z" />
          </svg>
        </div>

        {/* Bouton d'export */}
        <button className="bg-green-500 text-white flex items-center space-x-2 px-4 py-2 rounded hover:bg-green-600">
          <span>Tout Exporter</span>
          <BiExport />
        </button>
      </div>

      {/* AgGridReact */}
      <div className="ag-theme-quartz" style={{ height: "70vh" }}>
        <AgGridReact
          rowData={filteredEmployees}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={5}
        />
      </div>
    </div>
  );
}
