import { Form, Input } from "antd";
import { useState } from "react";
import { PiContactlessPayment } from "react-icons/pi";
import { SiVisa } from "react-icons/si";
import { FaCcMastercard } from "react-icons/fa";

export default function StepFour() {
  const [formData, setFormData] = useState({});
  console.log(formData);
  const handleFormChange = (changedValues, allValues) => {
    setFormData(allValues);
    console.log("Form Data:", allValues);
  };

  return (
    <div className="mx-10">
      <div className="flex justify-between mb-5">
        <div className="flex space-x-2 items-center">
          <PiContactlessPayment size={28} />
          <p className="text-lg">Ajouter une carte </p>
        </div>
        <div className="flex space-x-4">
          <SiVisa size={28} />
          <FaCcMastercard size={28} />
        </div>
      </div>
      <Form
        name="basic"
        layout="vertical"
        requiredMark={false}
        className="w-full mx-auto"
        autoComplete="off"
        onValuesChange={handleFormChange}
      >
        <Form.Item
          label="Numero de carte bancaire"
          name="cardNumber"
          rules={[
            {
              required: true,
              message: "Veuillez entrer le numéro de carte bancaire!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nom et prenom du titulaire"
          name="cardHolder"
          rules={[
            {
              required: true,
              message: "Veuillez entrer le nom et prenom du titulaire!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <div className="flex w-full space-x-24">
          <Form.Item
            label="Date d'expiration"
            name="expirationDate"
            rules={[
              {
                required: true,
                message: "Veuillez entrer la date d'expiration!",
              },
            ]}
          >
            <div className="flex space-x-2 items-center">
              <Input maxLength={2} style={{ width: "60px" }} placeholder="MM" />
              <p className="text-3xl">/</p>
              <Input
                accept="numéro"
                maxLength={2}
                style={{ width: "60px" }}
                placeholder="YY"
              />
            </div>
          </Form.Item>
          <Form.Item
            label="CVV"
            name="cvv"
            rules={[
              {
                required: true,
                message: "Veuillez entrer le CVV!",
              },
            ]}
          >
            <Input maxLength={3} style={{ width: "80px" }} placeholder="CVV" />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
