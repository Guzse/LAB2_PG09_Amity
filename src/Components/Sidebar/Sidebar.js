import React from "react";
import "./Sidebar.css";
import { HiUserGroup } from "react-icons/hi";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { HiUserCircle } from "react-icons/hi";
import { HiOutlineCog } from "react-icons/hi";
import { Outlet } from "react-router-dom";

function Sidebar() {
    return ( 
        <>
        <div className="sidebarContainer">
            <div className="leftside-sidebar">
                <div className="serverlist">
                    <HiUserGroup className="groupIcon"/>
                    <HiUserGroup className="groupIcon"/>
                    <HiUserGroup className="groupIcon"/>
                </div>
                <HiOutlinePlusCircle className="plusIcon"/>
            </div>
            <div className="rightside-sidebar">
                <div className="searcher">
                    <input className="searchbar" type="text" placeholder="Search.."/>
                </div>
                <div className="containterPlanAcc">
                    <hr/>
                    <div className="planner">
                        <h3>Next meetup <HiOutlinePencilAlt onClick={ e => console.log("clicketyclick") }/></h3>
                        <span>19 january </span>
                    </div>
                    <hr/>
                    <div className="account">
                        <HiUserCircle className="userIcon"/>
                        <span>Jan verstraten</span>
                        <HiOutlineCog className="settingIcon"/>
                    </div>
                </div>
            </div>
        </div>
        <Outlet/>
        </>
     );
}

export default Sidebar;