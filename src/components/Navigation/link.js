import { BiHomeAlt } from "react-icons/bi";

import {
  FaBuilding,
  FaCogs,
  FaPaperPlane,
  FaPlaneArrival,
  FaUserCircle,
  FaUsers,
  FaUserShield,
  FaLaptopHouse,
  FaLaptopCode,
} from "react-icons/fa";
import { PrivatePaths } from "../../routes/path";

export const adminLinks = [
  {
    route: PrivatePaths.DASHBOARD,
    name: "Dashboard",
    Icon: BiHomeAlt,
    allowed: ["Super Admin", "Team Lead", "Admin", "Manager", "Staff"],
  },
  {
    route: PrivatePaths.MEMBERS,
    name: "Members",
    Icon: FaUserCircle,
    allowed: ["Super Admin", "Team Lead", "Admin", "Manager", "Staff"],
  },

  {
    route: PrivatePaths.YOUTH,
    name: "Youths",
    Icon: FaUsers,
    allowed: ["Super Admin", "Team Lead", "Admin", "Manager", "Staff"],
  },
];
