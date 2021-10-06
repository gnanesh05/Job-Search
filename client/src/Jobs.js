import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import MobileStepper from '@material-ui/core/MobileStepper';
import { useTheme } from '@material-ui/core/styles';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import AlertDialogSlide from './JobModal'

import { Job } from './Job'

export const Jobs = ({jobs}) => {
    jobs = Array.from(jobs);
    
    //modal
    const [open, setOpen] = React.useState(false);

    const [selectedJob, selectJob] = React.useState({});

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };


    //pagination
    const numJobs = jobs.length;
    const numPages = Math.ceil(numJobs/25);

    

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const jobsOnPage = jobs.slice(activeStep*25, (activeStep * 25) + 25);
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div className="jobs">
            <AlertDialogSlide open={open} job={selectedJob} handleClose={handleClose} handleClickOpen={handleClickOpen}/>
            <Typography variant="h4" component="h1">
             Entry Level Jobs
            </Typography>

            <Typography variant="h6" component="h2">
             Found {numJobs} jobs
            </Typography>

           {
               jobsOnPage.map((job,i)=>(<Job key={i} job={job} onClick={()=>{
                   selectJob(job);
                   handleClickOpen();
                    }
                } />))
           }

       <div>
        Page {activeStep + 1} of {numPages}
        </div>         
    <MobileStepper
        variant="progress"
        steps={numPages}
        position="static"
        activeStep={activeStep}
        sx={{ maxWidth: 400, flexGrow: 2 }}
        nextButton={
            <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
            Next
            {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
            ) : (
                <KeyboardArrowRight />
            )}
            </Button>
        }
        backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
            ) : (
                <KeyboardArrowLeft />
            )}
            Back
            </Button>
        }
        />



        </div>
    )
}
