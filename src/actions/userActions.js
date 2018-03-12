import { authenticateUser, signOut, fetchUser } from '../Services/firebaseAuthService'
import { getMyEvents } from '../Services/firebaseDBService'
import {hashHistory} from 'react-router'

import {store} from '../store'

export const userActions = {
    login,
    logout,
    errorNuller,
    getUser
};

function login(email, password) {
    return dispatch => {
        dispatch(request());

        authenticateUser(email, password, (error, result) => {
            if(error) {
                dispatch(failure(error));
            }
            else {
                dispatch(success(result));
                hashHistory.push('/dashboard')
                console.log('redirect to dashboard');
                }
        })
    };

    function request() { return { type: "REQUEST_LOGIN" } }
    function failure(error, username, password) { return { type: "FAILURE_LOGIN", error, username, password } }
    function success(result) { return { type: "SUCCESS_LOGIN", result } }
}

function logout() {
    signOut();
    localStorage.clear();
    hashHistory.push('/auth')
    return { type: "LOGOUT" };
}
                                        
function errorNuller() {
    return dispatch => {
        dispatch(nuller())
    }

    function nuller() { return {type: "ERROR_NULLER"}}
}

function getUser() {
    var arr =[];
    var obj = {};
    return dispatch => {
        fetchUser(user => {
            if(user) {
                dispatch(successUser(user))
                getMyEvents(user.uid, (key, val) => {
                    if(val == null) {
                        dispatch(success('NO_EVENTS'))
                        return
                    }
                    val['id'] = key;
                    obj[key] = val;
                    dispatch(success(obj))
                })
            }
        })
    }
    function successUser(result) { return { type: "SUCCESS_LOGIN", result } }
    function success(result) { return { type: "SUCCESS_FETCH", result } }
}