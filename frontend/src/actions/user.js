import { userConstants } from './constants';
import axios from '../helpers/axios';

export const signup = (user) => {
    
    return async dispatch => {
        
        let res={};
            dispatch({
                type: userConstants.SIGNUP_REQUEST
            })
            try{
                res= await axios.post('/admin/signup', {
                    ...user
                })

                
                if(res.status == 201){
                    const { message }= res.data;
                    dispatch({
                        type: userConstants.SIGNUP_SUCCESS,
                        payload:{
                            message
                        }
                    })
                }

            }
            catch(error){
                if(error.response.status == 400){
                    
                    dispatch({
                        type: userConstants.SIGNUP_FAILURE,
                        payload:{
                            error: error.response.data.error
                        }
                    })
                }
                
               
            }
            
                
    

            
            
  
            

        }
        
        
            
                
        
    }
