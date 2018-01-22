
const isMobile = () => {
    if((window.innerWidth - 500) < 0)
      return true;
    return false;
  }

const initialState = {openSideNav: !isMobile(), openProfileMenu: false, isMobile: isMobile()}


export function toggler(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_SIDE_NAV":
      return {
        openSideNav: !state.openSideNav,
        openProfileMenu: state.openProfileMenu,
        isMobile: state.isMobile
      };
    case "TOGGLE_PROFILE_MENU":
      return {
        openSideNav: state.openSideNav,
        openProfileMenu: !state.openProfileMenu,
        isMobile: state.isMobile
      };
    case "CLOSE_PROFILE_MENU":
      return {
        openSideNav: state.openSideNav,
        openProfileMenu: false,
        isMobile: state.isMobile
      };
    case "CLOSE_SIDE_NAV":
      return {
        openSideNav: false,
        openProfileMenu: false,
        isMobile: state.isMobile
      }; 
    default:
      return state
  }
}