import { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";

export const Profile = (): JSX.Element => {
  // Simulazione dei dati utente
  const [userData, setUserData] = useState({
    email: "example@email.com",
    username: "username",
  });

  const toast = useToast();

  const handleUpdate = () => {
    // Logica per l'aggiornamento dei dati utente
    toast({
      title: "Profilo aggiornato",
      description: "I tuoi dati sono stati aggiornati con successo.",
      status: "success",
      colorScheme: "teal",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  const handleDeleteAccount = () => {
    // Logica per la cancellazione dell'account
    toast({
      title: "Account eliminato",
      description: "Il tuo account è stato eliminato con successo.",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
      </FormControl>
      <FormControl id="username" mt={4} isRequired>
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          value={userData.username}
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
        />
      </FormControl>
      <Button mt={4} colorScheme="blue" onClick={handleUpdate}>
        Aggiorna Profilo
      </Button>
      <Button mt={4} colorScheme="red" onClick={handleDeleteAccount}>
        Elimina Account
      </Button>
    </Box>
  );
};
