/* eslint-disable react/prop-types */
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState } from "react";

import { Dropdown, Space, message } from "antd";
import { useNavigate } from "react-router-dom";
import useLeaveStore from "../../stores/store_leave";
import { PiDotsThreeOutlineThin } from "react-icons/pi";
import { approveLeaveRequest } from "../../api/api_leaveRequest";
import { defaultColDef } from "../../constantes/gridText";

export const LeaveRequest = () => {
  const navigate = useNavigate();
  const { leaveRequests, loadLeaveRequests, removeLeaveRequest } =
    useLeaveStore();
  const [rowData, setRowData] = useState([]);

  const CustomButtonComponent = (props) => {
    const { data } = props;
    const handleMenuClick = (e) => {
      if (e.key === "0") {
        handleApprouve(data.id);
        // navigate(`/employees/${data.id}`);
      } else if (e.key === "1") {
        navigate(`/employees/${data.id}`);
      } else if (e.key === "2") {
        // handleDelete(data.id);
      }
    };

    const handleApprouve = async (id) => {
      try {
        const response = await approveLeaveRequest(id);
        if (response.ok) {
          removeLeaveRequest(id);
          message.success("demande appouvé avec succès");
          loadLeaveRequests();
        }
      } catch (error) {
        message.error(`Oops! ${error.message}`);
      }
    };

    const items = [
      { label: <a href="#">Approuvé</a>, key: "0" },
      { label: <a href="#">Refusé</a>, key: "1" },
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
    loadLeaveRequests();
  }, [loadLeaveRequests]);

  useEffect(() => {
    setRowData(leaveRequests);
  }, [leaveRequests]);

  const [colDefs] = useState([
    {
      field: "employee",
      headerName: "Employé",
    },
    {
      field: "startDate",
      headerName: "Date de debut ",
      // cellRenderer: (params) => params.value.length > 20 ? `${params.value.substring(0, 20)}...` : params.value
    },
    {
      field: "endDate",
      headerName: "Date de fin",
    },
    {
      field: "reason",
      headerName: "Motif",
    },
    {
      field: "status",
      headerName: "Status",
    },
    {
      field: "Action",
      cellRenderer: CustomButtonComponent,
      flex: 0.4,
      filter: false,
    },
  ]);



  const pagination = true;
  const paginationPageSize = 500;
  const paginationPageSizeSelector = [200, 500, 1000];

  return (
    <div className="mx-5 py-3">

      <div className="ag-theme-quartz" style={{ height: "70vh" }}>
       
       
        <AgGridReact
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  );
};
