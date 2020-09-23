import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import './style.css'
import {
    Box,
    Paper,
    Grid,
    Typography,
    Divider,
    Button,
   
  } from "@material-ui/core/";
const useStyles= makeStyles(theme => ({
    
      grid:{
          paddingTop: '1rem',
          paddingBottom: '1rem'
      },
      restaurantContainer:{
        margin: '0 10px',
        marginBottom: '1rem',
        
        
        
      }


})
)
const RestaurantCard = (props) => {
    const truncateDescription =(desc) => {
        return desc.split(" ").splice(0, 50).join(" ");
      }
    const classes = useStyles();
    return (
        <>
        <Grid item xs>
        <Paper style={{background: '#FFF3E0'}}>
        <Box component="div" className={classes.restaurantContainer}>
          <Grid container justify="center" alignItems="center" spacing={2}>
            <Grid item>
            <Box component="div" className="imageContainer">
                <img
                  src={`http://localhost:2000/public/${props.rest.restaurantPictures[0].img}`}

                ></img>
              </Box>
              
            </Grid>
            <Grid item xs={12} sm container>
  <Grid item xs container direction="column" spacing={2}>
    
    <Grid item xs>
      <Typography style={{fontSize: 22, fontWeight: 700}} gutterBottom variant="subtitle1">
        {props.rest.name}
      </Typography>
      <Typography style={{fontSize: 16, fontWeight: 700}} variant="body2" gutterBottom>
        {props.rest.location}
      </Typography>
      
    </Grid>
    <Grid item>
      <Typography variant="body2" style={{ cursor: 'pointer' }}>
        {truncateDescription(props.rest.restaurantDescription)}
      </Typography>
    </Grid>
  </Grid>
  <Grid item>
    <Typography style={{fontSize: 20, fontWeight: 700 ,padding: '6px', border: '1px solid #800000', background: '#800000', color: '#fff'}} variant="subtitle1">{props.rest.rating}</Typography>
  </Grid>
</Grid>
          </Grid>
          <Divider style={{background: '#800000'}}/>
          <Grid container className={classes.grid}>

              <Grid item xs={12} md={3}>
                  <Typography variant="body2" style={{fontSize: 16, fontWeight: 700}}>CUSINES</Typography>
              </Grid>
              <Grid item>
                  <Typography variant="body2" style={{fontSize: 16, fontWeight: 700}}>{props.rest.cusine}</Typography>
              </Grid>
          </Grid>
          <Divider style={{background: '#800000'}}/>
          <Grid container className={classes.grid}>

              <Grid item xs={12} md={3}>
                  <Typography variant="body2" style={{fontSize: 16, fontWeight: 700}}>Establishment</Typography>
              </Grid>
              <Grid item>
                  <Typography variant="body2" style={{fontSize: 16, fontWeight: 700}}>{props.rest.establishment}</Typography>
              </Grid>
          </Grid>
          <Divider style={{background: '#800000'}}/>
          <Grid container className={classes.grid}>

              <Grid item xs={12} md={3} >
                  <Typography variant="body2" style={{fontSize: 16, fontWeight: 700}}>Cost for Two</Typography>
              </Grid>
              <Grid item>
                  <Typography variant="body2" style={{fontSize: 16, fontWeight: 700}}>{props.rest.costForTwo}</Typography>
              </Grid>
          </Grid>
          <Grid container>
              <Grid item xs={12} md={12}>
                  <Button onClick={() => props.showRestaurantDetailModal(props.rest)} style={{width: '100%', padding: '1rem', background:'#008000', fontWeight: 700, color: '#fff' }}>VIEW DETAILS</Button>
              </Grid>
          </Grid>
        </Box>
      </Paper>

        </Grid>
        </>
    )
}

export default RestaurantCard
