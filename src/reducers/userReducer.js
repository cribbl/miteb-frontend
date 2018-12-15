import {getUser} from '../Services/firebaseAuthService'

const initialState = {sessionCheck: true}

export function authentication(state = initialState, action) {
  switch (action.type) {
    case "SESSION_CHECK":
        return Object.assign({}, state, {
        sessionCheck: action.result,
      })
    case "REQUEST_LOGIN":
      return {
        logging: true,
      };
    case "SUCCESS_LOGIN":
      return {
        loggedIn: true,
        user: action.result
      };
    case "FAILURE_LOGIN":
      return {
        error: action.error,
      };
    case "SUCCESS_FETCH":
      return Object.assign({}, state, {
        vals: action.result
      });
    case "USER_UPDATE":
      return Object.assign({}, state, {
        user: action.user
      })
    case "LOGOUT":
      return {};
    case "REQUEST_EMAIL_VERIFICATION":
      return {
        verified: false,
        verifying: true,
        user: state.user
      }
    case "SUCCESS_EMAIL_VERIFICATION":
      return {
        user: state.user,
        verified: true,
        loggedIn: true,
      }
    case "FAILURE_EMAIL_VERIFICATION":
      return Object.assign({}, state, {
        verifying: false,
        verified: false,
        error: action.error
      })
    case "REQUEST_PHONE_VERIFICATION":
      return {
        username: state.username,
        password: state.password,
        verifying: true,
        verified: false,
        showVerification: true
      }
    case "FAILURE_PHONE_VERIFICATION":
      return Object.assign({}, state, {
          verifying: false,
          error: action.error,
          verified: false,
          showVerification: true
      })
    case "SUCCESS_PHONE_VERIFICATION":
      return {}
    case "REQUEST_FORGOT_PASSWORD":
      return {
          verifying: true
      }
    case "FAILURE_FORGOT_PASSWORD":
      return {
        error: action.error
      }
    case "SUCCESS_FORGOT_PASSWORD":
      return {
        showVerification: true,
        username: action.username
      }
    case "REQUEST_NEW_PASSWORD":
      return {
        showVerification: true,
        verifying: true,
        username: state.username
      }
    case "FAILURE_NEW_PASSWORD":
      return {
        showVerification: true,
        newPasswordError: action.error,
        username: state.username
      }
    case "SUCCESS_NEW_PASSWORD":
      return { }
    case "REQUEST_SIGNUP":
      return {
        signingup: true,
      }
    case "FAILURE_SIGNUP":
      return {
        error: action.error
      }
    case "SUCCESS_SIGNUP":
      return {
        showVerification: true,
        user: action.result
      }
    case "ERROR_NULLER":
      return Object.assign({}, state, {
          error: null
      })
    case "POST_EVENT":
      return Object.assign({}, state, {
        currEvent: action.currEvent
      })
    default:
      return state
  }
}







// optimizations
// 1) Convert all REQUESTS to 1 case