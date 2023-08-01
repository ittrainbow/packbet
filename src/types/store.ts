import { IAbout, IUserStandings, IApp, IUser, IAnswers, AnswersType } from ".";

export interface IStore {
  app: IApp
  about: IAbout
  standings: IUserStandings[]
  user: IUser
  answers: IAnswers
  results: AnswersType
}
