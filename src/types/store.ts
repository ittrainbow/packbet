import { ReduxRouterType, IAbout, IUserStandings } from ".";

export interface IStore {
  router: ReduxRouterType;
  app: {
    mobile: boolean;
    loading: boolean;
    editor: boolean;
    error: string | null;
  };
  about: IAbout;
  standings: IUserStandings[]
}
