import React from 'react'
import { Box, Divider, Flex, Heading, Link } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const Navbar: React.FC<{}> = () => {
    const router = useRouter();

    return (
        <>
            <Flex>
                <Heading>QuizApp</Heading>
                <Box>
                    <Box>
                        <Link>Masuk</Link>
                    </Box>
                </Box>
            </Flex>
            <Divider />
        </>
    )
}

export default Navbar
