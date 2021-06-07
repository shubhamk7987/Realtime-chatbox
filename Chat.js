import { Avatar, IconButton } from '@material-ui/core';
import React from 'react';
import "./Chat.css";
import axios from "./axios";
import {useState} from "react";



function Chat({ messege}){


    const [input, setInput] = useState("");


    const sendMessege =  (eve) =>{
     eve.preventDefault();
   axios.post('/messeges/new', {
            messege: input,
            name: "demo App",
            timestamp: "current",
            received: true
        });
        setInput('');
    }

    return (<div className="Chat">
        <div className="chat_header">
<Avatar/>
<div className="chat_headerInfo">
<h3>Room name</h3>
<p>last seen at...</p>
    </div>

<div className="chat_headerRight">
<IconButton>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>								
</IconButton>
<IconButton>
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M13 14c0 2.21-1.79 4-4 4s-4-1.79-4-4V3c0-1.66 1.34-3 3-3s3 1.34 3 3v9c0 1.1-.9 2-2 2s-2-.9-2-2V4h1v8c0 .55.45 1 1 1s1-.45 1-1V3c0-1.1-.9-2-2-2s-2 .9-2 2v11c0 1.66 1.34 3 3 3s3-1.34 3-3V4h1v10z"/></svg>								
</IconButton>
<IconButton>
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M9 5.5c.83 0 1.5-.67 1.5-1.5S9.83 2.5 9 2.5 7.5 3.17 7.5 4 8.17 5.5 9 5.5zm0 2c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S9.83 7.5 9 7.5zm0 5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/></svg>								
</IconButton>

</div>
</div>


<div className="chat_body">
{messege.map(({messege, name,received,timestamp})=>{
return (
 <p className={`chat_messege ${received && "chat_receiver"}`}>
   
<span className="chat_name">{name}</span>

{messege}

<span className="chat_timestamp" >
{timestamp}</span>

</p>  

)
})}
  


<div className="chat_footer">
<form>
<input value={input} onChange={(e)=> setInput(e.target.value)}  placeholder="type a text" type="text"  />
   <button  onClick={sendMessege } type="submit">send a messege</button>
</form>


</div>

</div>
</div>
    )}

export default Chat;
