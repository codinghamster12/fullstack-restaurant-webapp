import { restaurantConstants } from "../actions/constants"

const initState = {
    restaurants: [],
    restaurantsByPrice: {},
    error: null,
    loading: false,
    restaurant:{
        name: '',
        location:'',
        cusine: '',
        restaurantPictures: [],
        costForTwo: '',
        establishment: '',
        rating: '',
        restaurantDescription: ''

    }
}



export default(state= initState, action) => {
    switch(action.type){
        case (restaurantConstants.GET_RESTAURANTS_REQUEST):
            state={
                ...state,
                loading: true
            }
            break;
        case (restaurantConstants.GET_RESTAURANTS_SUCCESS):
            state={
                ...state,
                restaurants: action.payload.restaurants,
                restaurantsByPrice: action.payload.restaurantsByPrice,
                loading: false
            }
            break;
        case(restaurantConstants.GET_RESTAURANTS_FAILURE):
            state={
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
        case(restaurantConstants.ADD_RESTAURANTS_REQUEST):
            state={
                ...state,
                loading: true
            }
            break;
        case(restaurantConstants.ADD_RESTAURANTS_SUCCESS):
            state={
                ...state,
                restaurants: [
                    ...state.restaurants,
                    action.payload.restaurant
                ],

                loading: true
            }
            break;

        case(restaurantConstants.ADD_RESTAURANTS_FAILURE):
            state={
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
        


    }
    return state;

}
