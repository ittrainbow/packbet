export const setTabActive = (tab) => {
  localStorage.setItem('contestTabActive', tab)
}

export const getTabActive = (tab) => {
  return localStorage.getItem('contestTabActive')
}