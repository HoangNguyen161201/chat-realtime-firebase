import {Box, Image, Center} from '@chakra-ui/react'
import music from '../../assets/myLove.mp3'
import './styles/index.css'
import {BsFillPlayFill, BsFillPauseFill} from 'react-icons/bs'
import { useEffect, useState, useCallback} from 'react'

export default function Music() {
    const [musicState, setMusicState] = useState(false)
    
    const enterMusic = useCallback(
        () => {
            const elementMusic = document.getElementById('audio')
            if (elementMusic.paused){
                console.log('sdsd')
                setMusicState(true)
                elementMusic.play()
            } else {
                console.log('hoang')

                setMusicState(false)
                elementMusic.pause()
            }
        },[])

    
    return (
        <>
            <Box display='flex' position='relative' justifyContent='center' alignItems='center' w="100%" h='70px' position="relative" borderRadius="5px" overflow="hidden">
                <Image loading="lazy" h='48px' w="100%" objectFit="cover" src="https://media.giphy.com/media/boJT0xmU97bUlb5HjU/giphy-downsized-large.gif" borderRadius="5px"/>    
                <video id='audio'  style={{position: 'absolute', zIndex: '2', opacity: '0', width: '0px'}} src={music} controls loop/>
                <Center mt='11px' py="10px" position='absolute' w='100%' h='48px' top='0' overflow='hidden' left='0'>
                    <Box className={musicState?'music':'musicPause'} borderRadius="full" w='40px' h='48px' bg='teal.200' opacity="0.5"></Box>
                </Center>
                <Center onClick={enterMusic} position='absolute' cursor='pointer'>
                    {
                        musicState? 
                        <BsFillPauseFill color='white' size="30"/>
                        :
                        <BsFillPlayFill color='white' size="30"/>
                    }
                </Center>
            </Box>   
        </>
    )
}
