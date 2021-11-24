import { Container, Center, Button, VStack, Heading, useBoolean } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { ThemeContext } from '../context/index'
import { FaFacebookF } from 'react-icons/fa'
import { AiOutlineGoogle } from 'react-icons/ai'
import { getAdditionalUserInfo, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from '../firebase/config'
import { addDocument } from '../firebase/services'

import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'

import ReactLoading from 'react-loading'

export default function Login() {
    const navigate = useNavigate()

    const { UserReducer } = useContext(ThemeContext)

    const setUser = (user) => {
        const data = {
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
            photoURL: user.photoURL,
        }

        UserReducer.dispatch({
            type: 'LOGIN_SUCCESS',
            payload: data
        })
    }


    const [isLoading, setLoading] = useBoolean(true)
    const [right, setBoolean] = useBoolean()
    const [rightFb, setBooleanFb] = useBoolean()

    const provider = new GoogleAuthProvider();
    const providerFc = new FacebookAuthProvider()

    const loginGoole = async () => {
        setBoolean.on()

        signInWithPopup(auth, provider).then(result => {
            const { isNewUser, providerId } = getAdditionalUserInfo(result)

            if (isNewUser) {
                const data = {
                    displayName: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL,
                    uid: result.user.uid,
                    providerId: providerId
                }

                addDocument('users', data)
            }

            setBoolean.off()
            setUser(result.user)
            navigate('/')
        }).catch(error => {
            setBoolean.off()
        })
    }

    const loginFaceBook = async ()=> {
        setBooleanFb.on()

        signInWithPopup(auth, providerFc).then(result=> {
            const { isNewUser, providerId } = getAdditionalUserInfo(result)

            if (isNewUser) {
                const data = {
                    displayName: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL,
                    uid: result.user.uid,
                    providerId: providerId
                }

                addDocument('users', data)
            }

            setBoolean.off()
            setUser(result.user)
            navigate('/')
        }).catch(error => {
            setBooleanFb.off()
        })

    }

    useEffect(()=> {
        const r = setTimeout(() => {
            if(!UserReducer.user.success){
                setLoading.toggle()
            }
        }, 3000);
        
        return ()=> {
            clearTimeout(r)
        }
    }, [UserReducer.user])

    return (
        <>
            <Helmet>
                <title>Login'</title>
            </Helmet>
            {
                isLoading ?
                    <Center h="100vh">
                        <ReactLoading type='bubbles' color='#65a9ff' height={150} width={100} /> 
                    </Center>
                    :
                    <Container>
                        <Center flexDirection="column" h="80vh">
                            <Heading size="2xl">Login</Heading>
                            <VStack mt="10" direction="row" spacing={5}>
                                <Button isLoading={right} onClick={loginGoole} iconSpacing={5} leftIcon={<AiOutlineGoogle />} colorScheme="red" isFullWidth maxW="250px" size="lg" variant="outline">Login with Google</Button>
                                <Button isLoading={rightFb} onClick={loginFaceBook} iconSpacing={5} leftIcon={<FaFacebookF />} colorScheme="blue" isFullWidth maxW="250px" size="lg" variant="outline">Login with FaceBook</Button>
                            </VStack>
                        </Center>
                    </Container>
            }

        </>
    );
}
