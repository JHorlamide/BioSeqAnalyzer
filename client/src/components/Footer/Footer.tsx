/* React */
import { ReactNode } from 'react';

/*  Chakra UI*/
import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
} from '@chakra-ui/react';

/* Libraries React Icons */
import { FaTwitter } from 'react-icons/fa';
import { BsGithub } from "react-icons/bs";
import { AiFillLinkedin } from "react-icons/ai";

interface SocialButtonProps {
    children: ReactNode;
    label: string;
    href: string;
}

const GitHubProfile = "https://github.com/JHorlamide";
const TwitterProfile = "https://twitter.com/J_Horlamide";
const LinkedInProfile = "https://www.linkedin.com/in/olamide-jubril-b80442194/";

const SocialButton = (props: SocialButtonProps) => {
    const { children, label, href, } = props;

    return (
        <chakra.button
            href={href}
            rounded="full"
            w={5}
            h={5}
            padding={1}
            color="white"
            cursor="pointer"
            as="a"
            target="_blank"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            transition="background 0.3s ease"
            bg={useColorModeValue('gray.500', 'gray.200')}
            _hover={{
                color: "white",
                bg: useColorModeValue('gray.500', 'gray.200'),
            }}
        >
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};

export default function SmallCentered() {
    return (
        <Box
            right={0}
            bottom={0}
            color="white"
            position="absolute"
            bgColor="brand_blue.300"
            paddingY={0.5}
            width="contain"
        >
            <Container
                as={Stack}
                spacing={4}
                direction={{ base: 'column', md: 'row' }}
                justify={{ base: 'center', md: 'start' }}
                align={{ base: 'center', md: 'center' }}
            >
                <Text fontSize="12px">© 2023 Olamide Jubril. All rights reserved.</Text>

                <Stack direction={'row'} spacing={6}>
                    <SocialButton label={'Twitter'} href={TwitterProfile}>
                        <FaTwitter />
                    </SocialButton>

                    <SocialButton label={'GitHub'} href={GitHubProfile}>
                        <BsGithub />
                    </SocialButton>

                    <SocialButton label={'LinkedIn'} href={LinkedInProfile}>
                        <AiFillLinkedin />
                    </SocialButton>
                </Stack>
            </Container>
        </Box>
    );
}
