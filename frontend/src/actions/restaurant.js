import { restaurantConstants } from "./constants"
import axios from '../helpers/axios';

export const getRestaurants = () => {
    return async dispatch => {
        dispatch({
            type: restaurantConstants.GET_RESTAURANTS_REQUEST
        })
        
        const res= await axios.get('/restaurant/get')

        if(res.status==200){
            const { restaurants, restaurantsByPrice } = res.data;
            dispatch({
                type: restaurantConstants.GET_RESTAURANTS_SUCCESS,
                payload: {
                    restaurants,
                    restaurantsByPrice
                }
                
            })
        }
        else{
            dispatch({
                type: restaurantConstants.GET_RESTAURANTS_FAILURE,
                payload: res.data.error
            })
        }
    }
}

export const addRestaurant = (form) => {
    console.log(form);
    return async dispatch => {
        dispatch({
            type: restaurantConstants.ADD_RESTAURANTS_REQUEST
        })
        const res= await axios.post('/restaurant/create', form)
        console.log(res);
        if(res.status == 201){
            dispatch({
                type: restaurantConstants.ADD_RESTAURANTS_SUCCESS,
                payload:{
                    restaurant: res.data.rest
                }
            })
        }
        else{
            if(res.status == 400){
                dispatch({
                    type: restaurantConstants.ADD_RESTAURANTS_FAILURE,
                    payload: res.data.error
                })
            }
        }


    }
}