import { doc, setDoc, getDoc, getDocs, deleteDoc, collection, updateDoc } from 'firebase/firestore'
import { QuerySnapshot, DocumentData } from 'firebase/firestore'

import { db } from './firebase'
import { AnswersType, IAbout, IAnswers, IPlayers } from '../types'

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
    await deleteDoc(doc(db, collection, document.toString()))
    return
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
  }
}

export const getDBCollection = async (link: string) => {
  try {
    const response: QuerySnapshot<DocumentData> = await getDocs(collection(db, link))
    const obj: IAbout | IPlayers | IAnswers = {}
    response.forEach((el) => {
      obj[el.id] = el.data()
    })
    return obj
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
  }
}
