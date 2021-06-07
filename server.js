//importing
import express from 'express';
import mongoose from "mongoose";
import Messeges from "./dbMessege.js";
import Pusher from "pusher";
import cors from "cors";
import bodyparser from "body-parser";

//app config
const app = express();
const port =   8000  || process.env.PORT ;
const pusher = new Pusher({
    appId: "1105507",
    key: "09c95b3de916660713fe",
    secret: "6e6862be8d3046a26b25",
    cluster: "ap2",
    useTLS: true
  });



//middleware
app.use(express.json());
app.use(cors());
//app.use(bodyparser.json());
//app.use(bodyparser.urlencoded({ extended: false }));



//db config
const connection_url = ('mongodb://localhost/test2');

  
 mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db =  mongoose.connection;

db.once('open',()=>{
    console.log("DB connected");


  /*   const msgCollection = db.collection("messegecontents");
    const changeStream= msgCollection.watch();
   
    changeStream.on('change',(change)=>{
 console.log("change occured",change);

if(change.operationType === "insert"){
    const messegeDetails = change.fullDocument;
    pusher.trigger("messeges inserted", {
        name: messegeDetails.user,
        messege: messegeDetails.messege
    });

}
console.log("Error triggering Pusher");

});
  */
}).on('error', (error)=>{
    console.log('error is :',error);

    });


//?????         

//password= KdCKquW3nPUM6neV




//api routes
app.get("/",(req,res)=> res.status(200).send("hello world"));

app.get('/messeges/sync', (req,res)=>{
    Messeges.find( (err,data) =>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(data);
    
        }
    });
});


app.post('/messeges/newdata', (req,res)=>{
    const dbMessege = {
        name: req.body.name,
        messege: req.body.messege
    }
       new Messeges(dbMessege).save().then((data)=>{
           console.log(data)
        pusher.trigger("whatsapp", "messeges", {
           name: data.name,
            messege: data.messege,
            received: data.received
        

          });
      /*  pusher.trigger("my-channel","messege" ,{
            name: data.name,
            messege: data.messege
        });*/
        return res.json(({ success: true, messege: data.messege}));
       });
    

 } );
    

/*
.then((data)=>{
        pusher.trigger("messegecontents","messege" ,{
            name: data.name,
            messege: data.messege
        });
*/



app.post('/messeges/new', (req,res)=>{
    const dbMessege = {
        name: req.body.name,
        messege: req.body.messege,
        timestamp: req.body.timestamp,
        received: req.body.received
    }
    
    Messeges.create(dbMessege, (err,data) =>{
        if(err){
            res.status(500).send(err);
        }
        else{
            pusher.trigger("whatsapp", "messeges", {
                name: data.name,
                 messege: data.messege,
                 received: data.received
             
     
               });
            res.status(200).send( data);
        }
    });
    
});



//listen
app.listen(port, () => console.log("listening on localhost :"+  `${port}` ));