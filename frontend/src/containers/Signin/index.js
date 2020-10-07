import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { Box, Grid, Typography, TextField, Button, Avatar } from "@material-ui/core/";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import avatar from '../../images/burger.jpg';
import { login } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';






const useStyles = makeStyles((theme) => ({
  
  mainContainer:{
    
    maxWidth:'50%',
    margin:'auto',
    overflow:'hidden',
    padding: '0 2rem',

  
    [theme.breakpoints.down("xs")]:{
      maxWidth:'100%',
      margin:'auto',
      overflow:'hidden',
      padding: '0 1rem',
      
    }
,
    
    
    
},
avatar:{
  display:'block',
  margin:'0.5rem auto',
  width: theme.spacing(15),
  height: theme.spacing(15)

},
  formContainer: {
    border: "1px solid #ff8f5e",
    padding: '2rem',
    background: '#ff8f5e',
    boxShadow: 'inset 0 0 2px #ff8f5e',
    height: '550px'
   
  },
  grid:{
    marginTop: '6rem'
  },
  button:{
    marginTop: '1rem',
    background: '	#008000',
    padding: '10px',
    width: '10rem',
    display:'block',
    margin: '0 auto',
    color: '#fff',
    fontWeight: 600,
    fontSize: '16px'
    

    

    
  },
  subtitle:{
    fontSize: '14px',
      [theme.breakpoints.down("xs")]:{
        fontSize: '16px'
      }
      
  }
})
);

const InputField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "tomato",
    },
    "& label": {
      color: "#8B4513",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#DEB887",
        
        
      },
      "& hover fieldset": {
        borderColor: "#DEB887",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#DEB887",
        
      },
    },
  },
})(TextField);

const Signin = () => {
  const classes = useStyles();
  const dispatch= useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword]= useState('');
  const auth = useSelector(state => state.auth)

  






  

  const userLogin = (e) => {
      e.preventDefault();
      const user={
          email: email,
          password: password
      }
      dispatch(login(user));

      
  }
  if(auth.authenticate){
    return <Redirect to ={"/"}></Redirect>
  }

  

  return (
    <>
    <Box component="body" className={classes.rootContainer}>
      <Layout>
      


        
      <Box component="div" className={classes.mainContainer}>
        <Grid container justify="center" className={classes.grid}>
        <Grid item md={6} xs={10} sm={12}>
        <Box component="div" className={classes.formContainer}>
        <Grid
          container
          justify="center"
        >
          <form onSubmit={userLogin} style={{marginTop: '50px'}}>
          <Avatar src={avatar} variant="square" className={classes.avatar} alt="pizza"></Avatar>
            <Typography variant="h5" style={{textAlign: 'center', fontWeight: 700,color:'#fff'}}>Login</Typography>
            <Typography variant="subtitle1" style={{textAlign: 'center',  color: '#fff'}} className={classes.subtitle}>
              Please <span style={{fontWeight: 700}}><a href={'https://fullstack-restaurant-app97.herokuapp.com/signup'}>register</a></span> if you haven't registered yet.
            </Typography>
            <InputField
              fullWidth={true}
              label="Email"
              variant="outlined"
              margin="dense"
              size="medium"
              inputProps={{style:{ background: '#fff' }}}
              onChange={(e) => setEmail(e.target.value)}
              
            ></InputField>
            <InputField
              fullWidth={true}
              label="Password"
              type="password"
              variant="outlined"
              margin="dense"
              size="medium"
              inputProps={{style:{ background: '#fff' }}}
              onChange={(e) => setPassword(e.target.value)}
            ></InputField>
            
            {auth.error ? <Typography variant="subtitle1" style={{color: 'red'}}>{auth.error}</Typography> : null}
            
            <Button type="submit" variant="outlined" className={classes.button} fullWidth={true}>
              LogIn
            </Button>
          </form>
            
          
        </Grid>
        </Box>
      </Grid>
        </Grid>
      
      </Box>
     

      </Layout>
      
      </Box>
      
    </>
  );
};

export default Signin;
