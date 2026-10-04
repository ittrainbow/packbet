import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  QuerySnapshot,
  setDoc
} from 'firebase/firestore'

import {
  About,
  AboutSchema,
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
} from '@/types'
import { db } from './firebase'

export async function getDBDocument(collection: string, document: string | number) {
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

export async function writeDBDocument(collection: string, document: string | number, data: any) {
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

  await setDoc(doc(db, collection, document.toString()), data)
}

export async function deleteDBDocument(collection: string, document: string) {
  await deleteDoc(doc(db, collection, document))
}

export async function existsDBDocument(collection: string, document: string | number) {
  const response = await getDoc(doc(db, collection, document.toString()))
  return response.exists()
}

export async function getDBCollection(link: string) {
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
