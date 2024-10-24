import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import CreateTeamDrawer from "../components/CreateTeamDrawer";


export default function TeamLayout() {
  //   const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const showDrawer = () => {
    console.log('ok')
    setOpen(true);
  };

  return (
    <>
      <div className=" py-3">
        <div className="flex mx-2 justify-between my-3">
        <div>
          <h1 className="text-2xl font-bold  xl ">Gestion des Equipes</h1>
          <p className="font-thin   text-lg">
            Voici la liste des équipes de notre entreprise.
          </p>
        </div>
          <div className="flex items-center gap-10">
            <button className=" py-2 px-4 rounded-2xl bg-[#E89D85] font-light"
                onClick={showDrawer}
            >
              Nouveau
            </button>
          </div>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
      <CreateTeamDrawer  open={open} onClose={onClose} />
    </>
  );
}
