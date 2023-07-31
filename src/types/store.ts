import { ReduxRouterType, IAbout, IUserStandings, IApp } from ".";

export interface IStore {
  router: ReduxRouterType;
  app: IApp;
  about: IAbout;
  standings: IUserStandings[]
}
