import { authenticateUser, signOut, fetchUser } from '../Services/firebaseAuthService'
import { getMyEvents, getUserDetails } from '../Services/firebaseDBService'
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
                getUserDetails(result.uid, (user) => {
                    dispatch(success(user));
                    debugger
                    hashHistory.push('/dashboard')
                    console.log('USER');
                    console.log(user);
                })
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
            dispatch(sessionCheck(false))
            if(user) {
                dispatch(successUser(user))
                // user is not logged in
                console.log("User's session exists. Redirecting to /dashboard")
                hashHistory.push('/dashboard')
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
            else {
                // user is not logged in
                console.log('User is not logged in. Redirecting to /auth')
                hashHistory.push('/auth')
            }
        })
    }
    function successUser(result) { return { type: "SUCCESS_LOGIN", result } }
    function success(result) { return { type: "SUCCESS_FETCH", result } }
    function sessionCheck(result) { return { type: "SESSION_CHECK", result } }
}