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
                        onClickProfile={val => console.log('onClickProfile', val)}
                        onClickSettings={val => console.log('onClickSettings', val)} 
                        onClickUser={val => console.log('onClickUser', val)} />
                </div>
            </div>
            <Outlet />
        </>
    );
}

export default Sidebar;