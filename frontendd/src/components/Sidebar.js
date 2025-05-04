import React from "react";
import "../index.css";
import { SidebarData } from "./SidebarData";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

function Sidebar() {
    const { logout, user } = useAuth();
    console.log("the actual user :", user);
        const navigate = useNavigate();

    const handleNavigation = (link) => {
        if (link === "/logout") {
            logout();
        } else {
            navigate(link);
        }
    };

    return (
        <div className="sidebar">
            <img src={require("../images/logo-at.png")} alt="algerie-telecom" />
            <ul className="sidebarList">
                {SidebarData
                  .filter(value => value.title !== "Employees" || user?.role === 1)  // Show Employees only for Admin
                  .map((value, key) => (
                    <li
                        key={key}
                        className="row"
                        id={window.location.pathname === value.link ? "active" : ""}
                        onClick={() => handleNavigation(value.link)}
                    >
                        <div id="icon">{value.icon}</div>
                        <div id="title">{value.title}</div>
                    </li>
                  ))
                }
            </ul>
        </div>
    );
}

export default Sidebar;

