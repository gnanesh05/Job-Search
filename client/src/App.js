
import React,{useState, useEffect} from 'react';
import './App.css';
import {Jobs} from './Jobs'

const jobs = [
  {name: "cashier", type:"external",id:12332112},
  {name: "cashier", type:"external",id:12332112}
];

const JOB_API_URL = "http://localhost:5000/jobs";

const fetchJobs = async(updateJobs)=>{
  const res = await fetch(JOB_API_URL);
  const jobs = await res.json();
  updateJobs(jobs);
  console.log({jobs});
}


function App() {

  const [jobList, updateJobs ] = useState([]);

    useEffect(()=>{
    fetchJobs(updateJobs);
  },[]);

  return (
    <div className="App">
     <Jobs jobs={jobList}/>
    </div>
  );
}

export default App;
