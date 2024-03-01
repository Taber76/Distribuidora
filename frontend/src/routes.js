
import { BiHomeAlt2 } from "react-icons/bi";
import { FaTruck } from "react-icons/fa";
import { MdOutlineStorage } from "react-icons/md";
import { FaWineBottle } from "react-icons/fa";
import { MdContactPhone } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

export const routes = [
  {
    title: "Inicio",
    path: "/",
    Icon: BiHomeAlt2,
  },
  {
    title: "Ventas",
    path: "/orders",
    Icon: FaTruck,
  },
  {
    title: "Compras",
    path: "#2",
    Icon: MdOutlineStorage,
  },
  {
    title: "Productos",
    path: "/items",
    Icon: FaWineBottle,
  },
  {
    title: "Contactos",
    path: "/contacts",
    Icon: MdContactPhone,
  },
  {
    title: "Usuarios",
    path: "/users",
    Icon: FaUsers,
  }
];