import React, {useState, useEffect} from "react";
import Layout from "../../components/Layout";
import "./style.css";
import Search from '../../components/Search';
import RestaurantCard from '../../components/RestaurantCard';
import { generatePublicURL } from '../../urlConfig';
import Dialog from '../../components/UI/Dialog';
import {
  Box,
  Paper,
  Grid,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
 
} from "@material-ui/core/";

import { getRestaurants } from '../../actions/restaurant';
import MobilRightMenuSlider from '@material-ui/core/Drawer';
import { makeStyles } from "@material-ui/core/styles";
import EuroIcon from "@material-ui/icons/Euro";
import MoneyIcon from "@material-ui/icons/Money";
import StarIcon from "@material-ui/icons/Star";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import LocalBarIcon from "@material-ui/icons/LocalBar";
import LocalDiningIcon from "@material-ui/icons/LocalDining";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { addRestaurant } from '../../actions/restaurant';


const useStyles = makeStyles(theme => ({
  rootContainer: {
   
    background: "#DCD3C5",
    height: "100%",
  },
  mainContainer: {
    maxWidth: "80%",
    margin: "auto",

  },
  sidebar:{
      [theme.breakpoints.down("xs")]:{
          display: 'none'
      }

  },

  filters: {
    margin: "1rem",
   
  },
  filterSubtitle: {
    marginLeft: "1rem",
  },
  
  filterbtn:{
    display: 'block',
    margin: '0 auto',
    width: '100%',
    position: 'fixed',
    bottom: '0',
    background: '#000',
    color: '#fff',
    fontWeight: 700,
  
    [theme.breakpoints.up("sm")]:{
      display: 'none'
    }
    
    

  },

  filterMenuContainer:{
   background: '#FFF3E0', 
   width: '100%', 
   height: '100%',
   [theme.breakpoints.down("xs")]:{
    height: '200vh'
  }
          
     
  },

}));

