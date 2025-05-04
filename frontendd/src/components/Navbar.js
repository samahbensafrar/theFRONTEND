import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Navbar() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken"); 
        navigate("/"); 
    };
    const handleProfileClick = () => {
        setOpen(false); 
        navigate("/profile"); 
    };

    return (
        <nav className="navbar">
            <div className="profile-container">
                <AccountCircleIcon
                    className="profile-icon"
                    onClick={() => setOpen(!open)}
                />

                {open && (
                    <div className="dropdown-menu">
                        <ul>
                        <li onClick={handleProfileClick} className="dropdown-link">
                                Profile
                            </li>
                            <li onClick={handleLogout} className="logout-btn">Logout</li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;