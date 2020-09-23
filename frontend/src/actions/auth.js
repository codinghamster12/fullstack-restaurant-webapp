import { authConstants } from './constants';
import axios from '../helpers/axios';
export const login = (user) => {
    console.log(user);

    return async (dispatch) => {

        dispatch({
            type:authConstants.LOGIN_REQUEST
        })
        try{
            const res= await axios.post(`/admin/signin`, {
                ...user
            })
            if(res.status == 200){
                const { token , user } = res.data;
                localStorage.setItem('token',token);
                localStorage.setItem('user', JSON.stringify(user));
    
                dispatch({
                    type:authConstants.LOGIN_SUCCESS,
                    payload:{
                        token, user
                    }
                })
    
            }

        }
        catch(error){
            if(error.response.status == 400){
                    
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload:{
                        error: error.response.data.error
                    }
                })
            }
            
        }
        
        
        
        
        
       
    }
}


export const isUserLoggedIn = () => {
    return async (dispatch) => {
        const token= localStorage.getItem('token');
        if(token){
            const user= JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload:{
                    token, user
                }
            })
        }
        

    }
}

export const logout = () => {
    return async (dispatch) => {
        dispatch({
            type: authConstants.LOGOUT_REQUEST
        })
        const res = await axios.post('/admin/signout');
        console.log(res);

        if(res.status == 200){
            localStorage.clear();
            dispatch({
                type: authConstants.LOGOUT_SUCCESS,
                
            })
        }
        else{
            if(res.status == 400){
                dispatch({
                    type: authConstants.LOGOUT_FAILURE,
                    error: res.data.error
                })
            }
        }
    }
}

