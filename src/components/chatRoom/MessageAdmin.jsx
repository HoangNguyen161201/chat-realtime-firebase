import {HStack, VStack, Text, useColorModeValue, Tag, Avatar} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useContext } from 'react'
import { AppContext } from '../../context/AppProvider'

import {formatDistance} from 'date-fns'

function MessageAdmin({message}) {
    
    const bgMessageAdmin = useColorModeValue('teal.100', null)
    const BoxShadowAdmin = useColorModeValue('0px 0px 10px 0px #b2f5eaab', null)
    
    const {dataUsers} = useContext(AppContext)
    
    const user = dataUsers.find(value=> {
        return value.uid === message.idUser
    })

    const time =  message.createAt ? new Date(message.createAt.seconds* 1000) : Date.now()
    
    return (
        <VStack mb={10} spacing={4} alignItems="start">
            <HStack spacing={4}>
                <Avatar size='md' src={user?.photoURL} name={user?.displayName} />
                <VStack alignItems="start">
                    <Text>{user?.displayName}</Text>
                    <Tag color="gray">{
                        formatDistance(Date.now(), time,{ addSuffix: true })
                    }</Tag>
                </VStack>

            </HStack>
            <Text boxShadow={BoxShadowAdmin} position="relative" bg={bgMessageAdmin} _before={{
                content: "''",
                w: "20px",
                h: '20px',
                position: 'absolute',
                top: -1,
                left: 3,
                bg: { bgMessageAdmin },
                transform: "rotate(45deg)"
            }} p={5} borderRadius="5px" maxWidth="600px">
                {message.message}
            </Text>
        </VStack>

    )
}

MessageAdmin.propTypes = {
    message: PropTypes.object.isRequired
}

export default MessageAdmin


