import { authenticateUser, signOut, fetchUser } from '../Services/firebaseAuthService'
import {hashHistory} from 'react-router'

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
                hashHistory.push('/classroom')
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
    return dispatch => {
        fetchUser(user => {
            if(user) {
                dispatch(success(user))
            }
        })
    }

    function success(result) { return { type: "SUCCESS_LOGIN", result } }
}