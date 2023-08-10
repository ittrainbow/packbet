export const getLocale = () => {
  return localStorage.getItem('packContestLocale') || 'ru'
}
