import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { RiDeleteBin2Line } from "react-icons/ri";
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Modal, Select, Input } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export function EmployeTeam() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { team, membersData } = state || {};  // Vérifiez que `state` existe

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [gridApi, setGridApi] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showModal2 = () => {
    setIsModalOpen2(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleOk2 = () => {
    setIsModalOpen2(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  // Transformez membersData en options compatibles avec Select
  const membersOptions = membersData
    ? membersData.map(member => ({
        label: member.label,   // Utilisez `member.label` pour l'étiquette
        value: member.name,    // Utilisez `member.name` pour la valeur
      }))
    : [];

  const columnDefs = [
    { headerName: "Nom", field: "name", sortable: true, filter: true },
    { headerName: "Poste", field: "post", sortable: true, filter: true, cellStyle: { textAlign: 'center' } },
    { headerName: "Rôle", field: "role", sortable: true, filter: true, cellStyle: { textAlign: 'center' } },
    {
      headerName: "Actions",
      field: "actions",
      // Commenter la cellule d'action pour éviter l'erreur pendant le développement
      // cellRendererFramework: (params) => (
      //   <div className="flex items-center space-x-5">
      //     <a className="bg-red-500 p-2">
      //       <RiDeleteBin2Line />
      //     </a>
      //   </div>
      // )
    }
  ];

  return (
    <div className="w-full p-6 bg-white shadow-md rounded-lg">
      <div className="">
        <button
          className="bg-gray-500 text-white border p-2"
          onClick={() => navigate("/employees/team/create")}
        >
          Retour aux équipes
        </button>
      </div>
      <div className="flex space-x-3 mb-3 justify-between">
        <h1 className="text-xl font-bold">Membre de l'équipe {team?.name}</h1>
        <div className="mx-3">
          <Button className="bg-white-500 mx-2 border p-2" onClick={showModal}>
            Modifier équipe
          </Button>

          <Button className="bg-green-500 border p-2" onClick={showModal2}>
            Ajouter Membre
          </Button>
        </div>
      </div>

      <div className="ag-theme-quartz" style={{ height: "70vh" }}>
        <AgGridReact
          rowData={team?.membersData || []}  // Évitez les erreurs si `membersData` est undefined
          columnDefs={columnDefs}
          onGridReady={params => setGridApi(params.api)}
        />
      </div>

      <Modal title={`Modifier l'équipe « ${team?.name} »`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="border py-2 mb-3 rounded-xl">
          <Input
            placeholder="Nom de l'équipe"
            variant="borderless"
            className="font-thin"
            name="name"
            value={team?.name || ''}
          />
        </div>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Sélectionner le manager"
          optionFilterProp="label"
          options={membersOptions}  // Utilisez les options formatées ici
        />
      </Modal>

      <Modal title={`Ajouter des membres à l'équipe « ${team?.name} »`} open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2}>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Sélectionner des membres"
          optionFilterProp="label"
          options={membersOptions}  // Utilisez les options formatées ici
        />
      </Modal>
    </div>
  );
}
