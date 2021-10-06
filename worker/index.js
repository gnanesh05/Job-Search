import {fetchJobs} from './fetch-jobs.js' ;

import { CronJob } from 'cron';


var job = new CronJob('*/1 * * * *', 
  fetchJobs, null, true, 'America/Los_Angeles');
job.start();



