import { Avatar } from '@material-ui/core'
import React from 'react'
import "./SidebarChats.css"

function SidebarChats() {
    return (
        <div className="sidebarChat">
            <Avatar/>
            <div className="sidebarChat_info">
               <h2>Room name</h2>
               <p>This is the last messege</p> 
            </div>
        </div>
    );
}

export default SidebarChats
