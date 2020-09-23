import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core'

const NewDialog = (props) => {
  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.dialogTitle}</DialogTitle>
        <DialogContent>
          
          {props.children}
        </DialogContent>
      
        

        

       
    
          
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={props.onClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>
  )
}

export default NewDialog
