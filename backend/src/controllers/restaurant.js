const Restaurant= require('../models/restaurant');

exports.createRestaurant = (req, res, next) => {
    const { name, location, cusine, restaurantDescription, costForTwo, rating, establishment} = req.body;
    let restaurantPictures= []
    if(req.files.length > 0){
        restaurantPictures= req.files.map(file => {
            return { img: file.filename }
        })

    }
    const restaurant= new Restaurant({
        name,
        location,
        cusine,
        restaurantDescription,
        costForTwo,
        rating,
        establishment,
        restaurantPictures,
        createdBy: req.user._id
    })
    restaurant.save((error, rest) => {
        if(error){
            return res.status(400).json({
                error
            })
        }
        else{
            return res.status(201).json({
                rest
            })
        }
    })
    
 

}
exports.getRestaurants = (req, res, next) => {
    Restaurant.find({})
    .exec((error, restaurants)=> {
        if(error){
            return res.status(400).json({
                error
            })
        }
        if(restaurants){
            return res.status(200).json({
                restaurants,
                restaurantsByPrice:{
                    under1K: restaurants.filter(rest => rest.costForTwo <= 1000),
                    under5K: restaurants.filter(rest => rest.costForTwo > 1000 && rest.costForTwo <=5000),
                    under20K: restaurants.filter(rest => rest.costForTwo > 5000 && rest.costForTwo <=20000)
                    



                }
            })
        }
    })
    
}

exports.deleteRestaurant= (req, res) => {
    Restaurant.findByIdAndDelete(req.params.id)
    .exec((error, restaurant) => {
        if(error){
            return res.status(400).json({
                error
            })
        }
        else{
            return res.status(201).json({
                message: 'Restaurant deleted successfully'
            })
        }
    })
}