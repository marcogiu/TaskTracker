import { Flex, Box, Text, Image, Link, Icon } from "@chakra-ui/react";
import { FaFacebookF, FaTwitter, FaGithub } from "react-icons/fa";
import logo from "../assets/logoTaskTracker.png";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();
  return (
    <Box height="10vh" bg="teal.500">
      <Flex maxW="7xl" mx="auto" px={4} align="center" justify="space-between" height="full">
        {/* Logo */}
        <Box flexShrink={0} onClick={() => navigate("/")} cursor="pointer">
          <Image src={logo} alt="Task Tracker Logo" height="8vh" />
        </Box>

        {/* Informazioni aggiuntive o testo */}
        <Box color="teal" textAlign={{ base: "center", md: "left" }} mt={{ base: 4, md: 0 }}>
          <Text>Task Tracker, organizza il tuo lavoro e la tua vita.</Text>
          <Text fontSize="sm">© {new Date().getFullYear()} Task Tracker Inc.</Text>
        </Box>

        {/* Social links */}
        <Flex mt={{ base: 4, md: 0 }}>
          <Link href="https://facebook.com" isExternal color="teal" _hover={{ color: "teal.300" }} mx={2}>
            <Icon as={FaFacebookF} boxSize={6} />
          </Link>
          <Link href="https://twitter.com" isExternal color="teal" _hover={{ color: "teal.300" }} mx={2}>
            <Icon as={FaTwitter} boxSize={6} />
          </Link>
          <Link href="https://github.com" isExternal color="teal" _hover={{ color: "teal.300" }} mx={2}>
            <Icon as={FaGithub} boxSize={6} />
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};
