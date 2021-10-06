import express from 'express';
const app = express();

import redis from'redis';

const client = redis.createClient();


import { promisify } from "util";
const getAsync = promisify(client.get).bind(client);
//const setAsync = promisify(client.set).bind(client);

app.get("/jobs", async(req,res)=>{
    const jobs = await getAsync('github');
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // console.log(JSON.parse(jobs));

    
    return res.send(JSON.parse(jobs));
    
})

const port = 5000;
app.listen(port, ()=>{
    console.log(`app running in port ${port}`);
})