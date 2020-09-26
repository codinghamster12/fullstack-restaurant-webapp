const express= require('express');
const router= express.Router();
const Restaurant= require('../models/restaurant');
const { createRestaurant, getRestaurants, deleteRestaurant } = require('../controllers/restaurant');
const { adminMiddleware, requireSignIn } = require('../common_middleware');
const multer= require('multer');
const path= require('path');
const shortid= require('shortid');

const storage = multer.diskStorage(
 
  {
  
    destination: function (req, file, cb) {
      cb(null, path.join('https://fullstack-restaurant-app97.herokuapp.com/', 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })
   
const upload = multer({ storage })


router.post('/restaurant/create', requireSignIn, adminMiddleware, upload.array('restaurantPicture'), createRestaurant)
router.get('/restaurant/get', getRestaurants )
router.delete('/restaurant/delete/:id', requireSignIn, adminMiddleware, deleteRestaurant)


    

module.exports= router;