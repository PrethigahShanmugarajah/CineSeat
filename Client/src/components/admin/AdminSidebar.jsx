import React from "react";
import {
  FaClipboardList,
  FaList,
  FaPlusSquare,
  FaThLarge,
  FaUserCircle,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const user = {
    firstName: "Admin",
    lastName: "User",
  };

  const adminNavlinks = [
    { name: "Dashboard", path: "/admin", icon: FaThLarge },
    { name: "Add Shows", path: "/admin/add-shows", icon: FaPlusSquare },
    { name: "List Shows", path: "/admin/list-shows", icon: FaList },
    {
      name: "List Bookings",
      path: "/admin/list-bookings",
      icon: FaClipboardList,
    },
  ];

  return (
    <div className="h-[calc(100vh-64px)] md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-gray-300/20 text-sm4">
      <FaUserCircle className="h-14 w-14 text-primary mx-auto" />

      <p className="mt-2 text-base max-[md:hidden]">
        {user.firstName} {user.lastName}
      </p>

      <div className="w-full">
        {adminNavlinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            end
            className={({ isActive }) =>
              `relative flex items-center max-md:justify-center gap-2 w-full py-2.5 md:pl-10 first:mt-6 text-white ${
                isActive && "bg-primary/15 text-primary group"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <link.icon className="w-5 h-5" />
                <p className="max-md:hidden">{link.name}</p>
                <span
                  className={`w-1.5 h-10 rounded-l right-0 absolute ${
                    isActive && "bg-primary"
                  }`}
                ></span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
