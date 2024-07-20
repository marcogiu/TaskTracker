import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast, Flex, Box, FormControl, FormLabel, Input, Button, Heading, InputGroup, InputRightElement, IconButton, useColorModeValue } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice';
import * as Model from '../models';
import { LoginResponse, useUserLoginMutation } from '../service/userService';

const MotionBox = motion(Box);

export const Login = (): JSX.Element => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const bg = useColorModeValue('white', 'gray.700');

  const [login, { isLoading }] = useUserLoginMutation();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
      return;
    }

    try {
      const result = await login(formData).unwrap();
      const userData: LoginResponse = {
        token: result.token,
        refreshToken: result.refreshToken,
        _id: result._id
      };

      dispatch(loginSuccess(userData));
      toast({
        title: 'Login Successful',
        description: 'You have successfully logged in.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
      navigate('/dashboard');
    } catch (error: unknown) {
      const apiError = error as Model.ApiError;
      let errorMessage = 'Login failed due to unexpected error';

      if (apiError.data && apiError.data.message) {
        errorMessage = apiError.data.message;
      } else if (apiError.message) {
        errorMessage = apiError.message;
      }

      toast({
        title: 'Login Failed',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    }
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <Flex align='center' justify='center' height='90vh' bg={bg}>
      <MotionBox width='full' maxW='lg' p={8} borderRadius={8} bg='white' boxShadow='dark-lg' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Heading as='h2' size='xl' textAlign='center' mb={6} color='teal.600'>
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id='email' isRequired mb={4}>
            <FormLabel>Email</FormLabel>
            <Input name='email' type='email' placeholder='Enter your email' value={formData.email} onChange={handleChange} />
          </FormControl>
          <FormControl id='password' isRequired mb={6}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input name='password' type={showPassword ? 'text' : 'password'} placeholder='Enter your password' value={formData.password} onChange={handleChange} />
              <InputRightElement>
                <IconButton
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={toggleShowPassword}
                  size='sm'
                  variant='ghost'
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            colorScheme='teal'
            width='full'
            type='submit'
            isLoading={isLoading}
            loadingText='Logging In...'
            _hover={{ transform: 'scale(1.05)' }}
            _active={{ transform: 'scale(0.95)' }}
          >
            Login
          </Button>
        </form>
      </MotionBox>
    </Flex>
  );
};
