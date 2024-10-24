import { CiLogout } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import useAuthStore from "../stores/store_auth";


export const dropDownMenuItems = [
  {
    key: "1",
    label: (
      <div className="flex items-center gap-1">
        <CgProfile />
        <p>Mon profil</p>
      </div>
    ),
    onClick: () => {
      console.log("Mon profil cliqué");
    },
  },
  {
    key: "2",
    label: (
      <div className="flex items-center gap-1">
        <IoSettingsOutline />
        <p>Mes paramètres</p>
      </div>
    ),
    disabled: true,
  },
  {
    key: "3",
    danger: true,
    label: (
      <div className="flex items-center gap-1">
        <CiLogout />
        <p>Déconnexion</p>
      </div>
    ),
    onClick: () => {
      const logout = useAuthStore.getState().logout; 
      logout(); 
      window.location.href = "/auth";
    },
  },
];
