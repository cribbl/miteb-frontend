
const isMobile = () => {
  if ((window.innerWidth - 500) < 0) { return true }
  return false
}

const initialState = { openSideNav: !isMobile(), openProfileMenu: false, isMobile: isMobile(), filter: 'all', toastOpen: false, toastMessage: ' ' }

export function toggler (state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_SIDE_NAV':
      return Object.assign({}, state, {
        openSideNav: !state.openSideNav
      })
    case 'TOGGLE_PROFILE_MENU':
      return Object.assign({}, state, {
        openProfileMenu: !state.openProfileMenu
      })
    case 'CLOSE_PROFILE_MENU':
      return Object.assign({}, state, {
        openProfileMenu: false
      })
    case 'CLOSE_SIDE_NAV':
      return Object.assign({}, state, {
        openSideNav: false,
        openProfileMenu: false
      })
    case 'FILTER':
      return Object.assign({}, state, {
        openProfileMenu: false,
        filter: action.filter
      })
    case 'TOASTER':
      return Object.assign({}, state, {
        toastMessage: action.message,
        toastOpen: !state.toastOpen
      })
    default:
      return state
  }
}
