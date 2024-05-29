import { Box, FormControl, FormLabel, Input, Button, useToast, Spinner } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { RootState } from '../store';
import { useGetUserFromIdQuery } from '../features/user/userSlice';
import { useState, useEffect } from 'react';

export const Profile = (): JSX.Element => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { data: userData, error, isLoading } = useGetUserFromIdQuery(userInfo?.id || '');
  const [localUserData, setLocalUserData] = useState({ email: '', username: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    if (userData) {
      setLocalUserData({
        email: userData.email,
        username: userData.username
      });
    }
  }, [userData]);

  const handleUpdate = () => {
    // Logica per l'aggiornamento dei dati utente
    toast({
      title: 'Profilo aggiornato',
      description: 'I tuoi dati sono stati aggiornati con successo.',
      status: 'success',
      colorScheme: 'teal',
      duration: 5000,
      isClosable: true,
      position: 'top'
    });
  };

  const handleDeleteAccount = () => {
    // Logica per la cancellazione dell'account
    toast({
      title: 'Account eliminato',
      description: 'Il tuo account è stato eliminato con successo.',
      status: 'warning',
      duration: 5000,
      isClosable: true,
      position: 'top'
    });
  };

  const handleLogout = () => {
    dispatch(logout(userInfo));
    navigate('/login');
    toast({
      title: 'Logout effettuato',
      description: 'Sei stato disconnesso con successo.',
      status: 'info',
      duration: 5000,
      isClosable: true,
      position: 'top'
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Box>Si è verificato un errore nel caricamento dei dati dell'utente.</Box>;
  }

  return (
    <Box p={5} shadow='md' borderWidth='1px' flex='1' borderRadius='md'>
      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input type='email' value={localUserData.email} onChange={(e) => setLocalUserData({ ...localUserData, email: e.target.value })} />
      </FormControl>
      <FormControl id='username' mt={4} isRequired>
        <FormLabel>Username</FormLabel>
        <Input type='text' value={localUserData.username} onChange={(e) => setLocalUserData({ ...localUserData, username: e.target.value })} />
      </FormControl>
      <Button mt={4} colorScheme='blue' onClick={handleUpdate}>
        Aggiorna Profilo
      </Button>
      <Button mt={4} colorScheme='red' onClick={handleDeleteAccount}>
        Elimina Account
      </Button>
      <Button mt={4} colorScheme='orange' onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default Profile;
