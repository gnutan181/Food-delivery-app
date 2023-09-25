import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import {connectDb,getData} from "./db.js";
import CreateUser from "./Routes/Createuser.js";
import DisplayData from "./Routes/DisplayData.js";
import Orderdata from "./Routes/Orderdata.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
const port = 3900
dotenv.config('./.env')
const app = express()

connectDb()
getData()
const corsOptions = {
  origin:'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(express.static(path.join(__dirname,'./client/build')))


app.use('*',function(req,res){
  res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

// app.get('/',(req,res)=>{
//   res.send('helllo')
// })
app.use('/api',CreateUser);
app.use('/api',DisplayData);
app.use('/api',Orderdata)


app.listen(port, () => {
  console.log(`foodapp Backend listening on port ${port}`)
})  

