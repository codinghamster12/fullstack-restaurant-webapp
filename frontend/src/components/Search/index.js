import React from "react";
import Paper from '@material-ui/core/Paper';
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles= makeStyles(theme => ({
    root: {
        display: 'flex'
    }
}))

const Search = (props) => {
    const classes= useStyles();
    
  return (
    <div>
        <Paper component="form" className={classes.root}>
        <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        fullWidth
        onChange={props.onSearch}
      />
      <div style={{background: '#800000'}}>
      <IconButton>
        <SearchIcon style={{color: '#fff'}} onClick={props.filterRestaurants}/>
      </IconButton>
      </div>
      
        </Paper>
      
    </div>
  );
};

export default Search;
