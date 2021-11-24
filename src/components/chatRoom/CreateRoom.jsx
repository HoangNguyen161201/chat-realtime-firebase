import {Button, useToast, ModalOverlay, Modal, ModalContent, Input, Textarea, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, ModalFooter, HStack, useDisclosure} from '@chakra-ui/react'
import { useState, useContext } from 'react'
import { ThemeContext } from '../../context'
import {MdPostAdd} from 'react-icons/md'
import { addDocument } from '../../firebase/services'

export default function CreateRoom() {
    const toast = useToast()
    
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [name, setName] = useState('')
    const [discription, setDiscription] = useState('')
    
    const {UserReducer: {user}} = useContext(ThemeContext)
    const createRoom = async ()=> {
        const data = {
            name,
            discription,
            members: [user.data.uid]
        }

        await addDocument('rooms', data)
        onClose()

        // alert thong  bao
        toast({
            position: "top-right",
            description: 'create room success',
            status: 'success',
            duration: 5000,
            isClosable: true,
            
        })
    }

    return (
        <>
            <Button onClick={onOpen} mt={5} iconSpacing="55px" rightIcon={<MdPostAdd />} isFullWidth>Add new room</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>
                            Create new room
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl isRequired>
                                <FormLabel fontWeight="400">Rome name</FormLabel>
                                <Input onChange={(e)=> {
                                    setName(e.target.value)
                                }} placeholder="Enter room name" />
                            </FormControl>
                            <FormControl mt={5} >
                                <FormLabel fontWeight="400">Describe</FormLabel>
                                <Textarea onChange={(e)=> {
                                    setDiscription(e.target.value)
                                }}/>
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <HStack>
                                <Button onClick={createRoom} variant="ghost">Create</Button>
                                <Button onClick={onClose} colorScheme="blue">Cancel</Button>
                            </HStack>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </>
    )
}
