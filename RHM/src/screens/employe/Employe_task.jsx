import React, { useState } from 'react';
import { Select, DatePicker, Button, Input, Form, Modal, Drawer, Space } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'antd/dist/reset.css'; // Reset Ant Design styles
import 'tailwindcss/tailwind.css';

const { Option } = Select;
const { RangePicker } = DatePicker;

export function EmployeTask() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [form] = Form.useForm();

  // Configuration des colonnes pour ag-Grid
  const columnDefs = [
    {
      headerName: 'Équipe',
      field: 'employee',
      filter: 'agTextColumnFilter',
      filterParams: {
        filterOptions: ['contains']
      },
      // Filtre par employé/équipe
    },
    {
      headerName: 'Description',
      field: 'description',
      cellRenderer: params => params.value.length > 40 ? `${params.value.slice(0, 40)}...` : params.value,
    },
    {
      headerName: 'Dates',
      field: 'dates',
      cellRenderer: params => `${params.value[0].format('YYYY-MM-DD')} - ${params.value[1].format('YYYY-MM-DD')}`,
    },
    {
      headerName: 'Priorité',
      field: 'priority',
    },
    {
      headerName: 'Progression',
      cellRendererFramework: () => (
        <div style={{ width: '180px' }}>
          <Progress percent={30} size="small" />
          <Progress percent={50} size="small" status="active" />
          <Progress percent={70} size="small" status="exception" />
          <Progress percent={100} size="small" />
        </div>
      ),
    },
    {
      headerName: 'Actions',
      cellRendererFramework: params => (
        <Button type="link" onClick={() => openDrawer(params.data)}>
          Voir les détails
        </Button>
      ),
    },
  ];

  // Soumission du formulaire d'attribution des tâches
  const onFinish = (values) => {
    const newTask = {
      employee: values.employee,
      description: values.description,
      dates: values.dates,
      priority: values.priority,
    };
    setTasks([...tasks, newTask]);
    setIsModalVisible(false); // Ferme le modal après soumission
    form.resetFields(); // Réinitialise le formulaire
  };

  // Ouvre le modal pour ajouter une nouvelle tâche
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Ferme le modal sans ajouter de tâche
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Ouvre le Drawer pour voir les détails
  const openDrawer = (task) => {
    setSelectedTask(task);
    setIsDrawerVisible(true);
  };

  // Ferme le Drawer
  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setSelectedTask(null);
  };

  // Annuler la tâche sélectionnée
  const cancelTask = () => {
    setTasks(tasks.filter(task => task !== selectedTask));
    closeDrawer();
  };

  return (
    <div className=" mx-auto p-6">
      <div>
        <h2 className="text-2xl font-bold">Gestion des Tâches</h2>
        <p className="font-thin text-lg">Voici la liste des tâches.</p>
      </div>
      
      <div className='flex justify-end mb-4 items-center space-x-4'>
        <div className="relative">
          {/* Input pour filtrer les tâches par employé/équipe */}
          <Input
            placeholder="Rechercher une équipe"
            onChange={(e) => setSearchText(e.target.value)}
            className="mr-8 text-center px-3"
          />
          <svg
            className="absolute left-3 top-2.5 text-gray-400"
            width="16"
            height="16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zm-5.44 1.103a5.5 5.5 0 1 1 7.778-7.778 5.5 5.5 0 0 1-7.778 7.778z" />
          </svg>
        </div>

        {/* Bouton pour ajouter une nouvelle tâche */}
        <Button type="primary" onClick={showModal}>
          Ajouter une tâche
        </Button>
      </div>

      {/* Table des tâches assignées avec ag-Grid */}
      <div className="ag-theme-quartz" style={{ height: "70vh" }}>
        <AgGridReact
          rowData={tasks.filter(task => task.employee.toLowerCase().includes(searchText.toLowerCase()))}
          columnDefs={columnDefs}
          domLayout='autoHeight'
          rowHeight={50}
          pagination={false}
        />
      </div>

      {/* Modal contenant le formulaire d'attribution */}
      <Modal
        title="Attribuer une tâche"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={onFinish} form={form} className="p-6">
          <Form.Item name="employee" rules={[{ required: true, message: 'Veuillez sélectionner un employé!' }]}>
            <Select placeholder="Sélectionner une équipe" className="w-full mb-4" size="large">
              <Option value="Team A">Team A</Option>
              <Option value="Team B">Team B</Option>
              <Option value="Team C">Team C</Option>
            </Select>
          </Form.Item>

          <Form.Item name="description" rules={[{ required: true, message: 'Veuillez entrer la description de la tâche!' }]}>
            <Input.TextArea
              placeholder="Description de la tâche"
              className="w-full mb-4"
              size="large"
              rows={4}
            />
          </Form.Item>

          <Form.Item name="dates" rules={[{ required: true, message: 'Veuillez sélectionner une plage de dates!' }]}>
            <RangePicker className="w-full mb-4" size="large" />
          </Form.Item>

          <Form.Item name="priority" rules={[{ required: true, message: 'Veuillez sélectionner une priorité!' }]}>
            <Select placeholder="Sélectionner une priorité" className="w-full mb-4" size="large">
              <Option value="Haute">Haute</Option>
              <Option value="Moyenne">Moyenne</Option>
              <Option value="Basse">Basse</Option>
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit" className="w-full">
            Attribuer la tâche
          </Button>
        </Form>
      </Modal>

      {/* Drawer pour voir les détails d'une tâche */}
      <Drawer
        title={`Détails de la tâche pour ${selectedTask?.employee}`}
        placement="right"
        onClose={closeDrawer}
        visible={isDrawerVisible}
        width={400}
      >
        {selectedTask && (
          <div>
            <p className='mb-5'><strong>Dates :</strong><br /><br /> Du {selectedTask.dates[0].format('YYYY-MM-DD')} Au {selectedTask.dates[1].format('YYYY-MM-DD')}</p>
            <p className='mb-5'><strong>Priorité :</strong><br /><br /> {selectedTask.priority}</p>
            <p className='block break-words whitespace-normal mb-5'><strong>Description :</strong><br /><br /> {selectedTask.description}</p>

            <Space className="mt-4">
              <Button type="primary" onClick={closeDrawer}>
                Modifier
              </Button>
              <Button type="danger" className='bg-red-600 text-white' onClick={cancelTask}>
                Annuler
              </Button>
            </Space>
          </div>
        )}
      </Drawer>
    </div>
  );
}
