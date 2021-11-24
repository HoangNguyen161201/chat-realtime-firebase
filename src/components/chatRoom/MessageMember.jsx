import {useColorModeValue, VStack, HStack, Text, Avatar, Tag} from '@chakra-ui/react'
import { useContext } from 'react'
import { AppContext } from '../../context/AppProvider'

export default function MessageMember({message}) {
    const bgMessage = useColorModeValue('blue.100', null)
    const BoxShadow = useColorModeValue('0px 0px 10px 0px #bee3f8b5', null)

    const {dataUsers} = useContext(AppContext)
    
    const user = dataUsers.find(value=> {
        return value.uid === message.idUser
    })

    return (
        <VStack mb={10} spacing={4} alignItems="end">
            <HStack spacing={4}>
                <VStack alignItems="end">
                    <Text>{user?.displayName}</Text>
                    <Tag color="gray">11: 00 PM</Tag>
                </VStack>
                <Avatar size='md' src={user?.photoURL} name={user?.displayName} />


            </HStack>
            <Text boxShadow={BoxShadow} position="relative" bg={bgMessage} _before={{
                content: "''",
                w: "20px",
                h: '20px',
                position: 'absolute',
                top: -1,
                right: 3,
                bg: { bgMessage },
                transform: "rotate(45deg)"
            }} p={5} borderRadius="5px" maxWidth="600px">
                {message.message}
            </Text>
        </VStack>
    )
}
