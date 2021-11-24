import { Button, ModalContent, ModalBody, useToast, useBoolean, useDisclosure, useColorModeValue, Modal, ModalFooter, ModalOverlay, ModalCloseButton, ModalHeader, HStack } from '@chakra-ui/react'
import { useContext, useMemo, useState } from 'react'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { AppContext } from '../../context/AppProvider'
import Select from 'react-select'
import { findAndUpdate } from '../../firebase/services'

export default function AddUser() {
    const [loading, setLoading] = useBoolean(false)
    const toast = useToast()

    const colorOptions = useColorModeValue(null, 'black')
    const variant = useColorModeValue('ghost', 'outline')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const colorScheme = useColorModeValue(null, 'white')

    const { roomSelect: { room } } = useContext(AppContext)

    const [valueSelect, setValue] = useState(null)

    const {userNotInRoom, roomSelect} = useContext(AppContext)
    
    const options = useMemo(()=> {
        return userNotInRoom.map(user=> ({
            value: user.uid,
            label: user.email
        }))
    }, [userNotInRoom])

    const addUsers =async ()=> {
        setLoading.toggle()

        
        const data = []
        valueSelect.map(value=> {
            data.push(value.value)
        })
        
        await findAndUpdate('rooms', roomSelect.room, data)

        toast({
            description: 'Add users success',
            status: "success",
            duration: "9000",
            isClosable: true,
            position: "top-right"
        })

        setValue(null)
        onClose()
        setLoading.toggle()
    }

    return (
        <>
            {
                room && (
                    <>
                        <Button size='lg' onClick={onOpen} fontWeight="sm" variant={variant} colorScheme={colorScheme} fontSize="md" leftIcon={<AiOutlineUserAdd />}>Add</Button>
                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay>
                                <ModalContent>
                                    <ModalHeader>Add new User</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <Select styles={{
                                            option: (css, state)=> ({
                                                ...css,
                                                color: colorOptions
                                            })
                                        }} isLoading={loading} placeholder="Select other users" isMulti value={valueSelect} onChange={(value)=>{
                                            setValue(value)
                                        }} options={options}/>
                                    </ModalBody>
                                    <ModalFooter>
                                        <HStack spacing={4}>
                                            <Button isLoading={loading} variant="ghost" onClick={addUsers}>Add</Button>
                                            <Button onClick={onClose} colorScheme="blue">Cancel</Button>
                                        </HStack>
                                    </ModalFooter>
                                </ModalContent>
                            </ModalOverlay>

                        </Modal>
                    </>
                )
            }
        </>
    )
}
