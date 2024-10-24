/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Drawer, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { CiCircleAlert } from "react-icons/ci";
import useEmployeStore from "../stores/store_employe";

export default function CreateTeamDrawer({ open, onClose }) {
  const { employees, loadEmployees } = useEmployeStore();

  const [employe, setEmploye] = useState([]);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  useEffect(() => {
    setEmploye(employees);
  }, [employees]);

  const [team, setTeam] = useState({
    name: "",
    manager: "",
    members: "",
    description: "",
  });



  return (
    <Drawer
      width={520}
      onClose={onClose}
      closable={true}
      open={open}
      style={{
        borderTopLeftRadius: "1.5rem",
        borderBottomLeftRadius: "1.5rem",
      }}
      title={
        <div>
          <h1 className="text-2xl ">Créer une équipe </h1>
        </div>
      }
      extra={
        <div className="bg-[#ecf1fd] py-1 px-2 rounded-lg flex space-x-2">
          <p className="font-thin">Etape</p>
          <div className="flex">
            <p className="font-normal">1</p>
            <p className="font-thin">/1</p>
          </div>
        </div>
      }
      footer={
        <div className="flex  items-center space-x-3 my-3">
          <button
            className="flex  px-4 py-1 justify-between rounded-full bg-[#ecf1fd] text-lg font-light"
            onClick={onClose}
          >
            Annuler
          </button>
          <button
            className="flex  px-4 py-1 justify-between rounded-full bg-[#E89D85] text-lg font-light"
            type="primary"
            // onClick={showChildrenDrawer}
          >
            Enregistrer
          </button>
        </div>
      }
    >
      <div>
        <p className="text-xl font-light text-[#E87868] mb-5">
          Renseigner le formulaire
        </p>
      </div>

      <div className="flex justify-start items-center gap-1 py-2  px-2 rounded-lg my-4 bg-[#ecf1fd] mb-12">
        <CiCircleAlert size={18} />
        <p className="text-sm font-thin">
          Veuillez spécifier le nom de la nouvelle equipe que vous souhaitez créer
        </p>
      </div>

      <div className="space-y-4 ">
        <div className="border w-full py-2 rounded-xl">
          <Input
            placeholder="Nom de l'équipe"
            variant="borderless"
            className="font-thin"
            name="name"
            value={team.name}
            onChange={(e) => setTeam({ ...team, name: e.target.value })}
          />
        </div>

        <div className="w-full border py-2 rounded-xl">
          <Select
            variant="borderless"
            className="font-thin w-full"
            showSearch
            placeholder="Selectionnez le manager de l'equipe"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={employe.map((emp) => ({
              value: emp.id,
              label: emp.firstName + " " + emp.lastName,
            }))}
            value={team.manager}
            onChange={(value) => setTeam({ ...team, manager: value })}
          />
        </div>

        <div className="w-full border py-2 rounded-xl">
          <Select
            mode="multiple"
            variant="borderless"
            className="font-thin w-full"
            showSearch
            placeholder="Sélectionner un ou plusieur menbres de l'equipe"
            options={employe.map((emp) => ({
              value: emp.id,
              label: emp.firstName + " " + emp.lastName,
            }))}
            value={team.members}
            onChange={(value) => setTeam({ ...team, members: value })}
          />
        </div>

        <div className="border w-full py-2 rounded-xl">
          <Input.TextArea
            placeholder="Ajouté une description"
            variant="borderless"
            className="font-thin"
            name="description"
            value={team.description}
            onChange={(e) => setTeam({ ...team, description: e.target.value })}
          />
        </div>
      </div>
    </Drawer>
  );
}
