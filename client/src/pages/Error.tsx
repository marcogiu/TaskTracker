import { Box, Flex, Heading, Text, Button, Icon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MdHomeFilled } from "react-icons/md";

export const Error = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Flex direction="column" align="center" justify="center" height="80vh">
      <Box textAlign="center">
        <Heading as="h2" size="xl" color="red.500">
          Errore 404 | Pagina non trovata
        </Heading>
        <Text fontSize="lg" mt={4} mb={6} color="teal">
          Spiacente, la pagina che stai cercando non è stata trovata.
        </Text>
        <Button colorScheme="teal" leftIcon={<Icon as={MdHomeFilled} />} onClick={() => navigate("/")}>
          Torna alla Homepage
        </Button>
      </Box>
    </Flex>
  );
};
