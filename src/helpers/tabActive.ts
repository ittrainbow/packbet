export const setTabActive = (tab: number) => {
  localStorage.setItem('contestTabActive', tab.toString())
}

export const getTabActive = () => {
  return localStorage.getItem('contestTabActive')
}
