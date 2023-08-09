import { IAbout, IApp, IUserStore, IAnswers, AnswersType, IWeeks, IStandings, ITools, IEditor } from '.'

export interface IStore {
  app: IApp
  about: IAbout
  standings: IStandings
  user: IUserStore
  answers: IAnswers
  results: AnswersType
  weeks: IWeeks
  compare: IAnswers
  editor: IEditor
  router: any
  tools: ITools
}
