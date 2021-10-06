import React from 'react'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });



  export default function AlertDialogSlide({job, open, handleClose, handleClickOpen}) {
  
    if(!job.name)
    {
      return <div/>
    }
    return (
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{job.name} - {job.company}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
             <div dangerouslySetInnerHTML={{__html: job.description}} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <a href={job.links} target="_blank">
            <Button>Apply</Button>
            </a>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

