/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
  Dropdown,
  Form,
  Input,
  Space,
  message,
  DatePicker,
  TimePicker,
} from "antd";
import { useNavigate } from "react-router-dom";
import { PiDotsThreeOutlineThin } from "react-icons/pi";
import { Modal } from "antd";
import { createTask, deleteEmploye } from "../../api/api_employe";
import useEmployeStore from "../../stores/store_employe";
import { defaultColDef } from "../../constantes/gridText";

export const EmployeList = () => {
  const navigate = useNavigate();
  const { employees, loadEmployees, removeEmployee } = useEmployeStore();
  const [rowData, setRowData] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const showModal = (data) => {
    form.setFieldsValue({
      employeeId: `${data.id}`,
      employee: `${data.firstName} ${data.lastName}`,
      date: null,
      time: null,
      title: "",
      description: "",
    });
    setOpen(true);
    console.log("Données de la ligne sélectionnée :", data);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (values.workDate && values.workTime) {
        values.workDate = values.workDate.format("YYYY-MM-DD");
        values.workTime = values.workTime.format("HH:mm");
      }

      const startTime = Date.now();
      const response = await createTask(values);
      console.log("Valeurs de la tâche à planifier :", response);

      if (response.ok) {
        setConfirmLoading(true);
        const duration = Date.now() - startTime;
        const delay = Math.max(2000 - duration, 0);

        setTimeout(() => {
          setOpen(false);
          setConfirmLoading(false);
        }, delay);

        message.success("Tâche planifiée avec succès");
        form.resetFields();
      } else {
        message.error("Erreur lors de la planification de la tâche");
      }
    } catch (error) {
      console.error("Erreur de validation :", error);
    }
  };

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
        showModal(data);
      } else if (e.key === "3") {
        handleDelete(data.id);
      }
    };

    const items = [
      { label: <a href="#">Détail</a>, key: "0" },
      { label: <a href="#">Modifier</a>, key: "1" },
      {
        label: <a href="#">Planifier</a>,
        key: "2",
      },
      { type: "divider" },
      { label: <a href="#">Supprimer</a>, danger: true, key: "3" },
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
      cellStyle: { display: "flex", alignItems: "center" },
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

      <Modal
        title="Planifier la tâche"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => setOpen(false)}
        width={800}
      >
        <Form layout="vertical" form={form}>
          <Form.Item label="Nom et prénom" name="employeeId" className="hidden">
            <Input disabled />
          </Form.Item>

          <Form.Item label="Nom et prénom" name="employee">
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Titre"
            name="title"
            rules={[{ required: true, message: "Veuillez entrer le titre" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Sélectionner une date"
            name="date"
            rules={[
              { required: true, message: "Veuillez entrer la date de travail" },
            ]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            label="Sélectionner une heure"
            name="time"
            rules={[
              { required: true, message: "Veuillez entrer l'heure de travail" },
            ]}
          >
            <TimePicker className="w-full" format="HH:mm" />
          </Form.Item>

          <Form.Item label="Description de la tâche" name="description">
            <Input.TextArea
              rows={4}
              placeholder="Détaillez la tâche à effectuer"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
