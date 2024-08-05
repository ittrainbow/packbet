export const getLocale = () => {
  return localStorage.getItem('packContestLocale') === 'ua' ? 'ua' : 'ru'
}
