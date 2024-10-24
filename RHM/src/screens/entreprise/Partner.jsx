import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Modal, Form, Input, InputNumber, Select, Space } from "antd";
import { defaultColDef } from "../../constantes/gridText";




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

export const Partner = () => {
  const navigate = useNavigate();

  const [rowData, setRowData] = useState([
    {
        id: "1",
        companyName: "Entreprise A",
        emplacement: "Abidjan",
        description: "Description de l'entreprise A",
        website: "https://www.entreprise-a.com",
        contactName: "John Doe",
        contactEmail: "john.doe@entreprise-a.com",
        contactPhone: "+123456789"
      },
      {
        id: "2",
        companyName: "Entreprise B",
        emplacement: "Assini",
        description: "Description de l'entreprise B",
        website: "https://www.entreprise-b.com",
        contactName: "Jane Smith",
        contactEmail: "jane.smith@entreprise-b.com",
        contactPhone: "+987654321"
      }
  ]);

  const [colDefs, setColDefs] = useState([
    { field: "companyName", headerName: "Nom de l'Entreprise" },
    { field: "emplacement", headerName: "Emplacement" },
    { field: "description", headerName: "Description" },
    { field: "website", headerName: "Site Web" },
    // { field: "contactName", headerName: "contactName" },
    { field: "contactEmail", headerName: "Email" },
    { field: "contactPhone", headerName: "Phone" },

  ]);



  const pagination = true;
  const paginationPageSize = 500;
  const paginationPageSizeSelector = [200, 500, 1000];

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

  const handleRowClick = (event) => {
    const { id, companyName, emplacement,description ,website, contactEmail, contactPhone } = event.data;
    navigate(`/home/company/partner/CreatePart?id=${id}&companyName=${companyName}&emplacement=${emplacement}&description=${description}&website=${website},&contactEmail=${contactEmail}&contactPhone=^${contactPhone}      `);
  };

  return (
    <div className="mx-5 py-3">
      {/* <PartnerCard/> */}
      <div className="flex mx-2 justify-between my-3">
        <div className="">
          <h1 className="text-xl font-bold">Partenaire</h1>
          <p>
            Voici la liste des partenaire de notre entreprise.
          </p>
        </div>
        <div>
          <Button type="primary" size="large" onClick={showModal}>
            Nouveau Partenaire
          </Button>
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
          onRowClicked={handleRowClick}
        //   localeText={localeText}
        />
      </div>

      <Modal
        title="Créer un Nouveau partenaire"
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
      <form {...formItemLayout} className='mt-8' style={{ maxWidth: 600 }}>
      <Form.Item label="Nom de l'entreprise" name="companyName" rules={[{ required: true, message: 'Champs vide!' }]}>
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
};
