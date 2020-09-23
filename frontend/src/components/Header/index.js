import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemIcon,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonIcon from '@material-ui/icons/Person';
import { makeStyles } from "@material-ui/core/styles";
import MobilRightMenuSlider from "@material-ui/core/Drawer";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/auth";
import avatar from "../../avatar.png";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const nonLoggedInMenuItems = [
  {
    listText: "Signin",
    listPath: "/signin",
    listIcon: <VpnKeyIcon/>
  },
  {
    listText: "Signup",
    listPath: "/signup",
    listIcon: <PersonIcon/>
  },
];

const loggedInMenuItems = [
  {
    listText: "Signout",
    listPath: "/",
    listIcon: <ExitToAppIcon />,
  },
];
const useStyles = makeStyles((theme) => ({
  menuSliderContainer: {
    background: "#000",
    width: "200px",
    height: "100%",
  },
  listItem: {
    display: "inline",
  },
  listItemText: {
    display: "inline-block",
    color: "#000",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  menuIcon: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  avatar: {
    display: "block",
    margin: "0.5rem auto",
    width: theme.spacing(13),
    height: theme.spacing(13),
  },
}));

const Header = () => {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    right: false,
  });
  const toggleSlider = (slider, open) => () => {
    setState({
      ...state,
      [slider]: open,
    });
  };

  const signout = () => {
    console.log("signout");
    dispatch(logout());
  };
  const renderLoggedInLinks = () => {
    return loggedInMenuItems.map((listItem, key) => {
      return (
        <ListItem
          button
          key={key}
          component={Link}
          to={listItem.listPath}
          onClick={signout}
        >
          <ListItemText style={{ color: "#fff" }}>
            {listItem.listText}
          </ListItemText>
        </ListItem>
      );
    });
  };

  const renderNonLoggedInLinks = () => {
    return nonLoggedInMenuItems.map((listItem, key) => {
      return (
        <ListItem button key={key} component={Link} to={listItem.listPath}>
          <ListItemText style={{ color: "#fff" }}>
            {listItem.listText}
          </ListItemText>
        </ListItem>
      );
    });
  };

  const sider = (side) => {
    return (
      <Box
        component="div"
        className={classes.menuSliderContainer}
        onClick={toggleSlider(side, false)}
      >
        <Avatar className={classes.avatar} src={avatar} alt="John Doe"></Avatar>

        <List>
          {auth.authenticate
            ? loggedInMenuItems.map((listItem, key) => {
                return (
                  <ListItem
                    button
                    key={key}
                    component={Link}
                    to={listItem.listPath}
                    onClick={signout}
                  >
                    <ListItemIcon style={{ color: "#fff" }}>
                      {listItem.listIcon}
                    </ListItemIcon>
                    <ListItemText style={{ color: "#fff" }}>
                      {listItem.listText}
                    </ListItemText>
                    
                  </ListItem>
                );
              })
            : nonLoggedInMenuItems.map((listItem, key) => {
                return (
                  <ListItem
                    button
                    key={key}
                    component={Link}
                    to={listItem.listPath}
                  >
                    <ListItemIcon style={{ color: "#fff" }}>
                      {listItem.listIcon}
                    </ListItemIcon>
                    <ListItemText style={{ color: "#fff" }}>
                      {listItem.listText}
                    </ListItemText>
                  </ListItem>
                );
              })}
        </List>
      </Box>
    );
  };
  return (
    <>
      <Box component="nav">
        <AppBar
          position="fixed"
          style={{ background: "#e8ede1", borderBottom: "5px solid #fff" }}
        >
          <Toolbar>
            <Typography variant="h6" style={{ color: "#000", flex: 1 }}>
              FoodHub
            </Typography>

            <List>
              {auth.authenticate
                ? loggedInMenuItems.map((listItem, key) => {
                    return (
                      <ListItem
                        button
                        key={key}
                        component={Link}
                        to={listItem.listPath}
                        onClick={signout}
                        className={classes.listItem}
                      >
                        <ListItemText className={classes.listItemText}>
                          {listItem.listText}
                        </ListItemText>
                      </ListItem>
                    );
                  })
                : nonLoggedInMenuItems.map((listItem, key) => {
                    return (
                      <ListItem
                        button
                        key={key}
                        component={Link}
                        to={listItem.listPath}
                        className={classes.listItem}
                      >
                        <ListItemText className={classes.listItemText}>
                          {listItem.listText}
                        </ListItemText>
                      </ListItem>
                    );
                  })}
            </List>

            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleSlider("right", true)}
            >
              <MenuIcon
                style={{ color: "#000" }}
                className={classes.menuIcon}
              />
            </IconButton>
            <MobilRightMenuSlider anchor="right" open={state.right}>
              {sider("right")}
            </MobilRightMenuSlider>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
