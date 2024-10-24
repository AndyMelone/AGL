/* eslint-disable react/prop-types */
import { PiSealCheckFill } from "react-icons/pi";
import { Button } from "antd";

export default function StepThree({ nextStep }) {
  const forfait = [
    {
      label: "Forfait de base",
      prix: "40 000 FCFA",
      avantage: [
        "5 Employés",
        "1 Administrateur",
        "2 Départements / Équipes",
        "5 Go",
      ],
    },
    {
      label: "Forfait Pro",
      prix: "80 000 FCFA",
      avantage: [
        "10 Employés",
        "2 Administrateurs",
        "5 Départements / Équipes",
        "10 Go",
      ],
    },
    {
      label: "Forfait Entreprise",
      prix: "120 000 FCFA",
      avantage: [
        "20 Employés",
        "5 Administrateurs",
        "10 Départements / Équipes",
        "20 Go",
      ],
    },
  ];

  return (
    <div>
      <div>
        <h1 className="text-black font-medium text-2xl">
          Choisissez le forfait <br /> adapté pour votre entreprise
        </h1>
      </div>
      <div className="space-y-2">
        {forfait.map((item, index) => (
          <div key={index} className="px-10 py-1 border mx-2 rounded-xl border-gray-400">
            <p>{item.label}</p>
            <div className="flex items-center justify-between">
              <div className="my-2">
                {item.avantage.map((avantage, index) => (
                  <div key={index} className="flex items-center align-center space-x-2">
                    <PiSealCheckFill size={24} color="blue" />
                    <p className="text-lg">{avantage}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xl font-bold">{item.prix}</p>
                <Button
                  type="primary"
                  className="w-full my-2"
                  onClick={()=> nextStep(item)}
                >
                  Choisir ce forfait
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
