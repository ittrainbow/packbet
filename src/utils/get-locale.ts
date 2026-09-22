import { LocaleCode } from '@/locale'

function isLocaleCode(value: string | null): value is LocaleCode {
  return value === 'ru' || value === 'ua' || value === 'by'
}

export function getLocale(): LocaleCode {
  const stored = localStorage.getItem('packContestLocale')
  return isLocaleCode(stored) ? stored : 'ru'
}
