/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Dropdown, Space, message } from "antd";
import { useNavigate } from "react-router-dom";
import { PiDotsThreeOutlineThin } from "react-icons/pi";

import { deleteEmploye } from "../../api/api_employe";
import useEmployeStore from "../../stores/store_employe";
import { defaultColDef } from "../../constantes/gridText";

export const EmployeList = () => {
  const navigate = useNavigate();
  const { employees, loadEmployees, removeEmployee } = useEmployeStore();
  const [rowData, setRowData] = useState([]);


  const handleDelete = async (id) => {
    try {
      const response = await deleteEmploye(id);
      if (response.ok) {
        message.success("Employé supprimé avec succès");
        removeEmployee(id);
        loadEmployees();
      }
    } catch (error) {
      message.error(`Erreur lors de la suppression: ${error.message}`);
    }
  };

  const CustomButtonComponent = (props) => {
    const { data } = props;
    const handleMenuClick = (e) => {
      if (e.key === "0") {
        navigate(`/employees/${data.id}`);
      } else if (e.key === "1") {
        navigate(`/employees/${data.id}`);
      } else if (e.key === "2") {
        handleDelete(data.id);
      }
    };

    const items = [
      { label: <a href="#">Détail</a>, key: "0" },
      { label: <a href="#">Modifier</a>, key: "1" },
      { type: "divider" },
      { label: <a href="#">Supprimer</a>, danger: true, key: "2" },
    ];

    return (
      <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={["click"]}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <PiDotsThreeOutlineThin size={24} />
          </Space>
        </a>
      </Dropdown>
    );
  };

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  useEffect(() => {
    setRowData(employees);
  }, [employees]);

  const [colDefs] = useState([
    {
      field: "name",
      headerName: "Employé",
      filter: false,
      headerClass: "bg-[#ecf1fd]",
      cellRenderer: (params) => params.value,
      cellStyle: { display: 'flex', alignItems: 'center' } 
    },
    {
      field: "department",
      headerName: "Département",
      headerClass: "bg-[#ecf1fd]",
    },
    { field: "position", headerName: "Poste", headerClass: "bg-[#ecf1fd]" },
    {
      field: "Action",
      cellRenderer: CustomButtonComponent,
      flex: 0.4,
      filter: false,
      headerClass: "bg-[#ecf1fd]",
    },
  ]);

  return (
    <div className="ag-theme-quartz" style={{ height: "70vh" }}>
      <AgGridReact
        pagination={true}
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        rowHeight={50}
      />
    </div>
  );
};
