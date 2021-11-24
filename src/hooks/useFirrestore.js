import {useEffect, useState} from 'react'
import { db } from '../firebase/config'
import { collection, query, onSnapshot, where, orderBy} from '@firebase/firestore'

const useFirestore = (coll, condition)=> {
    const [documents, setDocuments] = useState([])
    useEffect(()=> {
        var documentSnapshot = collection(db, coll)
        if(condition) {
            if (condition.field === 'idRoom'){
                documentSnapshot = query(documentSnapshot,  orderBy('createAt'),  where(condition.field, condition.operators , condition.user))
            }
            else{
                documentSnapshot = query(documentSnapshot,  where(condition.field, condition.operators , condition.user))
            }
      
        }

        const snap = onSnapshot(documentSnapshot, snapshot => {
     
                const data = snapshot.docs.map( doc => ({
                    ...doc.data(),
                    id: doc.id
                }))
                
                setDocuments(data)
        })

        return snap
    }, [coll, condition])

    return documents
}


export default useFirestore 