import { Flex, useToast, HStack, useBoolean, Button, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogCloseButton, AlertDialogOverlay, Box, Spacer, Tooltip, Tag, CloseButton } from '@chakra-ui/react'

export default function InforRoom({ nameRoom, deleteRoom }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setLoading] = useBoolean(false)

    const toast = useToast()

    const handleDelete =async ()=> {
        setLoading.toggle()
        await deleteRoom()
        setLoading.toggle()
        toast({
            description: 'Delete room success',
            status: 'success',
            duration: '9000',
            isClosable: true,
            position: 'top-right'
        })
    }

    return (
        <Flex h='70px' px='20px' alignItems='center' borderBottom="1px solid" borderBottomColor='gray.300'>
            <Box>
                <Tag bg='teal.100' color="teal.500" size='lg'>{nameRoom}</Tag>
            </Box>
            <Spacer />
            <Box>
                <Tooltip hasArrow label='Delete room'>
                    <CloseButton onClick={onOpen} />
                </Tooltip>
            </Box>
            <AlertDialog isOpen={isOpen} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            Delete room
                        </AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            Are you sure to delete the room {nameRoom} ?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <HStack spacing={4}>
                                <Button isLoading={isLoading} colorScheme='red' onClick={handleDelete} variant="ghost">Delete</Button>
                                <Button colorScheme="blue" onClick={onClose}>Cancel</Button>
                            </HStack>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Flex>
    )
}
