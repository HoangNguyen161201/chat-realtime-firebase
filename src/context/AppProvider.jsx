import {ThemeContext} from './index'
import {createContext, useContext, useMemo, useState} from 'react'
import useFirestore from '../hooks/useFirrestore'

export const AppContext = createContext()
 
export default function AppProvider({children}) {
    const {UserReducer} = useContext(ThemeContext)
    const [room, setSelectRoom] = useState('')

    const idUser = UserReducer.user.data ? UserReducer.user.data.uid : ''

    const condition = useMemo(()=> ({
        field: 'members',
        operators: 'array-contains',
        user: idUser
    }), [idUser])

    const data = useFirestore('rooms', condition)

    
    // get all users in this room

    const conditionUser = useMemo(()=> {
        const mainRoom = data.find(value => {
            return value.id === room
        })
        if (!mainRoom) return null

        return {
            field: 'uid',
            operators: 'in',
            user: mainRoom.members
        }
    }, [room, data])


    const dataUsers = useFirestore('users', conditionUser)

    // get message

    const conditionMessage = useMemo(()=> {
        const query = {
            field: 'idRoom',
            operators: '==',
            user: ''
        }
        if (!room) return {
            ...query
        }
        return {
            ...query,
            user: room
        }
    }, [room])

    const dataMessage = useFirestore('messages', conditionMessage)

    const getAllUser = useFirestore('users')

    // get users not in rooms

    

    const conditionNot = useMemo(()=> {
        if (dataUsers.length > 0){
            const idUsers = []
            dataUsers.map(e=> {
                idUsers.push(e.uid)
            })
    
            console.log('ddfd',dataUsers)
    
            return {
                field: 'uid',
                operators: 'not-in',
                user: idUsers
            }
        }
    }, [room, data, dataUsers])

    const userNotInRoom = useFirestore('users', conditionNot)


    const values = {
        data,
        roomSelect: {
            room,
            setSelectRoom
        },
        dataUsers,
        dataMessage,
        getAllUser,
        userNotInRoom
       
    }

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}
