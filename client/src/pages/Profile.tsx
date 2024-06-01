import { Box, FormControl, FormLabel, Input, Button, useToast, Spinner } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { RootState } from '../store';
import { useState, useEffect } from 'react';
import { useGetUserFromIdQuery, useUpdateUserMutation, useDeleteUserMutation } from '../features/user/userSlice';

export const Profile = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.auth.userInfo);

  const {
    data: userData,
    error,
    isLoading
  } = useGetUserFromIdQuery(user._id, {
    skip: !user
  });
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
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

  const handleUpdate = async () => {
    try {
      await updateUser({ id: user._id, data: localUserData }).unwrap();
      toast({
        title: 'Profilo aggiornato',
        description: 'I tuoi dati sono stati aggiornati con successo.',
        status: 'success',
        colorScheme: 'teal',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    } catch (err) {
      toast({
        title: 'Errore',
        description: "Si è verificato un errore durante l'aggiornamento dei dati.",
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(user._id).unwrap();
      dispatch(logout(user));
      localStorage.removeItem('userInfo');
      navigate('/login');
      toast({
        title: 'Account eliminato',
        description: 'Il tuo account è stato eliminato con successo.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    } catch (err) {
      toast({
        title: 'Errore',
        description: "Si è verificato un errore durante l'eliminazione dell'account.",
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    }
  };

  const handleLogout = () => {
    dispatch(logout(user));
    localStorage.removeItem('userInfo');
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
      <Button onClick={() => navigate('/dashboard')}>Torna alla dashboard</Button>
      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input type='email' value={localUserData.email} onChange={(e) => setLocalUserData({ ...localUserData, email: e.target.value })} />
      </FormControl>
      <FormControl id='username' mt={4} isRequired>
        <FormLabel>Username</FormLabel>
        <Input type='text' value={localUserData.username} onChange={(e) => setLocalUserData({ ...localUserData, username: e.target.value })} />
      </FormControl>
      <Button mt={4} colorScheme='blue' onClick={handleUpdate} isLoading={isUpdating}>
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
