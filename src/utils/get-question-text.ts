import { LocaleCode } from '@/locale'
import { Question } from '@/types'

export function getQuestionText({ ru, ua, by, be }: Question, locale: LocaleCode) {
  const belarusian = by || be
  return locale === 'ua' ? ua : locale === 'by' && belarusian ? belarusian : ru
}
