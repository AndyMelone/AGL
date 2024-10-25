import { Outlet, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import useAuthStore from "../stores/store_auth";
import { capitalizeFirstLetter } from "../helpers/capitalizeFirstLetter";
import { CiMail } from "react-icons/ci";
import { MdAnimation } from "react-icons/md";
import { Popconfirm, Tooltip } from "antd";
import { TiContacts } from "react-icons/ti";
import { MdAccessTime } from "react-icons/md";
import { CiFolderOn } from "react-icons/ci";
import { getEmploye } from "../api/api_employe";
import { useEffect } from "react";

export default function ViewOneEmploye() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const { id } = useParams();

  useEffect(() => {
    getEmploye(id).then((data) => {
      console.log(data);
    });
  }, [id]);

  return (
    <>
      <div
        className="flex rounded-tl-3xl"
        style={{
          height: "calc(100vh - 88px)",
        }}
      >
        <div className="w-1/4 bg-[#E89D85]  ">
          <button
            className="flex items-center gap-1 justify-start p-3"
            onClick={() => navigate(-2)}
          >
            <IoIosArrowBack name="back" size={20} color="white" />
            <p className="font-thin text-white">retour</p>
          </button>
          <div>
            <div>
              <div className="mt-5 flex  justify-center">
                <div className="flex items-center justify-center w-20 h-20 bg-[#dda390] rounded-full shadow-xl">
                  <p className="text-white text-2xl">
                    {capitalizeFirstLetter(user?.firstName?.charAt(0))}
                  </p>
                  <p className="text-white text-2xl">
                    {capitalizeFirstLetter(user?.lastName?.charAt(0))}
                  </p>
                </div>
              </div>
              <div>
                {
                  <div className="flex justify-center flex-row gap-2 items-center mt-2">
                    <p className="text-lg font-extralight text-white">
                      {capitalizeFirstLetter(user?.firstName)}{" "}
                    </p>
                    <p className="text-lg font-extralight text-white">
                      {capitalizeFirstLetter(user?.lastName)}
                    </p>
                  </div>
                }
              </div>
              <div>
                {user.matricule ? (
                  <p className="text-lg font-extralight text-center text-white">
                    {user.matricule}
                  </p>
                ) : null}
              </div>
              <div className="flex items-center justify-center gap-5 mt-4">
                <Tooltip
                  title={
                    <div className="bg-white ">
                      <p className="text-black">Voir la fiche de présence</p>
                    </div>
                  }
                  color="white"
                  key={"blue"}
                >
                  <button className="border p-2 rounded-full bg-gray-200 flex items-end justify-center ">
                    <MdAccessTime size={24} color="gray" />
                  </button>
                </Tooltip>
                <Tooltip
                  title={
                    <div className="bg-white ">
                      <p className="text-black"> Voir les documents </p>
                    </div>
                  }
                  color="white"
                  key={"blue"}
                >
                  <button className="border p-2 rounded-full bg-gray-200 flex items-end justify-center ">
                    <CiFolderOn size={24} color="gray" />
                  </button>
                </Tooltip>
                <Popconfirm
                  description={
                    <>
                      <div>
                        <p className="mb-4">Coordonnées</p>
                        <div className="flex items-center justify-center gap-2 py-4 px-4 rounded-lg bg-[#ecf1fd]">
                          <CiMail size={20} />
                          <p className="text-lg font-thin">{user.email}</p>
                        </div>
                      </div>
                    </>
                  }
                  onConfirm={confirm}
                  icon={null}
                  trigger="hover"
                  okButtonProps={{ style: { display: "none" } }}
                  cancelButtonProps={{ style: { display: "none" } }}
                  placement="topLeft"
                >
                  <button className="border p-2 rounded-full bg-gray-200 flex items-end justify-center ">
                    <TiContacts size={24} color="gray" />
                  </button>
                </Popconfirm>
              </div>

              <div className="my-10 mx-5 space-y-2">
                <div className="flex justify-between space-x-6">
                  <div className="flex items-center space-x-1">
                    <MdAnimation color="#fff" />
                    <p className="font-light text-white">Matricule</p>
                  </div>
                  <p className="font-semibold text-white">1212BB12</p>
                </div>
                <div className="flex justify-between space-x-6">
                  <div className="flex items-center space-x-1">
                    <MdAnimation color="#fff" />
                    <p className="font-light text-white">Matricule</p>
                  </div>
                  <p className="font-semibold text-white">1212BB12</p>
                </div>
                <div className="flex justify-between space-x-6">
                  <div className="flex items-center space-x-1">
                    <MdAnimation color="#fff" />
                    <p className="font-light text-white">Matricule</p>
                  </div>
                  <p className="font-semibold text-white">1212BB12</p>
                </div>
                <div className="flex justify-between space-x-6">
                  <div className="flex items-center space-x-1">
                    <MdAnimation color="#fff" />
                    <p className="font-light text-white">Matricule</p>
                  </div>
                  <p className="font-semibold text-white">1212BB12</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border flex-grow">
          <Outlet />
        </div>
      </div>
    </>
  );
}
