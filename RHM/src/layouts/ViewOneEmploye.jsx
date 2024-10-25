import { Outlet, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { capitalizeFirstLetter } from "../helpers/capitalizeFirstLetter";
import { CiMail } from "react-icons/ci";
import { MdAnimation } from "react-icons/md";
import { Dropdown, Popconfirm, Space, Table, Tooltip } from "antd";
import { TiContacts } from "react-icons/ti";
import { MdAccessTime } from "react-icons/md";
import { CiFolderOn } from "react-icons/ci";
import { getEmploye } from "../api/api_employe";
import { useEffect, useState } from "react";
import formatDate from "../helpers/formatDate";
import { SiTask } from "react-icons/si";

const items = [
  {
    key: "1",
    label: "En attente",
  },
  {
    key: "2",
    label: "Terminé",
  },
  {
    key: "3",
    label: "Annulé",
  },
];
export default function ViewOneEmploye() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getEmploye(id); // Correction pour obtenir la réponse complète
        setUserInfo(response.data); // Correction pour accéder à la propriété `data` correctement
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations d'employé:",
          error
        );
      }
    }
    fetchData();
  }, [id]);
  console.log("userInfo", userInfo);

  const columns = [
    {
      title: "Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (text) => <a>{formatDate(text)}</a>,
    },
    {
      title: "Intitulé",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Statut",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <Dropdown
          menu={{
            items,
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>{text}</Space>
          </a>
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <div
        className="flex rounded-tl-3xl"
        style={{
          height: "calc(100vh - 88px)",
        }}
      >
        <div className="w-1/4 bg-[#E89D85] rounded-2xl ">
          <button
            className="flex items-center gap-1 justify-start p-3"
            onClick={() => navigate(-2)}
          >
            <IoIosArrowBack name="back" size={20} color="white" />
            <p className="font-thin text-white">retour</p>
          </button>
          <div>
            <div className="mt-5 flex justify-center">
              <div className="flex items-center justify-center w-20 h-20 bg-[#dda390] rounded-full shadow-xl">
                <p className="text-white text-2xl">
                  {userInfo?.firstName
                    ? capitalizeFirstLetter(userInfo.firstName.charAt(0))
                    : ""}
                </p>
                <p className="text-white text-2xl">
                  {userInfo?.lastName
                    ? capitalizeFirstLetter(userInfo.lastName.charAt(0))
                    : ""}
                </p>
              </div>
            </div>
            <div className="flex justify-center flex-row gap-2 items-center mt-2">
              <p className="text-lg font-extralight text-white">
                {userInfo?.firstName
                  ? capitalizeFirstLetter(userInfo.firstName)
                  : ""}
              </p>
              <p className="text-lg font-extralight text-white">
                {userInfo?.lastName
                  ? capitalizeFirstLetter(userInfo.lastName)
                  : ""}
              </p>
            </div>
            {userInfo?.matricule && (
              <div>
                <p className="text-lg font-extralight text-center text-white">
                  {userInfo.matricule}
                </p>
              </div>
            )}
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
                    <p className="text-black">Voir les documents</p>
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
                        <p className="text-lg font-thin">
                          {userInfo?.email || "Non disponible"}
                        </p>
                      </div>
                    </div>
                  </>
                }
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

            <div className="flex flex-col  justify-center mt-3 ">
              <p className="text-white mx-auto">
                Née {formatDate(userInfo.dateOfBirth)} à
              </p>
              <p className="text-white mx-auto">{userInfo.placeOfBirth}</p>
            </div>

            <div className="mt-7 mx-5 space-y-4 ">
              <p className="text-white text-xl font-medium">
                Informations supplémentaires
              </p>
              <div className="flex justify-between space-x-6 border p-2 border-dashed rounded-xl">
                <div className="flex items-center space-x-1">
                  <MdAnimation color="#fff" />
                  <p className="font-light text-white">Matricule</p>
                </div>
                <p className="font-semibold text-white">
                  {userInfo.matricule ? userInfo.matricule : "Indefinie"}
                </p>
              </div>
              <div className="flex justify-between space-x-6 border p-2 border-dashed rounded-xl">
                <div className="flex items-center space-x-1">
                  <MdAnimation color="#fff" />
                  <p className="font-light text-white">Contrat</p>
                </div>
                <p className="font-semibold text-white">
                  {userInfo.contractType ? userInfo.contractType : "Indefinie"}
                </p>
              </div>
              <div className="flex justify-between space-x-6 border p-2 border-dashed rounded-xl">
                <div className="flex items-center space-x-1">
                  <MdAnimation color="#fff" />
                  <p className="font-light text-white">Email</p>
                </div>
                <p className="font-semibold text-white">
                  {userInfo.email ? userInfo.email : "Non definie"}
                </p>
              </div>
              <div className="flex justify-between space-x-6 border p-2 border-dashed rounded-xl">
                <div className="flex items-center space-x-1">
                  <MdAnimation color="#fff" />
                  <p className="font-light text-white">Genre</p>
                </div>
                <p className="font-semibold text-white">
                  {userInfo.gender ? userInfo.gender : "Indefinie"}
                </p>
              </div>
              <div className="flex justify-between space-x-6 border p-2 border-dashed rounded-xl">
                <div className="flex items-center space-x-1">
                  <MdAnimation color="#fff" />
                  <p className="font-light text-white">Post</p>
                </div>
                <p className="font-semibold text-white">
                  {userInfo.position ? userInfo.position.title : "Indefinie"}
                </p>
              </div>
              <div className="flex justify-between space-x-6 border p-2 border-dashed rounded-xl">
                <div className="flex items-center space-x-1">
                  <MdAnimation color="#fff" />
                  <p className="font-light text-white">Département</p>
                </div>

                <p className="font-semibold text-white">
                  {userInfo.department ? userInfo.department.name : "Indefinie"}
                </p>
              </div>

              <div className="flex justify-between space-x-6 border p-2 border-dashed rounded-xl">
                <div className="flex items-center space-x-1">
                  <MdAnimation color="#fff" />
                  <p className="font-light text-white">Contact</p>
                </div>
                <p className="font-semibold text-white">
                  {userInfo.phoneNumber ? userInfo.phoneNumber : "Indefinie"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-grow px-4 py-2">
          <div></div>
          <div>
            <div className="flex items-center space-x-2">
              <SiTask size={25} color="#E89D85" />
              <p className="text-2xl">Taches </p>
            </div>
            <div className="border-dashed border rounded-xl mt-3">
              {userInfo.tasks && (
                <Table
                  columns={columns}
                  dataSource={userInfo.tasks}
                  pagination={{
                    pageSize: 10,
                  }}
                  scroll={{
                    y: 55 * 2,
                  }}
                />
              )}
            </div>
          </div>
          <div className="mt-5">
            <div className="flex items-center space-x-2">
              <SiTask size={25} color="#E89D85" />
              <p className="text-2xl">Congés </p>
            </div>
            <div className="border-dashed border rounded-xl mt-3">
              {userInfo.leaves && (
                <Table
                  columns={columns}
                  dataSource={userInfo.leaves}
                  pagination={{
                    pageSize: 10,
                  }}
                  scroll={{
                    y: 55 * 2,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
