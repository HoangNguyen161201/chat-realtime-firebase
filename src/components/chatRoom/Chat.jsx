import Header from './Header'
import AddUser from './AddUser'
import UserGroup from './UserGroup'
import SendMessage from './SendMessage'
import MessageAdmin from './MessageAdmin'
import MessageMember from './MessageMember'

import { HStack, Alert, AlertIcon, AlertDescription, Box } from '@chakra-ui/react'
import { useContext, useEffect } from 'react'
import { AppContext } from '../../context/AppProvider'
import { ThemeContext } from '../../context'

export default function Chat() {

    const { roomSelect: { room }, dataUsers, dataMessage} = useContext(AppContext)
    const {UserReducer: {user}} = useContext(ThemeContext)
    useEffect(()=> {
        const chat = document.getElementById('chat')
        chat.scrollTop = chat.scrollHeight
    })

    return (
        <>
            {/* this is header */}
            <Header />

            {/* chat message with people */}
            <Box h="calc(100vh - 140px)" id='chat' overflowX="auto" p="20px">
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
