import React from "react";

function Sidebar() {

    // const safezoneList = []

    // for (let i = 0;i++; safezoneList.length) {
    //     list.push(<a href="#">{safezoneList}</a>)
    // }

    return ( 
        <div className="sidebarContainer">
            <p>Sidebar</p>
            <div className="safezoneList">
                <a href="#">server1</a>
                <a href="#">server2</a>
                <a href="#">server3</a>
                <a href="#">createSafezone</a>
            </div>
            <div className="usersAndOptions">
                <input type="text" placeholder="Search.."/>
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