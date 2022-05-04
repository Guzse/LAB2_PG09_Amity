import React from "react";
import "./Sidebar.css";
import { HiUserGroup } from "react-icons/hi";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { HiUserCircle } from "react-icons/hi";
import { HiOutlineCog } from "react-icons/hi";



function Sidebar() {

    // const safezoneList = []

    // for (let i = 0;i++; safezoneList.length) {
    //     list.push(<a href="#">{safezoneList}</a>)
    // }

    return ( 
        <div className="sidebarContainer">
            <div className="leftside-sidebar">
                <div className="serverlist">
                    <a href="#"><HiUserGroup className="groupIcon"/></a>
                    <a href="#"><HiUserGroup className="groupIcon"/></a>
                    <a href="#"><HiUserGroup className="groupIcon"/></a>
                </div>
                <a className="createSz" href="#"><HiOutlinePlusCircle className="plusIcon"/></a>
            </div>
            <div className="rightside-sidebar">
                <div className="searcher">
                    <input className="searchbar" type="text" placeholder="Search.."/>
                    <a href="#"><HiUserGroup className="serverIcon"/> <span>server1 </span></a>
                    <a href="#"><HiUserGroup className="serverIcon"/> <span>server1 </span></a>
                    <a href="#"><HiUserGroup className="serverIcon"/> <span>server1 </span></a>
                </div>
                <div className="containterPlanAcc">
                    <hr></hr>
                    <div className="planner">
                        <h3>Next meetup <a><HiOutlinePencilAlt/></a></h3>
                        <span>19 january </span>
                    </div>
                    <hr></hr>
                    <div className="account">
                        <HiUserCircle className="userIcon"/>
                        <span>Jan verstraten</span>
                        <a className="settings" href="#"><HiOutlineCog className="settingIcon"/></a>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Sidebar;