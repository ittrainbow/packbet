import {
  setDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  QuerySnapshot,
  DocumentData,
  deleteField
} from 'firebase/firestore'

import { db } from './firebase'
import { IUser, WeekDeleteType, WeekUpdateType, WeekSubmitType } from '../types'
import { objectCompare, objectCompose } from '../helpers'

export const writeNameToFirestore = async ({ uid, data }: { uid: string; data: IUser }) => {
  try {
    await setDoc(doc(db, 'users', uid), data)
    return
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
  }
}

export const getNameFromFirestore = async (uid: string) => {
  try {
    const response = await getDoc(doc(db, 'users', uid))
    return response.data()
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
  }
}

export const fetchDataFromFirestore = async (link: string) => {
  try {
    const response: QuerySnapshot<DocumentData> = await getDocs(collection(db, link))
    return objectCompose(response)
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
  }
}

export const setWeekToFirestore = async (props: WeekUpdateType) => {
  const { season, id, editorContext } = props
  await setDoc(doc(db, `weeks${season}`, id.toString()), editorContext)
}

export const deleteWeekFromFirestore = async (props: WeekDeleteType) => {
  const { season, selectedWeek } = props
  const update = { [selectedWeek]: deleteField() }

  try {
    await updateDoc(doc(db, `answers${season}`, 'results'), update)
    await deleteDoc(doc(db, `weeks${season}`, selectedWeek.toString()))
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
  }
}

export const submitWeekToFirestore = async (props: WeekSubmitType) => {
  const { data, selectedWeek, season, ansOrRes, toaster } = props
  const update = { [selectedWeek]: deleteField() }

  if (data[selectedWeek]) {
    await setDoc(doc(db, `answers${season}`, ansOrRes), data)
  } else {
    await updateDoc(doc(db, `answers${season}`, ansOrRes), update)
  }

  const response = await getDoc(doc(db, `answers${season}`, ansOrRes))
  const success = objectCompare(response.data(), data)
  toaster(success)
}