import React from "react";
import {Center, InputGroup, Input, InputRightElement} from '@chakra-ui/react'
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchRorm() {
    
  return (
    <Center h="70px">
      <InputGroup>
        <Input placeholder="Search rooms ..." />
        <InputRightElement
          children={<AiOutlineSearch color="gray" size="25" />}
        />
      </InputGroup>
    </Center>
  );
}
