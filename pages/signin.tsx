import React from 'react'
import { useRouter } from 'next/router'
import { Button, Center, Container, Heading, VStack } from '@chakra-ui/react'
import { FcGoogle } from 'react-icons/fc'
import { useAuth } from '../src/lib/auth'
import Navbar from '../src/common/Navbar'

const signin = () => {
    const { auth, siginWithGoogle } = useAuth();
    const router = useRouter();

    if(auth){
        router.push((router.query.next as string) || '/')
    }
    
    return (
        <>
            <Navbar />
            <Container>
                <Center mt={10}>
                    <VStack spacing={4}>
                        <Heading fontSize="3xl" mb={2}>Hello, Di Aplikasi Kuis!</Heading>
                        <Button leftIcon={<FcGoogle />} onClick={() => siginWithGoogle()}>Login dengan Google</Button>
                    </VStack>
                </Center>
            </Container>
        </>
    )
}

export default signin