const Home = () => {
  const classes = useStyles();
  const auth = useSelector(state => state.auth)
  const [search, setSearch]= useState('')
  const [bottom, setBottom]= useState(false)
  const dispatch= useDispatch();
  const [open, setOpen] = React.useState(false);
  const [name, setName]= useState('');
  const [location, setLocation]= useState('');
  const [cusine, setCusine]= useState('');
  const [cost, setCost]= useState('');
  const [establishment, setEstablishment]= useState('');
  const [rating, setRating]= useState('');
  const [description, setDescription]= useState('');
  const [restaurantImages, setRestaurantImages]= useState([]);
  const[filteredRestaurants, setFilteredRestaurants]= useState([]);
  const [show, setShow]= useState(false);
  const[restaurantDetails, setRestaurantDetails]= useState({})

  const closeRestaurantDetailModal = () => {
    setShow(false);
  }

  const showRestaurantDetailModal = (rest) => {
    console.log('click')
    setShow(true);
    setRestaurantDetails(rest);
    

  }


  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const onSearch = (e) => {
    setSearch(e.target.value);
    filterRestaurants();
    
  }

  const handleClose = () => {
    const form= new FormData();
    form.append('name', name)
    form.append('location', location);
    form.append('cusine', cusine);
    form.append('costForTwo', cost);
    form.append('establishment', establishment);
    form.append('rating', rating);
    form.append('restaurantDescription', description);

    for(let pic of restaurantImages){
      form.append('restaurantPicture', pic)
    }
    dispatch(addRestaurant(form))
    
    setOpen(false);
    
  };
  
  const toggleSlider = ((open) => () => {
   
    setBottom(open)
    
  })

  const renderRestaurantDetailsModal = () => {
    if(!show){
      return null;
    }
    
    console.log(restaurantDetails)
    return(
      <Dialog open={show} onClose={closeRestaurantDetailModal} dialogTitle={'Restaurant Details'}>
      <Grid container>
          <Grid item md="6">
            <label className="key">Name</label>
            <p className="value">{restaurantDetails.name}</p>
          </Grid>
          <Grid item md="6">
            <label className="key">Location</label>
            <p className="value">{restaurantDetails.location}</p>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md="6">
            <label className="key">Cusine</label>
            <p className="value">{restaurantDetails.cusine}</p>
          </Grid>
          <Grid item md="6">
            <label className="key">Cost for Two</label>
            <p className="value">{restaurantDetails.costForTwo}</p>
          </Grid>
        </Grid>
        <Grid>
          <Grid item md="12">
            <label className="key">Description</label>
            <p className="value">{restaurantDetails.restaurantDescription}</p>
          </Grid>
        </Grid>
        <Grid container>
        
          <Grid item md="12">
            <label className="key">Restaurant Pictures</label>
            <div style={{display: 'flex'}}>
            {restaurantDetails.restaurantPictures.map(picture => {
              return(
    
                <div className="restaurantImgContainer">
                  <img src={generatePublicURL(picture.img)}></img>
                </div>
                
              )
            })}         

            </div>
                 
         
              
          </Grid>
       
          
        </Grid>
    </Dialog>

    )
    
  }

  const handleSort = (val) => {
  
    filterRestaurants(val);
    
  }

  
  const restaurant = useSelector(state => state.restaurant)

  

  const renderRestaurants = (restaurants) => {
    return(
      <Grid item xs justify="center" alignItems="center" style={{marginTop: '2rem'}}>
    <Grid item container xs direction="column" spacing={1} >
      {restaurants.map((rest, idx)=> {
        return(
          <RestaurantCard key={idx} rest={rest} showRestaurantDetailModal= {showRestaurantDetailModal} ></RestaurantCard>
        )
        

      })}
      
      
    </Grid>
   
  </Grid>
    )
    
  }

  const filterRestaurants = (val="") => {
    let filteredRestaurants;
    if(val != ''){
      if(val == 'lowToHigh'){

        filteredRestaurants= restaurant.restaurants.sort((a, b) => a.costForTwo - b.costForTwo)
        val='';
      }
      else if(val == 'highToLow'){
        console.log(val);
        filteredRestaurants= restaurant.restaurants.sort((a, b) => b.costForTwo - a.costForTwo)
        val='';

      }
      else if(val=='rating'){
        filteredRestaurants= restaurant.restaurants.sort((a, b) => b.rating - a.rating)
        val='';

      }
      else if(val=='fast food'){
        filteredRestaurants= restaurant.restaurants.filter(rest => rest.establishment.toLowerCase().includes(val.toLowerCase()));
        val='';

      }
      else if(val=='casual dining'){
        filteredRestaurants= restaurant.restaurants.filter(rest => rest.establishment.toLowerCase().includes(val.toLowerCase()));
        val='';

      }
      else if(val=='cafe'){
        filteredRestaurants= restaurant.restaurants.filter(rest => rest.establishment.toLowerCase().includes(val.toLowerCase()));
        val='';

      }
      else if(val=='DHA'){
        filteredRestaurants= restaurant.restaurants.filter(rest => rest.location.toLowerCase().includes(val.toLowerCase()));
        val='';

      }
      else if(val=='North Nazimabad'){
        filteredRestaurants= restaurant.restaurants.filter(rest => rest.location.toLowerCase().includes(val.toLowerCase()));
        val='';

      }
      else if(val=='Tipu Sultan'){
        filteredRestaurants= restaurant.restaurants.filter(rest => rest.location.toLowerCase().includes(val.toLowerCase()));
        val='';

      }
      else if(val=='Bahdurabad'){
        filteredRestaurants= restaurant.restaurants.filter(rest => rest.location.toLowerCase().includes(val.toLowerCase()));
        val='';

      }
      
      
      else{
        
        filteredRestaurants= restaurant.restaurantsByPrice[val];
        val='';
      }
      

    }else{
      filteredRestaurants= restaurant.restaurants.filter(rest => {
        return(
          rest.name.toLowerCase().includes(search.toLowerCase())
        )
      })

    }
    
    
    
    
    
    setFilteredRestaurants(filteredRestaurants);
    console.log(filteredRestaurants)
   
    
  }

  useEffect(() => {
  
    dispatch(getRestaurants());
    
    
  }, [])

  const handleRestaurantPictures= (e) =>{
    setRestaurantImages([
      ...restaurantImages,
      e.target.files[0]
    ])
  }
  
    
  const renderAddButton = () => {
    return(

    
    <div>
              <Button style={{marginTop: '1rem', background: '#008000', color: '#fff', fontWeight: 700}} onClick={handleClickOpen}
              >Add Restaurant</Button>
              <Dialog open={open} onClose={handleClose} dialogTitle= {'Add New Restaurant'}>
        
          
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
             <TextField
            autoFocus
            margin="dense"
            id="location"
            label="Location"
            type="text"
            onChange={(e) => setLocation(e.target.value)}
            fullWidth
          />
             <TextField
            autoFocus
            margin="dense"
            id="cusine"
            label="Cusine"
            type="text"
            onChange={(e) => setCusine(e.target.value)}
            fullWidth
          />
             <TextField
            autoFocus
            margin="dense"
            id="cost"
            label="Cost for Two"
            type="text"
            onChange={(e) => setCost(e.target.value)}
            fullWidth
          />
             <TextField
            autoFocus
            margin="dense"
            id="establishment"
            label="Establishment"
            type="text"
            onChange={(e) => setEstablishment(e.target.value)}
            fullWidth
          />
             <TextField
            autoFocus
            margin="dense"
            id="rating"
            label="Rating"
            type="text"
            onChange={(e) => setRating(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="textarea"
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="restaurantPicture"
            label="Restaurant Picture"
            type="file"
            onChange={handleRestaurantPictures}
            fullWidth
          />
          {restaurantImages.length > 0 ? (restaurantImages.map(pic => {
          return(
            <div>{pic.name}</div>
          )
    
        })): null}
        
      </Dialog>
      </div>
    )

  }

  


  const filterButton = () => {
    return (
      <Button className={classes.filterbtn} onClick={toggleSlider(true)} >Filter</Button>
    )
  }

  const filtersMenu = () => {
    return(

      <Box component="div" onClick={toggleSlider(false)} className={classes.filterMenuContainer}>
        <Box component="div" className={classes.filters}>
                    <Typography variant="h6">Sort</Typography>
                    <List>
                      <ListItem button onClick={() => handleSort('lowToHigh')}>
                        <ListItemIcon>
                          <EuroIcon />
                        </ListItemIcon>
                        <ListItemText>Price low to high</ListItemText>
                      </ListItem>
                      <ListItem button onClick={() => handleSort('highToLow')}>
                        <ListItemIcon>
                          <EuroIcon />
                        </ListItemIcon>
                        <ListItemText>Price high to low</ListItemText>
                      </ListItem>
                      <ListItem button onClick={() => handleSort('rating')}>
                        <ListItemIcon>
                          <StarIcon />
                        </ListItemIcon>
                        <ListItemText>Rating</ListItemText>
                      </ListItem>
                    </List>
                  </Box>
                  <Divider />
                  <Box component="div" className={classes.filters}>
                    <Typography variant="h6">Cost for Two</Typography>
                    <List>
                      <ListItem button onClick={() => handleSort('under1K')}>
                        <ListItemIcon>
                          <MoneyIcon />
                        </ListItemIcon>
                        <ListItemText>Less than 1000pkr</ListItemText>
                      </ListItem>
                      <ListItem button onClick={() => handleSort('under5K')}>
                        <ListItemIcon>
                          <MoneyIcon />
                        </ListItemIcon>
                        <ListItemText>1000pkr - 5000pkr</ListItemText>
                      </ListItem>
                      <ListItem button onClick={() => handleSort('under20K')}> 
                        <ListItemIcon>
                          <MoneyIcon />
                        </ListItemIcon>
                        <ListItemText>More than 5000pkr</ListItemText>
                      </ListItem>
                    </List>
                  </Box>
                  <Divider />
                  <Box component="div" className={classes.filters}>
                    <Typography variant="h6">Establishment Type</Typography>
                    <List>
                      <ListItem button onClick={() => handleSort('fast food')}>
                        <ListItemIcon>
                          <FastfoodIcon />
                        </ListItemIcon>
                        <ListItemText>Fast Food.</ListItemText>
                      </ListItem>
                      <ListItem button onClick={() => handleSort('casual dining')}>
                        <ListItemIcon>
                          <LocalDiningIcon />
                        </ListItemIcon>
                        <ListItemText>Casual Dining</ListItemText>
                      </ListItem>
                      <ListItem button onClick={() => handleSort('cafe')}>
                        <ListItemIcon>
                          <LocalBarIcon />
                        </ListItemIcon>
                        <ListItemText>Cafe</ListItemText>
                      </ListItem>
                    </List>
                  </Box>
                  <Divider />
                  <Box component="div" className={classes.filters}>
                    <Typography variant="h6">Locality</Typography>
                    <List>
                      <ListItem button onClick={() => handleSort('DHA')}>
                        <ListItemIcon>
                          <LocationCityIcon />
                        </ListItemIcon>
                        <ListItemText>DHA</ListItemText>
                      </ListItem>
                      <ListItem button onClick={() => handleSort('North Nazimabad')}>
                        <ListItemIcon>
                          <LocationCityIcon />
                        </ListItemIcon>
                        <ListItemText>North Nazimabad</ListItemText>
                      </ListItem>
                      <ListItem button onClick={() => handleSort('Tipu Sultan')}>
                        <ListItemIcon>
                          <LocationCityIcon />
                        </ListItemIcon>
                        <ListItemText>Tipu Sultan</ListItemText>
                      </ListItem>
                      <ListItem button onClick={() => handleSort('Bahdurabad')}>
                        <ListItemIcon>
                          <LocationCityIcon />
                        </ListItemIcon>
                        <ListItemText>Bahdurabad</ListItemText>
                      </ListItem>
                    </List>
                  </Box>
                  <Divider/>
                  </Box>
    )
  }
  return (
    <>
      <Box component="header" className={classes.rootContainer}>
        <Layout>
         

          <Box component="section" className={classes.mainContainer}>
          
            <div style={{paddingTop: '5rem'}}>
              <Search onSearch={onSearch} filterRestaurants={filterRestaurants}/>
            </div>
              
            {auth.authenticate ? (
              renderAddButton()
            ): null}
            
           
           
            <Grid container justify="center" spacing={2}>
              <Grid item justify="center" alignItems="center" style={{marginTop: '1rem'}}className={classes.sidebar}>
                <Paper>
                  {filtersMenu()}
                </Paper>
              </Grid>

         {filteredRestaurants.length > 0 ? renderRestaurants(filteredRestaurants) : renderRestaurants(restaurant.restaurants)}
            </Grid>
            

          </Box>
          {filterButton()}
         
        <MobilRightMenuSlider anchor="left" open={bottom}>
              {filtersMenu()}
        </MobilRightMenuSlider>
        {renderRestaurantDetailsModal()}

        </Layout>
       
        
        
      </Box>
    </>
  );
};

export default Home;
