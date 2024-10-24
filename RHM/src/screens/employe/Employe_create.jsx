import {
    Button,
    DatePicker,
    Divider,
    Form,
    Input,
    Select,
    Upload,
    message,
  } from "antd";
  import ImgCrop from "antd-img-crop";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
import usePositionStore from "../../stores/Store_post";

import { createEmploye } from "../../api/api_employe";
import useDepartmentStore from "../../stores/store_departement";

  
  const beforeUpload = (file) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/svg";
    if (!isJpgOrPng) {
      message.error("Vous ne pouvez télécharger que des fichiers JPG/PNG/SVG!");
      return Upload.LIST_IGNORE;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error(
        "Vous ne pouvez télécharger des fichiers que de moins de 2 Mo!"
      );
      return Upload.LIST_IGNORE;
    }
    return false;
  };
  
  export default function CreateEmploye() {
    const navigate = useNavigate();
    const { departments, loadDepartments } = useDepartmentStore();
    const { positions,loadPositions } = usePositionStore();
  
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
      setPositions(positions);
    }, [positions]);
  
    const [position, setPositions] = useState([]);
  
    const [departements, setDepartements] = useState([]);
    const [fileList, setFileList] = useState([]);
  
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
  
    const [form] = Form.useForm();
  
    const handleSave = async () => {
  
      const values = await form.validateFields();
      console.log("value" ,values)
      try {
        const response = await createEmploye({
          // flag: flagBase64,
          flag: values.flag,
          comments: values.comments,
          firstName: values.firstName,
          lastName: values.lastName,
          dateOfBirth: values.dateOfBirth,
          placeOfBirth: values.placeOfBirth,
          address: values.address,
          gender: values.gender,
          phoneNumber: values.phone,
          email: values.email,
          departmentId: values.departmentId,
          positionId: values.positionId,
          contractType: values.contractType,
          salary: values.salary,
          socialSecurityNumber: values.socialSecurityNumber,
          emergencyContactName: values.emergencyContactName,
          emergencyContactPhone: values.emergencyContactPhone,
          emergencyContactlastName: values.emergencyContactlastName,
          emergencyContactEmail: values.emergencyContactEmail,
          emergencyContactAdress: values.emergencyContactAddress,
        });
    
        if (response.ok) {
          form.resetFields();
          message.success("Employé enregistré avec succès!");
          navigate("/employees/list");
        }
      } catch (error) {
        console.error("Erreur lors de l'enregistrement:", error);
        message.error(`Oops! ${error.message}`);
      }
    };
  
    return (
      <div className="py-10 px-5">
        <div>
          <h1 className="text-xl font-bold mb-5">
            Enregistrer un nouvel employé(e)
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus dolorem
            fuga saepe corrupti! Rem veniam accusantium eveniet commodi eius
            quibusdam consequatur doloremque corrupti animi numquam. Vero nesciunt
            temporibus cumque aut.{" "}
          </p>
        </div>
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          className="w-full px-10"
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <div className="flex w-full items-center justify-center mx-auto space-x-2 ">
            <div className="flex-shrink-0 flex items-center justify-center">
              <Form.Item
                name="logo"
                className="flex items-center justify-center "
              >
                <ImgCrop rotationSlider aspectSlider>
                  <Upload
                    listType="picture-circle"
                    name="flag"
                    className="avatar-uploader w-32 h-32 flex items-center justify-center mt-20"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                    maxCount={1}
                    beforeUpload={beforeUpload}
                  >
                    {fileList.length === 0 && (
                      <div className="flex items-center justify-center w-full h-full text-center">
                        + Photo
                      </div>
                    )}
                  </Upload>
                </ImgCrop>
              </Form.Item>
            </div>
            <div className="flex-1 space-y-4">
              <Form.Item
                label="Nom"
                name="firstName"
                className="w-full"
                rules={[
                  {
                    required: true,
                    message: "Veuillez entrer le nom de l'employé",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Prénom"
                name="lastName"
                className="w-full"
                rules={[
                  {
                    required: true,
                    message: "Veuillez entrer le prénom de l'employé",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
          </div>
  
          <div className="flex w-full space-x-4 items-center justify-center mx-auto">
            <Form.Item
              label="Date de naissance"
              name="dateOfBirth"
              className="w-full"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer la date de naissance de l'employé!",
                },
              ]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
            <Form.Item
              label="Lieu de naissance"
              name="placeOfBirth"
              className="w-full"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer le lieu de naissance de l'employé!",
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
                message: "Veuillez entrer un numéro de téléphone!",
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
                message: "Veuillez entrer une adresse email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Adresse" name="address">
            <Input />
          </Form.Item>
          <div className="flex  w-full space-x-4 items-center justify-center mx-auto">
            <Form.Item
              label="Sexe"
              name="gender"
              className="w-1/3"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer le sexe de l'employé!",
                },
              ]}
            >
              <Select
                options={[
                  { value: "M", label: "Homme" },
                  { value: "F", label: "Femme" },
                ]}
              />
            </Form.Item>
            <Form.Item label="Département" name="departmentId" className="w-1/3">
              <Select
                showSearch
                placeholder="Sélectionner un département"
                options={departements.map((dept) => ({
                  value: dept.id,
                  label: dept.name,
                }))}
              />
            </Form.Item>
            <Form.Item label="Poste" name="positionId" className="w-1/3">
              <Select
                showSearch
                placeholder="Sélectionner un poste"
                options={position.map((dept) => ({
                  value: dept.id,
                  label: dept.title,
                }))}
              />
            </Form.Item>
          </div>
          <div className="flex w-full space-x-4 items-center justify-center mx-auto">
            <Form.Item
              label="Type de contrat"
              name="contractType"
              className="w-1/3"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer le type de contrat de l'employé!",
                },
              ]}
            >
              <Select
                options={[
                  { value: "CDI", label: "CDI" },
                  { value: "CDD", label: "CDD" },
                  { value: "Stage", label: "Stage" },
                ]}
              />
            </Form.Item>
            <Form.Item label="Salaire" name="salary" className="w-1/3">
              <Input />
            </Form.Item>
            <Form.Item
              label="Numéro de sécurité sociale"
              name="socialSecurityNumber"
              className="w-1/3"
            >
              <Input />
            </Form.Item>
          </div>
  
          <Divider orientation="left" orientationMargin="0">
            Personne a contacté en cas urgence
          </Divider>
          <div className="flex w-full space-x-4 items-center justify-center mx-auto">
            <Form.Item label="Nom" name="emergencyContactName" className="w-1/2">
              <Input />
            </Form.Item>
            <Form.Item
              label="Premon"
              name="emergencyContactlastName"
              className="w-1/2"
            >
              <Input />
            </Form.Item>
          </div>
  
          <Form.Item label="Téléphone" name="emergencyContactPhone">
            <Input />
          </Form.Item>
          <Form.Item label="Adresse" name="emergencyContactAddress">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="emergencyContactEmail">
            <Input />
          </Form.Item>
  
          <Divider orientation="left" orientationMargin="0">
            Ajouter un commentaire
          </Divider>
          <Form.Item name="comments" className="w-full">
            <Input.TextArea />
          </Form.Item>
  
          <div className="flex w-full justify-end mt-4">
            <Form.Item>
              <Button className="p-5 text-lg" type="primary" onClick={handleSave}>
                Enregistrer
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    );
  }
  