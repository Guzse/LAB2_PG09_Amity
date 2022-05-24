import React, { useState } from "react";
import "./Sidebar.css";
import { Outlet } from "react-router-dom";
import { SidebarLeft } from "./SidebarLeft/SidebarLeft";
import { SidebarMain } from "./SidebarMain/SidebarMain";
import IconWrapper from "../IconWrapper/IconWrapper";
import { HiMenu } from 'react-icons/hi';
import { LOCAL_SIDEBAR_VISIBLE, screenWidthSmall } from "../../Global";

function Sidebar() {
    const getLocalSidebarState = () => window.localStorage.getItem(LOCAL_SIDEBAR_VISIBLE) === 'true' ? true : false;
    const [hidden, setHidden] = useState(screenWidthSmall() ? true : getLocalSidebarState());

    const toggleSidebar = () => {
        window.localStorage.setItem(LOCAL_SIDEBAR_VISIBLE, !hidden);
        setHidden(!hidden);
    }

    return (
        <>
            <IconWrapper className="menuToggle" onClick={toggleSidebar}>
                <HiMenu />
            </IconWrapper>
            <div className={`sidebarContainer ${hidden ? "closed": ""}`} >
                <SidebarLeft />
                <div className="sidebar-right">
                    <SidebarMain
                        onClickSettings={val => console.log('onClickSettings', val)}
                        onClickUser={val => console.log('onClickUser', val)} />
                </div>
            </div>
            <div id="outlet" className={`${hidden ? "" : "offset"}`}>
                <Outlet />
            </div>
        </>
    );
}

export default Sidebar;