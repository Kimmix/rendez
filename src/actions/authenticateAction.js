import {LOGIN_SUCCESS  , LOGIN_FAIL ,LOGOUT_SUCCESS} from '../constant/actionTypes'
import {DOMAIN} from '../constant/environment'
import axios from 'axios'
import { AsyncStorage } from "react-native"
import SetAlert from '../utils/setAlert'
import setAuthorizationHeader from '../utils/setAuthorizationHeader'
export function loginRequest(payload){
    return (dispatch) =>{
        console.log(payload)
        axios.post(DOMAIN + "api/user/login" , {email : payload.email , password : payload.password }).then(response=>{
            const data = response.data
            const token = data.token 
            const _id = data._id
            console.log(response.data)
            AsyncStorage.setItem('token' , token).then(result=>{
                console.log(result)
            })
            .catch(err=>{
                console.log(err)
            })
            
            setAuthorizationHeader(token)
            return dispatch({
                type : LOGIN_SUCCESS,
                payload : {token : token , _id : _id}
            })
        })
        .catch(err=>{
            console.log(err.response)
            SetAlert()
            return dispatch({
                type : LOGIN_FAIL
            })
        })
    }
}

export function loginSuccess(payload){
    setAuthorizationHeader(payload.token)
    return (dispatch) => dispatch({
        type : LOGIN_SUCCESS,
        payload : {token : payload.token , _id : payload._id , confirmationToken : payload.confirmationToken}
    })
}

export function logout(token){
    setAuthorizationHeader(token)
    return (dispatch) => dispatch({
        type : LOGOUT_SUCCESS,
    })
}