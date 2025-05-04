import React from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

export const SidebarData = [
    {
        title: "Dashboard",
        icon: <DashboardIcon />,
        link: "/Dashboard",
    },
    {
        title: "Employees",
        icon: <GroupsIcon />,
        link: "/LesEmployees",
        adminOnly: true
    },
    {
        title: "Listes des clients",
        icon: <FormatListNumberedIcon />,
        link: "/home",
    },
    {
        title: "Profile",
        icon: <PersonIcon />,
        link: "/profile",   
    },
    {
        title: "Logout",
        icon: <LogoutIcon />,
        link: "/logout",
    }
];