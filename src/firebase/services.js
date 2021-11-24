import {db} from './config'
import {collection, deleteDoc,  addDoc,deleteField, serverTimestamp, doc, updateDoc, getDoc} from 'firebase/firestore'

export const addDocument = async (coll, data)=> {
    return await addDoc(collection(db, coll), {
        ...data,
        createAt: serverTimestamp()
    })
}

export const findAndUpdate = async (coll, id, dataUpdate)=> {
    const Doc = doc(db, coll, id)
    const getValue = await getDoc(Doc)
    const {members} = getValue.data()
    await updateDoc(Doc, {
        members: [...members, ...dataUpdate]
    })
}

export const getdata = async (coll, id)=> {
    const document = doc(db, coll, id)
    const value = await getDoc(document)
    const data = await value.data()
    return data
}

export const deteteData = async (coll, id)=> {
    const document = doc(db, coll, id)
    await deleteDoc(document)
}