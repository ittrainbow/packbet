import { IAbout, IUserStandings, IApp, IUserStore, IAnswers, AnswersType, IWeeks, WeekType } from '.'

export interface IStore {
  app: IApp
  about: IAbout
  standings: { [key: string]: IUserStandings[] }
  user: IUserStore
  answers: IAnswers
  results: AnswersType
  weeks: IWeeks
  compare: IAnswers
  editor: WeekType
}
