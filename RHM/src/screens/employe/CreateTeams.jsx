import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { Dropdown, Space, message } from "antd";
import { PiDotsThreeOutlineThin } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { defaultColDef } from '../../constantes/gridText';



const membre1 = [
  { name: 'jean', label: 'Jean', post: 'developeur', role: 'manager', Actions: '...' },
  { name: 'prince', label: 'prince', post: 'developeur', role: 'membre', Actions: '...' },
  { name: 'yao', label: 'yao', post: 'developeur', role: 'membre', Actions: '...' },
];
const membre2 = [
  { name: 'paul', label: 'paul', post: 'developeur', role: 'manager', Actions: '...' },
  { name: 'christ', label: 'christ', post: 'developeur', role: 'membre', Actions: '...' },
  { name: 'AXEL', label: 'AXEL', post: 'developeur', role: 'membre', Actions: '...' },
];
const membre3 = [
  { name: 'koffi', label: 'koffi', post: 'developeur', role: 'manager', Actions: '...' },
  { name: 'aka', label: 'aka', post: 'developeur', role: 'membre', Actions: '...' },
  { name: 'henry', label: 'henry', post: 'developeur', role: 'membre', Actions: '...' },
];

const team = [
  { id: "1", name: 'TCHEPO', manager: 'axel', members: '3', description: 'dsjhbcsdhcsdjncbsdjcbdjcbs', membersData: membre1 },
  { id: "2", name: 'AZALAPINHOU', manager: 'paul', members: '3', description: 'dsjhbcsdhcsdjncbsdjcbdjcbs', membersData: membre2 },
  { id: "3", name: 'AXEL', manager: 'koffi', members: '3', description: 'dsjhbcsdhcsdjncbsdjcbdjcbs', membersData: membre3 },
];


// Déplacez cette définition en haut, avant les `columnDefs`
const CustomButtonComponent = (props) => {
  const { data } = props;

  const navigate = useNavigate(); // Déplacez aussi `navigate` à l'intérieur du composant si nécessaire

  const handleMenuClick = (e) => {
    if (e.key === "0") {
      navigate(`/employees/team/${data.id}`, { state: { team: data, membersData: data.membersData } });
    // } else if (e.key === "1") {
    //   navigate(`/employees/edit/${data.id}`, { state: { team: data } });
    } else if (e.key === "2") {
      handleDelete(data.id);
    }
    if (!team || !membersData) {
      return <div>Aucune équipe sélectionnée. Veuillez réessayer.</div>;
    }
    
  };

  const items = [
    { label: "Détail", key: "0" },
    // { label: "Modifier", key: "1" },
    { type: "divider" },
    { label: "Supprimer", key: "2", danger: true },
  ];

  return (
    <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <PiDotsThreeOutlineThin style={{ fontSize: 24 }} />
        </Space>
      </a>
    </Dropdown>
  );
};

export function CreateTeams() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTeam = team.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columnDefs = [
    { headerName: "Nom", field: "name", sortable: true, filter: true },
    { headerName: "Manager", field: "manager", sortable: true, filter: true, cellStyle: { textAlign: 'center' } },
    { headerName: "Membres", field: "members", sortable: true, filter: true, cellStyle: { textAlign: 'center' } },
    { headerName: "Description", field: "description", sortable: true, filter: true, cellStyle: { textAlign: 'center' } },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: CustomButtonComponent, // On appelle CustomButtonComponent ici
      flex: 0.4,
      filter: false,
    },
  ];


  return (
    <div className="w-full p-6 bg-white shadow-md rounded-lg">

        <div className="ag-theme-quartz" style={{ height: "70vh" }}>
        <AgGridReact
          rowData={filteredTeam}
          columnDefs={columnDefs}
          pagination={true}
          defaultColDef={defaultColDef}
          paginationPageSize={10}
        />
      </div>
    </div>
  );
}
