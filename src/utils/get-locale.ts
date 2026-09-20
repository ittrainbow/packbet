import { LocaleCode } from '../locale'

const LOCALES: LocaleCode[] = ['ru', 'ua', 'by']

export const getLocale = (): LocaleCode => {
  const stored = localStorage.getItem('packContestLocale')
  if (stored === 'be') return 'by'
  return LOCALES.includes(stored as LocaleCode) ? (stored as LocaleCode) : 'ru'
}
