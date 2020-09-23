import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Box, Grid, Typography, TextField, Button, Avatar } from "@material-ui/core/";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import avatar from '../../images/pizza.png';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../actions/'
import './style.css'


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
    boxShadow: 'inset 0 0 2px #ff8f5e'
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
    fontSize: '16px',
    marginBottom: '1rem'
    

    

    
  },
  subtitle:{
    [theme.breakpoints.down("xs")]:{
      fontSize: '14px'
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

const Signup = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [firstName, setFirstName]= useState('');
  const [lastName, setLastName]= useState('');
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const user= useSelector(state=> state.user);

  const registerUser = () => {
    const user={
      firstName: firstName, 
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    }
    console.log(user);
    dispatch(signup(user));
  }

  return (
    <>
      <Layout>

      <Box component="div" className={classes.mainContainer}>
        <Grid container justify="center" className={classes.grid}>
        <Grid item md={6} xs={10} sm={12}>
        <Box component="div" className={classes.formContainer}>
        <Grid
          container
          justify="center"
        >
          <Box component="form" onSubmit={registerUser}>
            <Avatar src={avatar} variant="square" className={classes.avatar} alt="pizza"></Avatar>
            <Typography variant="h5" style={{textAlign: 'center', fontWeight: 700, color:'#fff'}}>Sign Up</Typography>
            <Typography variant="subtitle1" style={{textAlign: 'center', color: '#fff'}}>
              Please fill out this form to register.
            </Typography>
            <InputField
              fullWidth={true}
              label="Firstname"
              variant="outlined"
              margin="dense"
              size="medium"
              onChange={(e)=> setFirstName(e.target.value)}
              inputProps={{style:{ background: '#fff' }}}
              
            ></InputField>
            <InputField
              fullWidth={true}
              label="Lastname"
              variant="outlined"
              margin="dense"
              size="medium"
              onChange={(e)=> setLastName(e.target.value)}
              inputProps={{style:{ background: '#fff' }}}
           
            ></InputField>
            <InputField
              fullWidth={true}
              label="Email"
              variant="outlined"
              margin="dense"
              size="medium"
              onChange={(e)=> setEmail(e.target.value)}
              inputProps={{style:{ background: '#fff' }}}
              
            ></InputField>
            <InputField
              fullWidth={true}
              type="password"
              label="Password"
              variant="outlined"
              margin="dense"
              size="medium"
              onChange={(e)=> setPassword(e.target.value)}
              inputProps={{style:{ background: '#fff' }}}
              
            ></InputField>
            <InputField
              className={classes.inputField}
              fullWidth={true}
              type="password"
              label="ConfirmPassword"
              variant="outlined"
              margin="dense"
              size="medium"
              onChange={(e)=> setConfirmPassword(e.target.value)}
              inputProps={{style:{ background: '#fff' }}}
            ></InputField>
            {user.error ? <Typography variant="subtitle1" style={{color: 'red'}}>{user.error}</Typography> : 
            <Typography variant="subtitle1" style={{color: 'green'}}>{user.message}</Typography>}
            <Button variant="outlined" onClick={registerUser} className={classes.button} fullWidth={true}>
              Submit
            </Button>
            <Typography className={classes.subtitle} style={{textAlign:'center', color:'#fff'}} variant="subtitle1">Already registered, <span style={{fontWeight: 700}}><a href="/signin">login</a></span> here.</Typography>
          </Box>
        </Grid>
        </Box>
      </Grid>
        </Grid>
      
      </Box>
      </Layout>
      
    </>
  );
};

export default Signup;
