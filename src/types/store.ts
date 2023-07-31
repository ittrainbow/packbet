import { ReduxRouterType, IAbout, IUserStandings, IApp, IUser } from ".";

export interface IStore {
  router: ReduxRouterType
  app: IApp
  about: IAbout
  standings: IUserStandings[]
  user: IUser
}
