import { About, Answers, AnswersStore, App, Editor, Tools, UserStandings, UserStore, Weeks } from '.'

interface Router {
  location: {
    pathname: string
    search: string
    hash: string
    state: string | null
    key: string
  }
  action: 'PUSH' | 'PULL'
}

interface Standings {
  [key: string]: UserStandings[]
}

export interface Store {
  app: App
  about: About
  standings: Standings
  user: UserStore
  answers: AnswersStore
  results: Answers
  weeks: Weeks
  compare: AnswersStore
  editor: Editor
  router: Router
  tools: Tools
}
