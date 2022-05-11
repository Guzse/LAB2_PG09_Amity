import React from "react";
import "./Sidebar.css";
import { Button, Dialog } from "@mui/material";
import SafezoneForm from "../safezoneForm/safezoneForm";

import { HiUserGroup } from "react-icons/hi";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { HiUserCircle } from "react-icons/hi";
import { HiOutlineCog } from "react-icons/hi";



 function Sidebar() {

    return ( 
        <div className="sidebarContainer">
            <div className="leftside-sidebar">
                <div className="serverlist">
                    <a href="#"><HiUserGroup className="groupIcon"/></a>
                    <a href="#"><HiUserGroup className="groupIcon"/></a>
                    <a href="#"><HiUserGroup className="groupIcon"/></a>
                </div>
                <a to="#" onClick={handleClickOpen} className="createSz" ><HiOutlinePlusCircle className="plusIcon"/></a>
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
                        <h3>Next meetup <HiOutlinePencilAlt/></h3>
                        {/* <SimpleDialog
                            selectedValue={selectedValue}
                            open={open}
                            onClose={handleClose}
                        /> */}
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