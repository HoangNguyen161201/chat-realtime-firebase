import {useColorModeValue, InputGroup,Input, InputRightElement, Button} from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { ThemeContext } from '../../context'
import { AppContext } from '../../context/AppProvider'
import { addDocument } from '../../firebase/services'

export default function SendMessage() {
    const {UserReducer: {user}} = useContext(ThemeContext)
    const {roomSelect: {room: r}} = useContext(AppContext)


    const colorSend = useColorModeValue(null, 'black')
    const bg = useColorModeValue(null, 'white')

    const [message, setMessage] = useState('')

    const { roomSelect: { room } } = useContext(AppContext)

    const onsubmit = ()=> {
        if (!message) return
        const data = {
            idRoom: r,
            idUser: user.data.uid,
            message
        }
    
        // gui data
        addDocument('messages', data)
        // clean
        setMessage('')
        document.getElementById('message').value = ''
    }

    return (
        <InputGroup size='lg'>
            <Input color={colorSend} id='message' onChange={(e)=> {
                setMessage(e.target.value) 
            }} bg={bg} _placeholder={{ color: 'gray.400' }} placeholder="Send message ..." />
            <InputRightElement pr="50px">
                <Button onClick={onsubmit} isDisabled = {!room ? true: false} px='10' colorScheme="blue" boxShadow="3px 3px 10px 0px #3182ce70" size="sm">Send</Button>
            </InputRightElement>
        </InputGroup>
    )
}
