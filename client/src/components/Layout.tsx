import { Outlet } from 'react-router-dom';
import { Flex, Box, Spinner, Center, Text } from '@chakra-ui/react';
import { Navbar, Summary } from '.';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useGetUserByIdQuery } from '../service/userService';

export const Layout = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  // Ottieni i dati dell'utente se l'ID dell'utente è disponibile
  const {
    data: userData,
    error,
    isLoading
  } = useGetUserByIdQuery(userInfo?._id, {
    skip: !userInfo?._id
  });

  // Mostra uno spinner durante il caricamento dei dati dell'utente
  if (isLoading) {
    return (
      <Center minHeight='100vh' bg='white'>
        <Spinner size='xl' />
      </Center>
    );
  }

  // Mostra un messaggio di errore se c'è un problema nel caricamento dei dati
  if (error) {
    return (
      <Center minHeight='100vh' bg='white'>
        <Text color='red.500'>Error loading user data</Text>
      </Center>
    );
  }

  return (
    <Flex direction='column' minHeight='100vh' bg='white'>
      {/* Mostra il componente Summary se userData è disponibile, altrimenti mostra il Navbar */}
      {userData ? <Summary user={userData} /> : <Navbar />}
      <Box flex='1'>
        <Outlet />
      </Box>
    </Flex>
  );
};
