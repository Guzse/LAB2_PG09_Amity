import React, { useState } from "react";
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
                        onClickProfile={val => console.log(val)}
                        onClickSettings={val => console.log(val)} 
                        onClickUser={val => console.log(val)} />
                </div>
            </div>
            <Outlet />
        </>
    );
}

export default Sidebar;