import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
    useMediaQuery,
} from '@chakra-ui/react';
import { FaTwitter } from 'react-icons/fa';
import { BsGithub } from "react-icons/bs";
import { AiFillLinkedin } from "react-icons/ai";
import { ReactNode } from 'react';

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
            bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
            rounded={'full'}
            w={8}
            h={8}
            cursor={'pointer'}
            as={'a'}
            href={href}
            target='_blank'
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
            }}>
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};

export default function SmallCentered() {
    const isLargeScreen = useMediaQuery("(max-width: 1440px)");

    return (
        <Box
            marginLeft={{ base: 0, sm: isLargeScreen ? -60 : -60 }}
            bottom={5}
            position={{ base: "inherit", md: "absolute" }}
            width={{ base: "full", md: "container.md" }}
            display={{ base: "full", md: isLargeScreen ? "block" : "none" }}
        >
            <Box position="absolute" top={5}>
                <Container
                    as={Stack}
                    maxW={'6xl'}
                    py={4}
                    direction={{ base: 'column', md: 'row' }}
                    spacing={4}
                    justify={{ base: 'center', md: 'start' }}
                    align={{ base: 'center', md: 'center' }}>
                    <Text>© 2023 Olamide Jubril. All rights reserved.</Text>

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
        </Box>
    );
}