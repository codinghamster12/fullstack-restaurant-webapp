import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import Home from './containers/Home';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from './actions';
import CssBaseline from '@material-ui/core/CssBaseline';


function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if(!auth.authenticate){
      dispatch(isUserLoggedIn())
    }
    
  }, [])
  return (
    <>
    <CssBaseline/>
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup}/>    
    </Router>
    </>
      );
}

export default App;
