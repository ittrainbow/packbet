import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  QuerySnapshot,
  setDoc,
  updateDoc
} from 'firebase/firestore'

import {
  About,
  AboutSchema,
  Answers,
  AnswersSchema,
  AnswersStore,
  AnswersStoreSchema,
  FetchedStandingsSchema,
  ResultsSchema,
  ResultsStoreSchema,
  UpdateStandingsSchema,
  Users,
  UserSchema,
  UsersSchema,
  WeekSchema,
  WeeksSchema
} from '../types'
import { db } from './firebase'

export const getDBDocument = async (collection: string, document: string | number) => {
  const response = await getDoc(doc(db, collection, document.toString()))
  const schema = collection.includes('users')
    ? UserSchema
    : collection.includes('answers')
    ? AnswersSchema
    : collection.includes('results')
    ? ResultsSchema
    : undefined

  const parsed = schema?.parse(response.data())
  return parsed
}

export const writeDBDocument = async (collection: string, document: string | number, data: any) => {
  console.log(100, data)
  const schema = collection.includes('users')
    ? UserSchema
    : collection.includes('answers')
    ? AnswersSchema
    : collection.includes('results')
    ? ResultsSchema
    : collection.includes('weeks')
    ? WeekSchema
    : collection.includes('standings')
    ? UpdateStandingsSchema
    : undefined

  schema?.parse(data)
  console.log(101)

  await setDoc(doc(db, collection, document.toString()), data)
}

export const updateDBDocument = async (
  collection: string,
  document: string | number,
  selectedWeek: number,
  data: any
) => {
  const schema = collection.includes('answers') ? AnswersSchema : undefined
  schema?.parse(data)

  const emptyData = !Object.keys(data).length
  const updateData = {} as Answers
  updateData[selectedWeek] = data[document][selectedWeek]

  if (emptyData) {
    await updateDoc(doc(db, collection, document.toString()), updateData)
    return
  }
  await deleteDoc(doc(db, collection, document.toString()))
}

export const deleteDBDocument = async (collection: string, document: string) => {
  await deleteDoc(doc(db, collection, document))
}

export const getDBCollection = async (link: string) => {
  const response: QuerySnapshot<DocumentData> = await getDocs(collection(db, link))

  const obj: About | Users | AnswersStore = {}
  response.forEach((el) => {
    obj[el.id] = el.data()
  })

  const schema = link.includes('about')
    ? AboutSchema
    : link.includes('weeks')
    ? WeeksSchema
    : link.includes('results')
    ? ResultsStoreSchema
    : link.includes('answers')
    ? AnswersStoreSchema
    : link.includes('standings')
    ? FetchedStandingsSchema
    : link.includes('users')
    ? UsersSchema
    : undefined
  const parsed = schema?.parse(obj)

  return parsed
}
