import { RxDashboard } from "react-icons/rx";
import { FaUsers } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";

export const data=[
    {
        id:1,
        icon:<RxDashboard className="text-xl" />,
        name:"Dashboard",
        url:"/layout"
    },
    {
        id:2,
        icon:<FaUsers className="text-xl" />,
        name:"Staff",
        url:"/layout/staff"
    },
    {
        id:3,
        icon:<FaUserPlus className="text-xl" />,
        name:"Visitor",
        url:"/layout/visitor"
    },
    {
        id:4,
        icon:<FaWpforms className="text-xl" />,
        name:"Appointment",
        url:"/layout/appointment"
    },
    {
        id:4,
        icon:<CiLogout className="text-xl" />,
        name:"Logout",
        url:"/layout/logout"
    },
]