import { Outlet, useNavigate } from "react-router-dom";

export default function PaieFicheLayout() {
  //   const navigate = useNavigate();

  return (
    <div className=" py-3">
      <div className="flex mx-2 justify-between my-3">
        <div>
          <h1 className="text-2xl font-bold  xl ">Ajout des bulletins</h1>
        </div>
        <div className="flex items-center gap-10">
          <button className=" py-2 px-4 rounded-2xl bg-[#E89D85] font-light">
            Nouveau
          </button>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
