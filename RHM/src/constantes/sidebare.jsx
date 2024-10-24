import {
  UserOutlined,
  CalendarOutlined,
  FileSearchOutlined,
  DollarOutlined,
  HistoryOutlined,
  FolderOpenOutlined,
  CarryOutOutlined,
  BankOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { RxDashboard } from "react-icons/rx";
import { FaTasks } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { PiArrowsCounterClockwise } from "react-icons/pi";

import { FaHandshake } from "react-icons/fa";
import { IoMdBusiness } from "react-icons/io";
import { MdOutlineLibraryAddCheck } from "react-icons/md";
import { BsFolder, BsPersonBadge } from "react-icons/bs";
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
  ]),
  getItem("Demande", "sub2", <MdOutlineLibraryAddCheck />, null, [
    getItem(
      "Demande de congés",
      "8",
      <CarryOutOutlined />,
      "/absences/leave-request"
    ), //Les demandes s'affiche ici s'il valide il passe au suvi ,dans le cas contraire  dans les archives

    // getItem("Calendrier des absences", "9", <CalendarOutlined />, "/absences/absence-calendar"),
    // getItem("Calendrier des congés", "10", <CalendarOutlined />, "/absences/leave-calendar"),
    getItem(
      "Suivi des congés",
      "11",
      <FileSearchOutlined />,
      "/absences/leave-tracking"
    ), //les demandes des congés   validé
  ]),

  // getItem("Gestion des temps", "sub3", <IoMdTime />, null, [
  //   getItem("Pointages", "12", <FieldTimeOutlined />, "/time-management/time-tracking"),
  //   getItem("Heures supplémentaires", "13", <IoMdTime />, "/time-management/overtime"),
  //   getItem("Horaire", "14", <CalendarOutlined />, "/time-management/schedule"),
  // ]),

  getItem("Entreprise", "sub5", <IoMdBusiness />, null, [
    getItem("Postes", "18", <BsPersonBadge />, "/company/posts"),
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
