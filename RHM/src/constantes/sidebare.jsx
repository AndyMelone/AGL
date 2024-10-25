import {
  UserOutlined,
  HistoryOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { FaUserAltSlash } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { FaRegCircleUser } from "react-icons/fa6";
import { PiArrowsCounterClockwise } from "react-icons/pi";
import { FcLeave } from "react-icons/fc";
import { FaHandshake } from "react-icons/fa";
import { IoMdBusiness } from "react-icons/io";
import { IoIosBusiness } from "react-icons/io";

import { Link } from "react-router-dom";

function getItem(label, key, icon, path, children) {
  return {
    key,
    icon,
    label: path ? <Link to={path}>{label}</Link> : label,
    children,
  };
}

export const items = [
  getItem("Dashboard", "1", <RxDashboard />, "/"),
  getItem("Employés", "sub1", <FaRegCircleUser />, null, [
    getItem("Employés", "3", <UserOutlined />, "/employees/list"),
    getItem(
      "Compteur",
      "5",
      <PiArrowsCounterClockwise />,
      "/employees/counter"
    ),
    getItem("Absences", "6", <FaUserAltSlash />, "/employees/absences"),
    getItem("Congés", "7", <FcLeave />, "/absences/leave-request"),
  ]),

  getItem("Entreprise", "sub5", <IoMdBusiness />, null, [
    getItem("Département", "19", <IoIosBusiness />, "/company/departments"),
    getItem("Partenaire", "20", <FaHandshake />, "/company/partner"),
  ]),

  getItem("Stock", "sub6", <IoMdBusiness />, null, [
    getItem("Vue d'ensemble", "21", <AppstoreOutlined />, "/stock/overview"),
    getItem("Produits", "22", <IoIosBusiness />, "/stock/products"),
    getItem("Commande", "23", <IoIosBusiness />, "/stock/order"),
    getItem("Reglage", "24", <SettingOutlined />, "/stock/adjustment"),
  ]),

  getItem("Caise", "sub7", <IoMdBusiness />, null, [
    getItem("Vue d'ensemble", "25", <AppstoreOutlined />, "/caise/overview"),
    getItem("Historique", "26", <HistoryOutlined />, "/caise/history"),
    getItem("Reglage", "28", <SettingOutlined />, "/caise/adjustment"),
  ]),
];
