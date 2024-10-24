// src/screens/CreatePosts.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AgGridReact } from "ag-grid-react";
import { Button, Modal, Form, Input, InputNumber, Select, Table } from 'antd';
// import 'antd/dist/antd.css';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const liste1 = [
  // Vos données

  {
    id: 1,
    firstName: "Jean",
    lastName: "Dupont",
    position: "Développeur Full Stack",
    department: "Développement",
    contractType: "CDI",
    email: "jean.dupont@example.com"
  },
  {
      id: 2,
      firstName: "Jean",
      lastName: "Dupont",
      position: "Développeur Full Stack",
      department: "Finance",
      contractType: "CDI",
      email: "jean.dupont@example.com"
  },
  {
      id: 3,
      firstName: "Jean",
      lastName: "Dupont",
      position: "Développeur Full Stack",
      department: "Développement",
      contractType: "CDI",
      email: "jean.dupont@example.com"
  },
  {
      id: 4,
      firstName: "Jean",
      lastName: "Dupont",
      position: "Développeur Full Stack",
      department: "Finance",
      contractType: "CDI",
      email: "jean.dupont@example.com"
  },
];




export default function CreatePosts() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const id_p = query.get('id_p');
  const label = query.get('label');
  const leader = query.get('leader');
  const description = query.get('description');
  const Number_of_Employee = query.get('Number_of_Employee');

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleOk = () => setIsModalVisible(false);
  const handleCancel = () => setIsModalVisible(false);

  const handleShow = () => setIsModalVisible2(true);
  const handleClose = () => setIsModalVisible2(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Prénom', dataIndex: 'firstName', key: 'firstName' },
    { title: 'Nom', dataIndex: 'lastName', key: 'lastName' },
    { title: 'Poste', dataIndex: 'position', key: 'position' },
    // { title: 'Département', dataIndex: 'department', key: 'department' },
    { title: 'Type de Contrat', dataIndex: 'contractType', key: 'contractType' },
    // { title: 'Email', dataIndex: 'email', key: 'email' },
  ];

  return (
    <div className="flex flex-col items-center bg-gray-100 p-5">
      <h1 className="text-2xl font-bold mb-5 text-gray-800">Information du Poste</h1>
      <table className="min-w-full bg-white">
        <tbody>
          <tr className="w-full border-b">
            <td className="py-4 px-6 text-lg font-bold text-gray-600 border">Id</td>
            <td className="py-4 px-6 text-lg text-gray-600 border">{id_p}</td>
          </tr>
          <tr className="w-full border-b">
            <td className="py-4 px-6 text-lg font-bold text-gray-600 border">Label</td>
            <td className="py-4 px-6 text-lg text-gray-600 border">{label}</td>
          </tr>
          <tr className="w-full border-b">
            <td className="py-4 px-6 text-lg font-bold text-gray-600 border">Leader</td>
            <td className="py-4 px-6 text-lg text-gray-600 border">{leader}</td>
          </tr>
          <tr className="w-full border-b">
            <td className="py-4 px-6 text-lg font-bold text-gray-600 border">Nombre d'Employés</td>
            <td className="py-4 px-6 text-lg text-gray-600 border">{Number_of_Employee}</td>
          </tr>
        </tbody>
      </table>

      <div className='min-w-full bg-white border'>
        <h1 className='uppercase text-bold font-bold text-center m-5'>Description</h1>
        <div className='m-8 overflow-auto max-h-40'>
          {description}
        </div>
      </div>

      <div className="mt-5 flex justify-between w-full">
        <Button 
          onClick={() => navigate("/home/company/posts")}
          className="bg-orange-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Retour
        </Button>
        <div className="flex space-x-3">
          <Button 
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleShow}
          >
            Voir Membre
          </Button>
          <Button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={showModal}
          >
            Modifier
          </Button>
          <Button 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => console.log("Supprimer l'employé:", id_p)}
          >
            Supprimer
          </Button>
        </div>
      </div>



      <Modal
        title="Modifier Poste"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Annuler
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Soumettre
          </Button>,
        ]}
      >
        <Form {...formItemLayout} style={{ maxWidth: 600 }} initialValues={{ Number_of_Employee: 0 }}>
          <Form.Item label="Label" name="label" rules={[{ required: true, message: 'Champs vide!' }]}>
            <Input placeholder="Nom du poste" />
          </Form.Item>

          <Form.Item label="Responsable" name="responsable" rules={[{ required: true, message: 'Champs vide!' }]}>
            <Input placeholder="Nom du responsable" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description_post"
            rules={[{ required: true, message: 'Champs vide!' }]}
          >
            <Input.TextArea placeholder="Description du poste" />
          </Form.Item>

          <Form.Item
            name="status"
            label="Statut"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Sélectionnez une option"
              onChange={(value) => console.log(value)}
              allowClear
            >
              <Option value="Disponible">Disponible</Option>
              <Option value="Indisponible">Indisponible</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Nombre" name="Number_of_Employee" rules={[{ required: true, message: 'Champs vide!' }]}>
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>




{/* modal2 **************************************************************************************************/}

      <Modal
        title="liste Employee "
        open={isModalVisible2}
        onOk={handleClose}
        onCancel={handleClose}
        footer={[
          <Button key="close" onClick={handleClose}>
            Fermer
          </Button>,
        ]}
      >
        <Table
          columns={columns}
          dataSource={liste1}
          rowKey="id"
        />
      </Modal>
    </div>
  );
}
