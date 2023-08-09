import { IAbout, IUserStandings, IApp, IUserStore, IAnswers, AnswersType, IWeeks, WeekType, IStandings, ITools } from '.'

export interface IStore {
  app: IApp
  about: IAbout
  standings: IStandings
  user: IUserStore
  answers: IAnswers
  results: AnswersType
  weeks: IWeeks
  compare: IAnswers
  editor: WeekType
  router: any
  tools: ITools
}
