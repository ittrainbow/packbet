import { setDoc, doc, getDoc, getDocs, deleteDoc, collection, QuerySnapshot, DocumentData } from 'firebase/firestore'

import { db } from './firebase'
import { objectCompose } from '../helpers'

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

export const deleteDocumentFromDB = async (collection: string, document: string | number) => {
  try {
    await deleteDoc(doc(db, collection, document.toString()))
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