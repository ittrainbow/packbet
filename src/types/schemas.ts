import { z } from 'zod'

export const AboutSchema = z.object({
  ru: z.record(z.string(), z.string()),
  ua: z.record(z.string(), z.string())
})
export type About = z.infer<typeof AboutSchema>

export const ResultsSchema = z.record(z.string(), z.number())
export type ResultsUpload = z.infer<typeof ResultsSchema>

export const ResultsStoreSchema = z.record(z.string(), ResultsSchema)
export type ResultsStore = z.infer<typeof ResultsStoreSchema>

export const AnswersSchema = ResultsStoreSchema
export type Answers = z.infer<typeof AnswersSchema>

export const AnswersStoreSchema = z.record(z.string(), ResultsStoreSchema)
export type AnswersStore = z.infer<typeof AnswersStoreSchema>

export const AppSchema = z.object({
  season: z.number(),
  lastSeasonLastWeek: z.number(),
  loading: z.boolean(),
  editor: z.boolean(),
  error: z.string(),
  currentWeek: z.number(),
  emptyEditor: z.boolean(),
  isItYou: z.boolean(),
  nextWeek: z.number(),
  otherUserName: z.string(),
  otherUserUID: z.string(),
  selectedWeek: z.number(),
  tabActive: z.number(),
  emailReg: z.boolean(),
  duration: z.number(),
  durationShort: z.number(),
  fading: z.boolean()
})
export type App = z.infer<typeof AppSchema>

export const RouterSchema = z.object({
  location: z.object({
    pathname: z.string(),
    search: z.string(),
    hash: z.string(),
    state: z.string().nullable(),
    key: z.string()
  }),
  action: z.enum(['PUSH', 'PULL'])
})
export type Router = z.infer<typeof RouterSchema>

export const OldStandingsSchema = z.object({
  ansCorrect: z.number(),
  ansTotal: z.number(),
  resultsTotal: z.number().optional(),
  name: z.string(),
  position: z.number().or(z.string()),
  percentage: z.number()
})
export type OldStandings = z.infer<typeof OldStandingsSchema>

export const UserStandingsSchema = z.object({
  ansCorrect: z.number(),
  ansTotal: z.number(),
  resultsTotal: z.number().optional(),
  name: z.string(),
  position: z.number().or(z.string()),
  correct: z.number(),
  uid: z.string().optional(),
  faults: z.number()
})
export type UserStandings = z.infer<typeof UserStandingsSchema>

export const UpdateStandingsSchema = z.record(z.string(), UserStandingsSchema)
export type UpdateStandings = z.infer<typeof UpdateStandingsSchema>

export const FetchedStandingsSchema = z.object({
  season2022: z.record(z.string(), OldStandingsSchema),
  season2023: z.record(z.string(), UserStandingsSchema),
  week2023: z.record(z.string(), UserStandingsSchema)
})
export type FetchedStandings = z.infer<typeof FetchedStandingsSchema>

export const StandingsSchema = z.object({
  season2022: z.array(OldStandingsSchema),
  season2023: z.array(UserStandingsSchema),
  week2023: z.array(UserStandingsSchema),
  season2024: z.array(UserStandingsSchema),
  week2024: z.array(UserStandingsSchema)
})
export type Standings = z.infer<typeof StandingsSchema>

export const ToolsSchema = z.object({
  showTools: z.boolean(),
  showBuddies: z.boolean(),
  showOneWeek: z.boolean(),
  standingsSearch: z.string(),
  seasonSelected: z.number()
})
export type Tools = z.infer<typeof ToolsSchema>

export const UserSchema = z.object({
  admin: z.boolean(),
  locale: z.enum(['ru', 'ua']),
  name: z.string(),
  adminAsPlayer: z.boolean().optional(),
  buddies: z.array(z.string())
})
export type User = z.infer<typeof UserSchema>

export const ExtendedUserSchema = UserSchema.extend({
  uid: z.string()
})
export type ExtendedUser = z.infer<typeof ExtendedUserSchema>

export const UsersSchema = z.record(z.string(), UserSchema)
export type Users = z.infer<typeof UsersSchema>

export const QuestionSchema = z.object({
  ru: z.string(),
  ua: z.string(),
  total: z.string(),
  id: z.number().optional().nullable()
})
export type Question = z.infer<typeof QuestionSchema>

export const QuestionsSchema = z.record(z.string(), QuestionSchema)
export type Questions = z.infer<typeof QuestionsSchema>

export const WeekSchema = z.object({
  active: z.boolean(),
  deadline: z.number(),
  name: z.string(),
  questions: QuestionsSchema
})
export type Week = z.infer<typeof WeekSchema>

export const WeeksSchema = z.record(z.string(), WeekSchema)
export type Weeks = z.infer<typeof WeeksSchema>

export const EditorSchema = WeekSchema.extend({
  questionInWork: QuestionSchema,
  questionCompare: QuestionSchema
})
export type Editor = z.infer<typeof EditorSchema>

export const StoreSchema = z.object({
  router: RouterSchema,
  app: AppSchema,
  about: AboutSchema,
  standings: StandingsSchema,
  oldStandings: OldStandingsSchema,
  user: ExtendedUserSchema,
  answers: AnswersStoreSchema,
  results: AnswersSchema,
  weeks: WeeksSchema,
  compare: AnswersStoreSchema,
  editor: EditorSchema,
  tools: ToolsSchema
})
export type Store = z.infer<typeof StoreSchema>

export type Action<T> = {
  type: string
  payload: T
}
