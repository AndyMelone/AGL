import { Outlet, useNavigate } from "react-router-dom";

export const EmployeCounterLayout = () => {
  const navigate = useNavigate();

  const handleChangeView = (view) => {
    navigate("/employees/counter/" + view);
  };
  return (
    <div className="">

      <div>
        <h1 className="text-2xl font-bold  xl ">Gestion des Présences</h1>
      </div>
      <div className="flex gap-10 pt-10 border-b-2 mx-5">
        <button onClick={() => handleChangeView("")}>
          <p
            className={` 
              ${
                location.pathname === "/employees/counter/" ||
                location.pathname === "/employees/counter"
                  ? "transition  scale-110 duration-300  border-b-4 z-10 border-[#E89D85] font-medium text-base text-[#E89D85]"
                  : "font-medium text-base text-gray-400"
              }
              `}
          >
            Feuille de présence
          </p>
        </button>
        <button onClick={() => handleChangeView("pointage")}>
          <p
            className={` 
              ${
                location.pathname === "/employees/counter/pointage" ||
                location.pathname === "/employees/counter/pointage/"
                  ? "transition  scale-110 duration-300  border-b-4 z-10 border-[#E89D85] font-medium text-base text-[#E89D85]"
                  : "font-medium text-base text-gray-400"
              }
              `}
          >
            Registre de pointage
          </p>
        </button>

        <button onClick={() => handleChangeView("compteur-heure")}>
          <p
          className={` 
            ${
              location.pathname === "/employees/counter/compteur-heure/" ||
              location.pathname === "/employees/counter/compteur-heure"
                ? "transition  scale-110 duration-300  border-b-4 z-10 border-[#E89D85] font-medium text-base text-[#E89D85]"
                : "font-medium text-base text-gray-400"
            }
            `}
          >
            Compteur d&rsquo;heure
          </p>
        </button>
      </div>
      <div className="pt-10">
        <Outlet />
      </div>
    </div>
  );
};
