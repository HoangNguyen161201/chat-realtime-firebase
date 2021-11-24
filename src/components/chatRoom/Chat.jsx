import Header from './Header'
import AddUser from './AddUser'
import UserGroup from './UserGroup'
import SendMessage from './SendMessage'
import MessageAdmin from './MessageAdmin'
import MessageMember from './MessageMember'

import { HStack, Alert, AlertIcon, AlertDescription, Box } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppProvider'
import { ThemeContext } from '../../context'
import InforRoom from './InforRoom'
import { getdata, deteteData } from '../../firebase/services'

export default function Chat() {

    const { roomSelect: { room, setSelectRoom }, dataUsers, dataMessage, data} = useContext(AppContext)
    const {UserReducer: {user}} = useContext(ThemeContext)
    useEffect(()=> {
        const chat = document.getElementById('chat')
        chat.scrollTop = chat.scrollHeight
    })

    const [nameRoom, setNameRom]= useState(null)

    useEffect(()=> {
        if(room){
            const r = getdata('rooms', room)
            r.then(e=> {
                setNameRom(e.name)
            })
        }
    }, [room])

    useEffect(()=>{
        if(room){
            const value = getdata('rooms', room)
            value.then(e=> {
                if(!e) {
                    setSelectRoom('')
                }
            })
        }
    }, [data])



    const deleteRoom = async ()=> {
        await deteteData('rooms', room)
        setSelectRoom('')
        if(dataMessage.length > 0){
            dataMessage.map(value=> {
                deteteData('messages', value.id)
            })
        }

    }
 
    return (
        <>
            {/* this is header */}
            <Header />

            {
                room && nameRoom && <InforRoom deleteRoom={deleteRoom} nameRoom={nameRoom}/>
            }

            {/* chat message with people */}
            <Box h={room ? "calc(100vh - 210px)": "calc(100vh - 140px)"} id='chat' overflowX="auto" p="20px">
                {
                    !room && (
                        <Alert>
                            <AlertIcon />
                            <AlertDescription>
                                Select room to chat
                            </AlertDescription>
                        </Alert>
                    )
                }

                {/* this is tin nhan cua admin */}
                {
                    room && 
                    dataMessage && dataMessage.map(message=> {
                        return message.idUser === user.data.uid ? <MessageAdmin message={message} key={message.id}/>: 
                        <MessageMember key={message.id} message={message}/>
                    }
                    )
                }

                {/* this is tin nhan cua member */}
                {/* <MessageMember /> */}
            </Box>

            <HStack spacing="5" px="20px">
                {/* send message */}
                <SendMessage />

                {/* Add new user */}
                <AddUser />

                {/* members in group */}

                {
                    room && (
                        <UserGroup users={dataUsers ? dataUsers: []} />
                    )
                }
            </HStack>
        </>
    )
}
