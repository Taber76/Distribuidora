
import { BiHomeAlt2 } from "react-icons/bi";
import { FaTruck } from "react-icons/fa";
import { MdOutlineStorage } from "react-icons/md";
import { FaWineBottle } from "react-icons/fa";
import { MdContactPhone } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

export const routes = [
  {
    title: "Inicio",
    href: "/",
    Icon: BiHomeAlt2,
  },
  {
    title: "Ventas",
    href: "#1",
    Icon: FaTruck,
  },
  {
    title: "Compras",
    href: "#2",
    Icon: MdOutlineStorage,
  },
  {
    title: "Productos",
    href: "#3",
    Icon: FaWineBottle,
  },
  {
    title: "Contactos",
    href: "#4",
    Icon: MdContactPhone,
  },
  {
    title: "Usuarios",
    href: "#5",
    Icon: FaUsers,
  }
];