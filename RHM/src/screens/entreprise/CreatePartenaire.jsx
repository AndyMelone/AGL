import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from "react";

import { Button, Modal, Form, Input, InputNumber, Select, Table } from 'antd';


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





export default function CreatePart() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const id = query.get('id');
  const companyName = query.get('companyName');
  const emplacement = query.get('emplacement');
  const description = query.get('description');
  const website = query.get('website');
  const contactEmail = query.get('contactEmail');
  const contactPhone = query.get('contactPhone');

  const handleEdit = () => {
    // Logique pour modifier le département
    console.log("Modifier département:", id);
  };

  const handleDelete = () => {
    // Logique pour supprimer le département
    console.log("Supprimer département:", id);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };



  
  return (


    <div className="flex flex-col items-center bg-gray-100 p-5">
      <h1 className="text-2xl font-bold mb-5 text-gray-800">Information du partenaire</h1>
      <table className="min-w-full bg-white">
        <tbody>
          <tr className="w-full border-b">
            <td className="py-4 px-6 text-lg font-bold text-gray-600 break-words border">Id</td>
            <td className="py-4 px-6 text-lg text-gray-600 break-words border">{id}</td>
          </tr>
          <tr className="w-full border-b">
            <td className="py-4 px-6 text-lg font-bold text-gray-600 break-words border">companyName</td>
            <td className="py-4 px-6 text-lg text-gray-600 break-words border">{companyName}</td>
          </tr>
          <tr className="w-full border-b">
            <td className="py-4 px-6 text-lg font-bold text-gray-600 break-words border">emplacement</td>
            <td className="py-4 px-6 text-lg text-gray-600 break-words border">{emplacement}</td>
          </tr>

          <tr className="w-full border-b">
            <td className="py-4 px-6 text-lg font-bold text-gray-600 break-words border">Site Web</td>
            <td className="py-4 px-6 text-lg text-gray-600 break-words border">{website}</td>
          </tr>
          <tr className="w-full border-b">
            <td className="py-4 px-6 text-lg font-bold text-gray-600 break-words border">Email</td>
            <td className="py-4 px-6 text-lg text-gray-600 break-words border">{contactEmail}</td>
          </tr>
          <tr className="w-full border-b">
            <td className="py-4 px-6 text-lg font-bold text-gray-600 break-words border">Contact</td>
            <td className="py-4 px-6 text-lg text-gray-600 break-words border">{contactPhone}</td>
          </tr>
        </tbody>
      </table>

      <div className="min-w-full bg-white border">
        <h1 className="uppercase font-bold text-center m-5">Description</h1>
        <div className="m-8 overflow-auto max-h-40">
          {description}
        </div>
      </div>

      <div className="mt-5 flex justify-between w-full">
        <button 
          onClick={() => navigate("/home/company/partner")}
          className="bg-orange-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Retour
        </button>
        <div className="flex space-x-3">

          <button 
        onClick={showModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"

          >
            Modifier
          </button>
          <button 
            onClick={handleDelete} 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Supprimer
          </button>
        </div>
      </div>


      <Modal
        title="Modifier partenaire"
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
      <form {...formItemLayout} style={{ maxWidth: 600 }}>
      <Form.Item label="Nom de l'entreprise" className='mt-8'  name="companyName" rules={[{ required: true, message: 'Champs vide!' }]}>
          <Input placeholder="Nom de l'entreprise" />
        </Form.Item>

        <Form.Item label="Emplacement" name="emplacement" rules={[{ required: true, message: 'Champs vide!' }]}>
          <Input placeholder="Emplacement" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Champs vide!' }]}
        >
          <Input.TextArea placeholder="Description" />
        </Form.Item>

        <Form.Item
          label="Site web"
          name="website"
          rules={[{ required: false, message: 'Champs vide!' }]}
        >
          <Input placeholder="Site web" />
        </Form.Item>

        <Form.Item
          label="Nom du contact"
          name="contactName"
          rules={[{ required: true, message: 'Champs vide!' }]}
        >
          <Input placeholder="Nom du contact" />
        </Form.Item>

        <Form.Item
          label="Email du contact"
          name="contactEmail"
          rules={[{ required: true, message: 'Champs vide!' }, { type: 'email', message: 'Email invalide!' }]}
        >
          <Input placeholder="Email du contact" />
        </Form.Item>

        <Form.Item
          label="Contact"
          name="contactPhone"
          rules={[{ required: true, message: 'Champs vide!' }]}
        >
          <Input placeholder="Contact" />
        </Form.Item>

      </form>
      </Modal>


    </div>
  );
}
