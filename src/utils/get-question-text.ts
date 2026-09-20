import { LocaleCode } from '../locale'
import { Question } from '../types'

export const getQuestionText = ({ ru, ua, by, be }: Question, locale: LocaleCode) => {
  const belarusian = by || be
  return locale === 'ua' ? ua : locale === 'by' && belarusian ? belarusian : ru
}
