const mongoose= require('mongoose');
const restaurantSchema= new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true
    },
    location:{
        type:String,
        required: true,
        trim: true
    },
    restaurantDescription:{
        type: String,
        required: true
    },
    cusine:{
        type:String,
        required: true
    },
    costForTwo:{
        type: Number,
        required: true
    },
    establishment:{
        type:String,
        required: true
    },
    restaurantPictures: [
        {
            img: {
                type:String
            }
        }
    ],
    rating: {
        type:Number
    },
    
 
    createdBy:{
        type:mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    updatedAt: Date,

   
}, {timestamps: true})

module.exports= mongoose.model('Restaurant', restaurantSchema)