import { IAbout, IUserStandings, IApp, IUserStore, IAnswers, AnswersType, IWeeks, WeekType } from '.'

export interface IStore {
  app: IApp
  about: IAbout
  standings: IUserStandings[]
  user: IUserStore
  answers: IAnswers
  results: AnswersType
  weeks: IWeeks
  compare: IAnswers
  editor: WeekType
}
