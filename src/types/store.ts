import { IAbout, IUserStandings, IApp, IUser, IAnswers, AnswersType, IWeeks } from ".";

export interface IStore {
  app: IApp
  about: IAbout
  standings: IUserStandings[]
  user: IUser
  answers: IAnswers
  results: AnswersType
  weeks: IWeeks
  compare: IAnswers
}
