import logo from "../../assets/LOGO.svg";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useState, useEffect } from "react";
import useAuthStore from "../../stores/store_auth";
import { loginUser } from "../../api/api_auth";

// Liste des images du diaporama
const images = [
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1723125742314-22a9028e0096?q=80&w=2898&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1723649902616-0dce94980e06?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D",
];

export default function LoginPage() {
  const { login } = useAuthStore();

  const onFinish = async (values) => {
    if (values.pseudo === "" || values.password === "") {
      message.warning("Veuillez remplir tous les champs!");
      return;
    }

    const loadingMessage = message.loading("Chargement en cours...", 0);

    try {
      const response = await loginUser(values.pseudo, values.password);
      if (response.data.ok) {
        message.success("Connexion réussie!");
        login(response.data.data, response.data.token);
      } else {
        message.error("Erreur lors de la connexion.");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        message.error("Pseudo ou mot de passe incorrect");
      } else if (error.response && error.response.status === 500) {
        message.error("Erreur serveur");
      } else {
        message.error("Une erreur inattendue est survenue");
      }
    } finally {
      loadingMessage();
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen ">
      <div className="w-1/2 bg-gray-200 items-center justify-center hidden lg:flex">
        <img
          src={images[currentImageIndex]}
          alt="Slideshow"
          className=" w-full h-full object-cover transition  duration-1000 ease-in-out"
        />
      </div>
      <div className="bg-white m-10  lg:w-1/2">
        <div className="flex items-center ">
          <img src={logo} alt="" className="w-16 h-16 my-2" />
          <h1 className="text-4xl font-medium ">E-RHM</h1>
        </div>
        <div className="my-2">
          <h1 className="text-2xl font-medium "> Bienvenue 😇 </h1>
          <p className="text-lg font-light">
            Connectez-vous pour gérer vos ressources avec efficacité et
            simplicité.
          </p>
        </div>
        <div className="">
          <Form
            name="basic"
            layout="vertical"
            requiredMark={false}
            className="w-full mx-auto p-10"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className="flex-col justify-center  items-center">
              <div>
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
              </div>
              <div className="">
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Se souvenir de moi</Checkbox>
                </Form.Item>
              </div>
            </div>

            <Form.Item className="flex justify-center">
              <Button type="primary" htmlType="submit" size="large">
                Se connecter
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
