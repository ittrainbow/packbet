import { IPlayers, IAbout, IUserStandings, IApp, IUser, IAnswers, AnswersType } from ".";

export interface IStore {
  app: IApp
  about: IAbout
  standings: IUserStandings[]
  user: IUser
  players: IPlayers
  answers: IAnswers
  results: AnswersType
}
