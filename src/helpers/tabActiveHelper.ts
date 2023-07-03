export const setTabActive = (tab: number) => {
  localStorage.setItem('contestTabActive', tab.toString())
}
