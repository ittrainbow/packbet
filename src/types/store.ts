import { IPlayers, IAbout, IUserStandings, IApp, IUser } from ".";

export interface IStore {
  app: IApp
  about: IAbout
  standings: IUserStandings[]
  user: IUser
  players: IPlayers
}
