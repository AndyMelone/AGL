import { Form, Input } from "antd";
import { useState } from "react";

export default function StepTwo() {
  const [formValues, setFormValues] = useState({});
  console.log(formValues)

  const onFormChange = (_, allValues) => {
    setFormValues(allValues);
    console.log(allValues);
  };

  return (
    <div>
      <Form
        name="basic"
        layout="vertical"
        requiredMark={false}
        className="w-full mx-auto p-4"
        autoComplete="off"
        onValuesChange={onFormChange}
      >
        <div className="flex w-full space-x-4 items-center justify-center mx-auto">
          <Form.Item
            label="Votre nom "
            name="adminName"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Veuillez entrer votre nom!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Prénom"
            name="name"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Veuillez entrer votre prénom!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>

        <Form.Item
          label="Téléphone"
          name="phone"
          rules={[
            {
              required: true,
              message: "Veuillez entrer votre numéro de téléphone!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Veuillez entrer votre email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Pseudo"
          name="pseudo"
          rules={[
            {
              required: true,
              message: "Veuillez entrer votre pseudo!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mot de passe"
          name="password"
          rules={[
            {
              required: true,
              message: "Veuillez entrer votre mot de passe!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </div>
  );
}
