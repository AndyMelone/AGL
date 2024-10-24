import { Outlet, useNavigate } from "react-router-dom";

export default function LeaveRequestLayout() {
    const navigate = useNavigate();

  return (
    <div className=" py-3">
      <div className="flex mx-2 justify-between my-3">
      <div>
        <h2 className="text-2xl font-bold ">Gestion des Demandes de Congés</h2>
          <p className="font-thin text-lg">
            Voici la liste des demandes de congés.
          </p>
        </div>
        <div className="flex items-center gap-10">
          <button className=" py-2 px-4 rounded-2xl bg-[#E89D85] font-light uppercase"           onClick={() => navigate("/absences/leave-tracking")}>
            voir les congés validés
          </button>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
