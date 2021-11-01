import React from 'react'
import { Box, Divider, Flex, Heading, Link } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useAuth } from '../lib/auth'

const Navbar: React.FC<{}> = () => {
    const { auth, signOut } = useAuth();
    const router = useRouter();

    return (
        <>
            <Flex justify="space-between" m={4}>
                <Heading onClick={() => router.push('/')} as="button">QuizApp</Heading>
                <Box>
                    {auth ? (
                        <Box>
                            <Link
                                p={2}
                                onClick={() => router.push('/quiz/new')}
                                fontWeight={
                                    router.pathname === '/quiz/new' ? 'extrabold' : 'normal'
                                }
                            >Tambah Kuis</Link>
                            <Link 
                                p={2}
                                onClick={() => signOut()}
                            >Keluar</Link>
                        </Box>
                    ):(
                        <Box p={2}>
                        <Link
                            p={2}
                            onClick={() => router.push('/signin')}
                            fontWeight={
                                router.pathname === '/signin' ? 'extrabold' : 'normal'
                            }
                        >Masuk</Link>
                        </Box>
                    )}
                    
                </Box>
            </Flex>
            <Divider 
                css={{
                    boxShadow: '1px 1px #888888'
                }}
            />
        </>
    )
}

export default Navbar
