import { useNavigate } from 'react-router-dom';
import logo from '../assets/logoTaskTracker.png';
import { Button, ButtonGroup, Flex, Text, Image, Menu, MenuButton, MenuItem, MenuList, IconButton, Box } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const MotionLogo = motion(Image);

export const Navbar = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout(userInfo));
    navigate('/login');
  };

  const mobileAuthLinks = (
    <>
      <MenuItem as={Button} colorScheme='teal' justifyContent='center' w='full' onClick={() => navigate('/dashboard')}>
        Dashboard
      </MenuItem>
      <MenuItem as={Button} variant='outline' colorScheme='teal' justifyContent='center' w='full' onClick={() => navigate('/profile')}>
        My Profile
      </MenuItem>
      <MenuItem as={Button} colorScheme='red' justifyContent='center' w='full' onClick={handleLogout}>
        Logout
      </MenuItem>
    </>
  );

  const mobileGuestLinks = (
    <>
      <MenuItem as={Button} colorScheme='teal' justifyContent='center' w='full' onClick={() => navigate('/login')}>
        Login
      </MenuItem>
      <MenuItem as={Button} variant='outline' colorScheme='teal' justifyContent='center' w='full' onClick={() => navigate('/signup')}>
        Sign Up
      </MenuItem>
    </>
  );

  // Animation variants for logo
  const logoAnimation = {
    initial: { opacity: 0, scale: 0.2 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.8 }
  };

  return (
    <Flex w='100%' justifyContent='space-between' alignItems='center' h='10vh' px={10} bg='palette.limeGreen'>
      <Flex alignItems='center' gap='4'>
        <Box cursor='pointer' onClick={() => navigate('/')}>
          <MotionLogo src={logo} alt='TaskTracker Logo' boxSize='75px' {...logoAnimation} />
        </Box>
        <Text fontSize='xl' as='b' color='teal' ml={2}>
          TaskTracker
        </Text>
      </Flex>
      <Box display={{ base: 'none', md: 'flex' }}>
        {userInfo ? (
          <ButtonGroup spacing='5'>
            <Button colorScheme='teal' onClick={() => navigate('/dashboard')}>
              Dashboard
            </Button>
            <Button variant='outline' colorScheme='teal' onClick={() => navigate('/me')}>
              My Profile
            </Button>
            <Button colorScheme='teal' onClick={handleLogout}>
              Logout
            </Button>
          </ButtonGroup>
        ) : (
          <ButtonGroup spacing='5'>
            <Button colorScheme='teal' onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button variant='outline' colorScheme='teal' onClick={() => navigate('/signup')}>
              Sign Up
            </Button>
          </ButtonGroup>
        )}
      </Box>
      <Menu>
        <MenuButton as={IconButton} icon={<HamburgerIcon />} display={{ md: 'none' }} colorScheme='teal' />
        <MenuList w='100vw' h='100vh'>
          {userInfo ? mobileAuthLinks : mobileGuestLinks}
        </MenuList>
      </Menu>
    </Flex>
  );
};
