
import { useContext, useEffect } from 'react'
import { ThemeContext } from '../../context/index'
import { Flex, Box, Center, useBoolean } from '@chakra-ui/react'
import ReactLoading from 'react-loading'
import HelMet from 'react-helmet'
import SideBar from './Sidebar'
import Chat from './Chat'

export default function ChatRoom() {
    const [isLoading, setLoading] = useBoolean(true)
    const { UserReducer: { user } } = useContext(ThemeContext)

    useEffect(()=> {
        const r = setTimeout(() => {
            if(user.success){
                setLoading.toggle()
            }
        }, 3000);

        return ()=> {
            clearTimeout(r)
        }
    }, [user])

    return (
        <>
            <HelMet>
                <title>chat room</title>
            </HelMet>
         
            
            {
                isLoading ?
                    <Center h="100vh">
                        <ReactLoading type='bubbles' color='#65a9ff' height={150} width={100} />
                    </Center> :

                    <Flex w='100%' h="100vh">
                        <Box w='250px' px="5" borderRightStyle="solid" borderRight="1px solid" borderRightColor="gray.300" >
                            <SideBar />
                        </Box>

                        <Box flex='1' >
                            <Chat />
                        </Box>
                    </Flex>
            }

        </>
    )
}
