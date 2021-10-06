import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'


export const Job = ({job, onClick}) => {

    return (
        <Paper className ={'job'} onClick={onClick} >
           {/* <p>{job.id}</p>  */}
           <div>

           <Typography variant='h5'>{job.name}</Typography>
           <Typography variant='h6'> {job.company}</Typography>
           <Typography> {job.location}</Typography>

           </div>

            <div>
            <Typography> {job.publication_date.split('T')[0]}</Typography> 
            </div> 
        </Paper>

        
    )
}
