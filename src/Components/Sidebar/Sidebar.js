import React from "react";
import "./Sidebar.css";
import { Outlet } from "react-router-dom";
import { SidebarLeft } from "./SidebarLeft/SidebarLeft";
import { SidebarMain } from "./SidebarMain/SidebarMain";

function Sidebar() {
    return (
        <>
            <div className="sidebarContainer">
                <SidebarLeft />
                <div className="sidebar-right">
                    <SidebarMain
                        onClickSettings={val => console.log('onClickSettings', val)} 
                        onClickUser={val => console.log('onClickUser', val)} />
                </div>
            </div>
            <div id="outlet">
                <Outlet />
            </div>
        </>
    );
}

export default Sidebar;