import React from "react";
import "./Sidebar.css";

function Sidebar() {

    // const safezoneList = []

    // for (let i = 0;i++; safezoneList.length) {
    //     list.push(<a href="#">{safezoneList}</a>)
    // }

    return ( 
        <div className="sidebarContainer">
            <div className="leftside-sidebar">
                <div className="serverlist">
                    <a href="#">server1</a>
                    <a href="#">server2</a>
                    <a href="#">server3</a>
                </div>
                <a className="createSz" href="#">createSafezone</a>
            </div>
            <div className="rightside-sideBar">
                <div className="searcher">
                    <input type="text" placeholder="Search.."/>
                    <a href="#">server1</a>
                    <a href="#">server2</a>
                    <a href="#">server3</a>
                </div>
                <div className="planner">
                    <h3>Next meetup</h3>
                    <span>Next meetup</span>
                </div>
                <div className="account">
                    <span>Image</span>
                    <span>Jan verstraten</span>
                    <a className="settings" href="#">IMG</a>
                </div>
            </div>
        </div>
     );
}

export default Sidebar;