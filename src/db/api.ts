import {
  setDoc,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  collection,
  QuerySnapshot,
  DocumentData,
  updateDoc
} from 'firebase/firestore'

import { db } from './firebase'
import { objectCompose } from '../helpers'
import { AnswersType } from '../types'

export const getDBDocument = async (collection: string, document: string | number) => {
  try {
    const response = await getDoc(doc(db, collection, document.toString()))
    return response.data()
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
  }
}

export const writeDBDocument = async (collection: string, document: string | number, data: any) => {
  try {
    await setDoc(doc(db, collection, document.toString()), data)
    return
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
  }
}

export const updateDBDocument = async (
  collection: string,
  document: string | number,
  selectedWeek: number,
  data: any
) => {
  try {
    const emptyData = !Object.keys(data).length
    console.log(101, emptyData)
    const updateData = {} as AnswersType
    updateData[selectedWeek] = data[document][selectedWeek]
    if (emptyData) await updateDoc(doc(db, collection, document.toString()), updateData)
    else await deleteDoc(doc(db, collection, document.toString()))
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
  }
}

export const deleteDBDocument = async (collection: string, document: string | number) => {
  try {
    console.log(2)
    await deleteDoc(doc(db, collection, document.toString()))
    return
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
  }
}

export const getDBCollection = async (link: string) => {
  try {
    const response: QuerySnapshot<DocumentData> = await getDocs(collection(db, link))
    return objectCompose(response)
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
  }
}
