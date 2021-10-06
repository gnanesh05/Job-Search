import fetch from 'node-fetch';
import redis from'redis';

const client = redis.createClient();


import { promisify } from "util";
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

//getAsync.then(console.log).catch(console.error);


 export const fetchJobs =  async ()=>
{
  let resultCount = 1, onPage = 0;
  const allJobs = [];
  while(resultCount>0)
  {
    const res = await fetch(`https://www.themuse.com/api/public/jobs?category=Data%20Science&category=IT&category=Software%20Engineer&category=UX&level=Entry%20Level&page=${onPage}`);
    const jobs = await res.json();
    //console.log(jobs.results);
    if(jobs.results !== undefined)
    {
      allJobs.push(...jobs.results);
      onPage++;
      resultCount = jobs.results.length;
    }
    console.log("we got", resultCount, "jobs");

  }

  //filter jobs
  // const jrJobs = allJobs.filter(job=>{
  //   const jobLevel = job.levels[0].short_name.toLowerCase();
  
  //   if(jobLevel.includes('senior') || jobLevel.includes('manager') || 
  //   jobLevel.includes('sr') || jobLevel.includes('mid') || jobLevel.includes('architect') )
  //   {
  //        return false;
  //   }
  //   return true;
  // })

  // console.log("filter jobs:", jrJobs.length);
  console.log("got jobs" ,allJobs.length );
  //https://www.themuse.com/api/public/jobs?category=Data%20Science&category=IT&category=Software%20Engineer&category=UX&level=Entry%20Level&page=0
  //preprocessing data from api
  const remodel = allJobs.map(item => {
    const container = {};

    container.name = item.name; 
    container.company = item.company.name;
    container.publication_date = item.publication_date;
    container.description = item.contents;
    container.id = item.id;
    if(item.locations[0] !== undefined)
       container.location = item.locations[0].name;
    container.level = item.levels[0].name;
    container.links = item.refs.landing_page;
    container.type = item.type;

    return container;
})
  const success = await setAsync('github', JSON.stringify(remodel));

  console.log({success});

  
    
}


fetchJobs();

//module.exports = fetchJobs()