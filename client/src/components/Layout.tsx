import { Outlet } from 'react-router-dom';
import { Flex, Box, Spinner, Center, Text } from '@chakra-ui/react';
import { Navbar } from '.';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useGetUserByIdQuery } from '../service/userService';
import Sidebar from './Sidebar';
import { Summary } from './Summary';

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
  console.log(userData);

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
    <Flex direction='column' h='100vh' bg='background'>
      <Box as='header'>{!userInfo && <Navbar />}</Box>
      <Flex as='main' flex='1'>
        <Box as='section' w={userData ? '85%' : '100%'} position='fixed' left={userData ? '15%' : '0'} top='10vh'>
          <Outlet />
          {userInfo && (
            <>
              <Summary />
              <Sidebar user={userData} />
            </>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};
