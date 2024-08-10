import { z } from 'zod'

export const AboutSchema = z.object({
  ru: z.record(z.string(), z.string()),
  ua: z.record(z.string(), z.string())
})
export type About = z.infer<typeof AboutSchema>

export const ResultsSchema = z.record(z.string(), z.number())
export type Results = z.infer<typeof ResultsSchema>

export const AnswersSchema = z.record(z.string(), z.record(z.string(), z.number()))
export type Answers = z.infer<typeof AnswersSchema>

export const AnswersStoreSchema = z.record(z.string(), AnswersSchema)
export type AnswersStore = z.infer<typeof AnswersStoreSchema>

export const AppSchema = z.object({
  season: z.number(),
  mobile: z.boolean(),
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
  duration: z.number()
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

export const UserStandingsSchema = z.object({
  ansCorrect: z.number(),
  ansTotal: z.number(),
  resultsTotal: z.number(),
  name: z.string(),
  position: z.number().or(z.string()),
  correct: z.number(),
  uid: z.string(),
  faults: z.number()
})
export type UserStandings = z.infer<typeof UserStandingsSchema>

export const UpdateStandingsSchema = z.record(z.string(), UserStandingsSchema)
export type UpdateStandings = z.infer<typeof UpdateStandingsSchema>

export const FetchedStandingsSchema = z.object({
  season: z.record(z.string(), UserStandingsSchema),
  week: z.record(z.string(), UserStandingsSchema)
})
export type FetchedStandings = z.infer<typeof FetchedStandingsSchema>

export const StandingsSchema = z.object({
  week: z.array(UserStandingsSchema),
  season: z.array(UserStandingsSchema)
})
export type Standings = z.infer<typeof StandingsSchema>

export const ToolsSchema = z.object({
  showTools: z.boolean(),
  showBuddies: z.boolean(),
  showOneWeek: z.boolean(),
  standingsSearch: z.string()
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

export const PlayersSchema = z.record(z.string(), UserSchema)
export type Players = z.infer<typeof PlayersSchema>

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
  user: ExtendedUserSchema,
  answers: AnswersStoreSchema,
  results: AnswersSchema,
  weeks: WeeksSchema,
  compare: AnswersStoreSchema,
  editor: EditorSchema,
  tools: ToolsSchema
})
export type Store = z.infer<typeof StoreSchema>
