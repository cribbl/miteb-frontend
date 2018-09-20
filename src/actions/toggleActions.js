export const toggleActions = {
  toggleSideNav,
  toggleProfileMenu,
  closeProfileMenu,
  closeSideNav,
  toggleToaster
}

function toggleSideNav () {
  return {
    type: 'TOGGLE_SIDE_NAV'
  }
}

function closeSideNav () {
  return {
    type: 'CLOSE_SIDE_NAV'
  }
}

function toggleProfileMenu () {
  return {
    type: 'TOGGLE_PROFILE_MENU'
  }
}

function closeProfileMenu () {
  return {
    type: 'CLOSE_PROFILE_MENU'
  }
}

function toggleToaster (msg, open) {
  return {
    type: 'TOASTER',
    message: msg,
    toastOpen: open
  }
}
