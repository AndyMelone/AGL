import logo from "../../assets/LOGO.svg";
import { useState } from "react";
import { Button, message, Steps, theme } from "antd";

import StepOne from "../../components/company/form/StepOne";
import StepTwo from "../../components/company/form/StepTwo";
import StepThree from "../../components/company/form/StepThree";
import StepFour from "../../components/company/form/StepFour";

const LoginCompany = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [selectedForfait, setSelectedForfait] = useState(null); 

  console.log("Forfait choisi:", selectedForfait); 

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const handleForfaitSelection = (forfait) => {
    setSelectedForfait(forfait);
    console.log("Forfait choisi:", forfait); 
    next();
  };

  const steps = [
    {
      title: "Entreprise",
      content: <StepOne />,
    },
    {
      title: "Admin",
      content: <StepTwo />,
    },
    {
      title: "Forfait",
      content: <StepThree nextStep={handleForfaitSelection} />,
    },
    {
      title: "Paiement",
      content: <StepFour />,
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    marginTop: "18px",
    minHeight: current === 3 ? "" : "550px",
    color: token.colorTextTertiary,
    borderRadius: token.borderRadiusLG,
    border:
      current === 3
        ? `1px solid ${token.colorBorder}`
        : `1px dashed ${token.colorBorder}`, 
    padding: "20px 0px",
    backgroundColor: current === 3 ? "#E9F8F1" : "transparent",
  };
  const onChange = (value) => {
    setCurrent(value);
  };

  return (
    <>
      <div className="lg:w-2/5 sm:w-full mx-auto my-5">
        <div className="mb-5">
          <div className="flex items-center">
            <img src={logo} alt="" className="w-16 h-16 my-2" />
            <h1 className="text-3xl font-medium">
              Créez votre compte entreprise 🎉
            </h1>
          </div>
          <div>
            <p className="text-lg font-light">
              Créez votre compte entreprise pour bénéficier de nos services.
            </p>
          </div>
        </div>
        <div>
          <Steps
            current={current}
            percent={10}
            items={items}
            onChange={onChange}
          />
          <div style={contentStyle}>{steps[current].content}</div>
          <div
            style={{
              marginTop: 24,
              textAlign: "end",
            }}
            className={current === 2 ? "hidden" : ""}
          >
            {current > 0 && (
              <Button
                style={{
                  margin: "0 8px",
                }}
                onClick={() => prev()}
              >
                Retour
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Suivant
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => message.loading("Un instant!")}
              >
                Creer
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default LoginCompany;
