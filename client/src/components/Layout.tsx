import { Outlet } from 'react-router-dom';
import { Flex, Box } from '@chakra-ui/react';
import { Navbar } from '.';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const Layout = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  return (
    <Flex direction='column' minHeight='100vh' bg='white'>
      {!userInfo && <Navbar />}
      <Box flex='1'>
        <Outlet />
      </Box>
    </Flex>
  );
};
