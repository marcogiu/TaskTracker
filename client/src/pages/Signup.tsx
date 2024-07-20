import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast, Flex, Box, FormControl, FormLabel, Input, Button, Heading, InputGroup, InputRightElement, IconButton, useColorModeValue } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { User } from '../models';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice';
import * as Constants from '../utils/Constants';
import { LoginResponse, useUserRegisterMutation } from '../service/userService';

const MotionBox = motion(Box);

interface ErrorResponse {
  data?: {
    status?: string;
    message?: string;
    errors?: Array<{ field: string; message: string }>;
  };
  message?: string;
}

interface PasswordState {
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
}

export const Signup = (): JSX.Element => {
  const [formData, setFormData] = useState<User>(Constants.initialUserState);
  const [passwordState, setPasswordState] = useState<PasswordState>({
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false
  });
  const navigate = useNavigate();
  const toast = useToast();
  const [register, { isLoading: isRegisterLoading }] = useUserRegisterMutation();
  const bg = useColorModeValue('white', 'gray.700');
  const dispatch = useDispatch();

  const { confirmPassword, showPassword, showConfirmPassword } = passwordState;

  const updatePasswordState = (field: keyof PasswordState, value: boolean | string) => {
    setPasswordState((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
      return;
    }

    try {
      const response = await register(formData).unwrap();

      toast({
        title: 'Registration Successful',
        description: 'You have successfully registered.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });

      const userData: LoginResponse = {
        token: response.user.access_token,
        refreshToken: response.user.refreshToken,
        _id: response.user.user.id
      };

      dispatch(loginSuccess(userData));
      navigate('/dashboard');
    } catch (error) {
      const responseError = error as ErrorResponse;
      let errorMessage = responseError?.message || 'Registration failed. Please try again.';

      if (responseError?.data?.errors) {
        const errorMessages = responseError.data.errors.map((err) => `${err.field}: ${err.message}`).join(', ');
        errorMessage = errorMessages || errorMessage;
      }

      toast({
        title: 'Registration Failed',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    }
  };

  return (
    <Flex align='center' justify='center' minHeight='90vh' bg={bg}>
      <MotionBox width='full' maxW='md' p={8} borderRadius='lg' boxShadow='dark-lg' bg='white' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Heading as='h2' size='xl' textAlign='center' mb={6} color='teal.600'>
          Registration
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id='username' isRequired mb={4}>
            <FormLabel>Username</FormLabel>
            <Input name='username' type='text' placeholder='Username' value={formData.username} onChange={handleChange} />
          </FormControl>
          <FormControl id='email' isRequired mb={4}>
            <FormLabel>Email</FormLabel>
            <Input name='email' type='email' placeholder='Email' value={formData.email} onChange={handleChange} />
          </FormControl>
          <FormControl id='password' isRequired mb={4}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input name='password' type={showPassword ? 'text' : 'password'} placeholder='Password' value={formData.password} onChange={handleChange} />
              <InputRightElement>
                <IconButton
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => updatePasswordState('showPassword', !showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  size='sm'
                  variant='unstyled'
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id='confirmPassword' isRequired mb={6}>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => updatePasswordState('confirmPassword', e.target.value)}
              />
              <InputRightElement>
                <IconButton
                  icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => updatePasswordState('showConfirmPassword', !showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  size='sm'
                  variant='unstyled'
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            colorScheme='teal'
            width='full'
            type='submit'
            isLoading={isRegisterLoading}
            loadingText='Registering...'
            _hover={{ transform: 'scale(1.05)' }}
            _active={{ transform: 'scale(0.95)' }}
          >
            Register
          </Button>
        </form>
      </MotionBox>
    </Flex>
  );
};
