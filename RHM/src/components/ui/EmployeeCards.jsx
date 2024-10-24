/* eslint-disable react/prop-types */
import { IoCallOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import logo from "../../assets/LOGO.svg";

export default function EmployerCards({ employee }) {
  return (
    <div className="w-80 border rounded-xl mx-auto">
      <div className="mx-auto text-center my-4">
        <img
          src={logo}
          alt=""
          className="w-28 h-28 my-2 border mx-auto rounded-full"
        />
      </div>
      <div className="my-2">
        <p className="mx-auto text-center font-medium">
          {employee?.firstName && employee?.lastName ? `${ employee.firstName } ${employee.lastName}` : "Nom Non Disponible"}
        </p>
      </div>
      <div className="my-2">
        <p className="mx-auto text-center text-gray-500">
          {employee?.position?.title || "Poste Non Disponible"}

        </p>
      </div>
      <div className="flex justify-center items-center space-x-4 my-4">
        <div className="rounded-xl p-2 bg-slate-300 cursor-pointer">
          <IoCallOutline size={24} />
        </div>
        <div className="rounded-xl p-2 bg-slate-300 cursor-pointer">
          <CiMail size={24} />
        </div>
      </div>
      <div>
        <div className="w-full border-t-2 flex justify-center px-1 mt-10 rounded-b-xl py-6">
          <div className="bg-green-200 p-2 flex justify-center items-center space-x-2 rounded-2xl">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <p className="text-center m-0">Présent</p>
          </div>
        </div>
      </div>
    </div>
  );
}
