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
            bg={useColorModeValue('brand_blue.300', 'brand_blue.100')}
            href={href}
            rounded={'full'}
            w={5}
            h={5}
            padding={1}
            color="white"
            cursor={'pointer'}
            as={'a'}
            target='_blank'
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
                color: "white",
                bg: useColorModeValue('brand_blue.50', 'whiteAlpha.200'),
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
            bottom={5}
            marginLeft={{ base: 0, sm: isLargeScreen ? -60 : -60 }}
            position={{ base: "unset", md: "absolute" }}
            width={{ base: "full", md: "container.md" }}
            display={{ base: "none", md: isLargeScreen ? "block" : "none" }}
        >
            <Box position={{ base: "unset", md: "absolute" }} top="20.5px">
                <Container
                    as={Stack}
                    maxW={'6xl'}
                    direction={{ base: 'column', md: 'row' }}
                    spacing={4}
                    justify={{ base: 'center', md: 'start' }}
                    align={{ base: 'center', md: 'center' }}>
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
        </Box>
    );
}