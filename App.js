import React,{useEffect} from 'react';
import Sidebar from './Sidebar';
import './App.css';
import Chat from './Chat';
import Pusher from "pusher-js";
import axios from "axios";
import {useState} from 'react';

function App() {

const [messeges, setMesseges] = useState([]);

/* 

axios.get('http://localhost:8000/messeges/sync').then(resp=> {
  setMesseges(resp.data);
  //console.log(resp.data);
}).catch(err =>{
  console.log(err);
});
*/

useEffect(()=>{
  async function fetchPosts() {
    
   await axios.get('http://localhost:8000/messeges/sync').then(resp=> {
  setMesseges(resp.data);
  //console.log(resp.data);
}).catch(err =>{
  console.log("error is",err);
});
  }
  fetchPosts();
  
  },[]);
    console.log(messeges);


useEffect(() => {
  const pusher = new Pusher('09c95b3de916660713fe', {
    cluster: 'ap2'
  });

  const channel = pusher.subscribe('whatsapp');
  channel.bind('messeges', (data) =>{
  // alert(JSON.stringify(data));
    setMesseges([...messeges,data]);
    console.log([...messeges,data]);
  });

  return ()=> {
    channel.unbind_all();
    channel.unsubscribe();
  };

}, [messeges]);


  return (
    <div className="app">
     <h1>Realtime chat application</h1>
<div className="app-body">
<Sidebar />
  
 {  
  <Chat messege={messeges}/>

}
    </div>
   
    

    </div>

  
  );

}
export default App;
