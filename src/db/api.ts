import {
  setDoc, doc, getDoc, getDocs, updateDoc, deleteDoc, collection, QuerySnapshot,
  DocumentData, deleteField, query
} from 'firebase/firestore'

import { db } from './firebase'
import { WeekDeleteType, WeekSubmitType } from '../types'
import { objectCompare, objectCompose } from '../helpers'

export const getDocumentFromDB = async (collection: string, document: string | number) => {
  try {
    const response = await getDoc(doc(db, collection, document.toString()))
    return response.data()
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
  }
}

export const writeDocumentToDB = async (collection: string, document: string | number, data: any) => {
  try {
    await setDoc(doc(db, collection, document.toString()), data)
    return
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
  }
}

export const getCollectionFromDB = async (link: string) => {
  try {
    const response: QuerySnapshot<DocumentData> = await getDocs(collection(db, link))
    return objectCompose(response)
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
  }
}

export const deleteWeekFromDB = async (props: WeekDeleteType) => {
  const { selectedWeek } = props
  const update = { [selectedWeek]: deleteField() }

  try {
    await updateDoc(doc(db, 'answers2023', 'results'), update)
    await deleteDoc(doc(db, 'weeks2023', selectedWeek.toString()))
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
  }
}

export const submitWeekToDB = async (props: WeekSubmitType) => {
  const { data, selectedWeek, ansOrRes, toaster, adm } = props
  const update = { [selectedWeek]: deleteField() }

  if (data[selectedWeek]) {
    await setDoc(doc(db, 'answers2023', ansOrRes), data)
  } else {
    await updateDoc(doc(db, 'answers2023', ansOrRes), update)
  }

  const response = await getDoc(doc(db, 'answers2023', ansOrRes))
  const success = objectCompare(response.data(), data)
  toaster(success)
}