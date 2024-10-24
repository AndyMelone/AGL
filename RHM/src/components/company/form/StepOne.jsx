import { Form, Input, Select, Upload, message, Image } from "antd";
import { useState } from "react";
import countryList from "react-select-country-list";
import ImgCrop from "antd-img-crop";

const beforeUpload = (file) => {
  const isJpgOrPng =
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    file.type === "image/jpg" ||
    file.type === "image/svg";
  if (!isJpgOrPng) {
    message.error("Vous ne pouvez télécharger que des fichiers JPG/PNG/SVG!");
    return Upload.LIST_IGNORE; // Bloquer le téléchargement
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error(
      "Vous ne pouvez télécharger des fichiers que de moins de 2 Mo!"
    );
    return Upload.LIST_IGNORE; // Bloquer le téléchargement
  }
  return false; // Empêcher l'upload automatique
};

export default function StepOne() {
  const countryOptions = countryList().getData();
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  const onChange = ({ fileList: newFileList }) => {
    if (newFileList.length > 1) {
      newFileList = [newFileList[newFileList.length - 1]];
      message.error("Vous ne pouvez télécharger qu'une seule image.");
    }
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleFormChange = (changedValues, allValues) => {
    console.log("Form values:", { ...allValues, logo: fileList[0]?.originFileObj });
  };

  return (
    <div>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        requiredMark={false}
        className="w-full mx-auto p-4"
        autoComplete="off"
        onValuesChange={handleFormChange}
      >
        <div className="flex w-full space-x-4 items-center justify-center mx-auto">
          <Form.Item name="logo">
            <ImgCrop rotationSlider aspectSliderar>
              <Upload
                listType="picture-circle"
                name="avatar"
                className="avatar-uploader"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                maxCount={1}
                beforeUpload={beforeUpload}
              >
                {fileList.length === 0 && "+ Logo"}
              </Upload>
            </ImgCrop>
          </Form.Item>

          <Form.Item
            label="Nom de l'entreprise"
            name="name"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Veuillez entrer le nom de votre entreprise!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Veuillez entrer l'email professionnel de l'entreprise!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Téléphone"
          name="phone"
          rules={[
            {
              required: true,
              message:
                "Veuillez entrer le numéro de téléphone professionnel de l'entreprise!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <div className="flex w-full space-x-4">
          <Form.Item
            label="Pays"
            name="country"
            className="w-1/3"
            rules={[
              {
                required: true,
                message:
                  "Veuillez entrer le pays de résidence de l'entreprise!",
              },
            ]}
          >
            <Select
              showSearch
              options={countryOptions}
              placeholder="Sélectionner un pays"
            />
          </Form.Item>

          <Form.Item
            label="Adresse"
            name="address"
            className="w-full"
            rules={[
              {
                required: true,
                message:
                  "Veuillez entrer l'adresse de résidence de l'entreprise!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>

        <div className="flex w-full space-x-4">
          <Form.Item
            label="Code postal"
            name="zip"
            className="w-full"
            rules={[
              {
                required: true,
                message:
                  "Veuillez entrer le code postal de résidence de l'entreprise!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Secteur d'activité"
            name="activity"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Veuillez entrer le secteur d'activité!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
