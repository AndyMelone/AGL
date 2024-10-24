/* eslint-disable react/prop-types */
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  Dropdown,
  Space,
} from "antd";
import usePositionStore from "../../stores/Store_post";

import { createPost, deletePost } from "../../api/api_post";
import { PiDotsThreeOutlineThin } from "react-icons/pi";
import useEmployeStore from "../../stores/store_employe";
import useDepartmentStore from "../../stores/store_departement";
import { defaultColDef } from "../../constantes/gridText";



export const Posts = () => {
  const navigate = useNavigate();
  const { positions, loadPositions, removePosition } = usePositionStore();
  const { departments, loadDepartments } = useDepartmentStore();
  const { employees, loadEmployees } = useEmployeStore();

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  useEffect(() => {
    setEmployees(employees);
  }, [employees]);


  const [form] = Form.useForm();
  const [rowData, setRowData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [departements, setDepartements] = useState([]);
  const [employes, setEmployees] = useState([]);
  
  console.log(rowData)
  useEffect(() => {
    loadDepartments();
  }, [loadDepartments]);

  useEffect(() => {
    setDepartements(departments);
  }, [departments]);

  useEffect(() => {
    loadPositions();
  }, [loadPositions]);

  useEffect(() => {
    setRowData(positions);
  }, [positions]);

  const handleDelete = async (id) => {
    try {
      const response = await deletePost(id);
      if (response.data.ok) {
        removePosition(id);
        message.success("Post supprimé avec succès");
        loadPositions();
      }
    } catch (error) {
      message.error(`Oops! ${error.message}`);
    }
  };

  const CustomButtonComponent = (props) => {
    const { data } = props;
    const handleMenuClick = (e) => {
      if (e.key === "0") {
        navigate(`/departments/${data.id}`);
      } else if (e.key === "1") {
        navigate(`/departments/${data.id}/edit`);
      } else if (e.key === "2") {
        handleDelete(data.id);
      }
    };

    const items = [
      {
        label: <p className="font-thin">Détail</p>,
        key: "0",
      },
      {
        label: <p className="font-thin">Modifier</p>,
        key: "1",
      },
      {
        type: "divider",
      },
      {
        label: <p className="font-thin">Supprimer</p>,
        danger: true,
        key: "2",
      },
    ];

    return (
      <Dropdown
        menu={{
          items,
          onClick: handleMenuClick,
        }}
        trigger={["click"]}
      >
        <a className="mt-6" onClick={(e) => e.preventDefault()}>
          <Space>
            <PiDotsThreeOutlineThin size={24} />
          </Space>
        </a>
      </Dropdown>
    );
  };

  const [colDefs] = useState([
    { field: "title", headerName: "Label du Poste" },
    { field: "department", headerName: "Département" },
    { field: "employees", headerName: "Nbr d'employé " },
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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      try {
        const response = await createPost(
          values.title,
          values.description,
          values.departmentId
        );
        if(response.data.ok) {
          form.resetFields();
          setIsModalVisible(false);
          message.success("Post créé avec succès");
          loadPositions();
        }
        
      } catch (error) {
        message.error(`Oops! ${error.message}`);
      }
    } catch (error) {
      message.error(`Failed to create post: ${error.message}`);
    }
  };

  return (
    <div className="mx-5 py-3">
      <div className="flex mx-2 justify-between my-3">
        <div className="">
          <h1 className="text-xl">Postes</h1>
          <p  className="font-thin text-lg">
            Voici la liste des postes disponibles au sein de notre entreprise.
          </p>
        </div>
        <div>
          <button className=" py-2 px-4 rounded-2xl bg-[#E89D85] font-light" onClick={showModal}>
              Nouveau
            </button>
        </div>
      </div>
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
        />
      </div>

      <Modal
        title="Créer un Nouveau Poste"
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Annuler
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Soumettre
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          className="w-full mx-auto mt-5"
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Intituité du Poste"
            name="title"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Veuillez entrer le nom du poste!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Département"
            name="departmentId"
            className=""
            rules={[
              {
                required: true,
                message: "Veuillez sélectionner un département!",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Sélectionner un département"
              options={departements.map((dept) => ({
                value: dept.id,
                label: dept.name 
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            className="w-full"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
