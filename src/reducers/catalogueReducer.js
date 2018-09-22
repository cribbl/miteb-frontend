const initialState = {}

export function catalogueHandler (state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_GET_COURSES_OF_STANDARD':
      return {
        fetching: true,
        currStandard: state.currStandard
      }
    case 'SUCCESS_GET_COURSES_OF_STANDARD':
      return {
        courses: action.courses,
        currStandard: state.currStandard
      }
    case 'FAILURE_GET_COURSES_OF_STANDARD':
      return {
        error: action.error,
        currStandard: state.currStandard
      }
    case 'REQUEST_GET_ALL_COURSES':
      return {
        courses: state.courses,
        currStandard: state.currStandard
      }
    case 'SUCCESS_GET_ALL_COURSES':
      return {
        courses: state.courses,
        allCourses: action.response.data.Items,
        currStandard: state.currStandard
      }
    case 'FAILURE_GET_ALL_COURSES':
      return {
        error: action.error,
        currStandard: state.currStandard
      }
    case 'SET_CURR_STANDARD':
      return {
        fetching: state.fetching,
        currStandard: action.standard
      }
    case 'SEARCH':
      return Object.assign({}, state, {
        searchQuery: action.payload
      })
    default:
      return state
  }
}
