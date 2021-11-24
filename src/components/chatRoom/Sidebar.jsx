import {
    Button,
    Box,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    VStack,
} from "@chakra-ui/react";

import Room from "./Room";
import CreateRoom from "./CreateRoom";
import { useContext as UseContext} from "react";
import { AppContext } from "../../context/AppProvider";
import Music from "./Music";

export default function sideBar() {
    const {data, roomSelect: { setSelectRoom}} = UseContext(AppContext)

    const selectRoom = (id)=> {
        setSelectRoom(id)
    }

    return (
        <>
            <Music/>
            <Accordion allowToggle mt="15px">
                <AccordionItem isFocusable borderWidth="0">
                    <AccordionButton as={Button} colorScheme="blue" _hover={{
                        bg: "blue.600"
                    }}>
                        <Box textAlign="left" flex='1'>
                            All rooms
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel p='0'>
                        <VStack mt='5'>
                            {
                                data?.map((value, key)=> (
                                    <Room key={key} selectRoom={selectRoom} id={value.id} nameRoom={value.name} discription={value.discription} />
                                ))
                            }
                        </VStack>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            <CreateRoom/>
        </>
    );
}
