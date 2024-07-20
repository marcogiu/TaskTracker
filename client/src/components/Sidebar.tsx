import { Box, Flex, Image, Text, Divider, VStack, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md';
import Avvvatars from 'avvvatars-react';
import * as Model from '../models';
import logo from '../assets/logoTaskTracker.png';
import { DragHandleIcon } from '@chakra-ui/icons';
import { IoIosStats } from 'react-icons/io';

interface SidebarProps {
  user: Model.User | undefined;
}

interface CustomButtonProps {
  icon: React.ReactElement;
  text: string;
  onClick: () => void;
}

const CustomButton = ({ icon, text, onClick }: CustomButtonProps) => (
  <Button
    bgColor='button'
    color='cardBackground'
    w='100%'
    borderWidth={2}
    borderColor='button'
    onClick={onClick}
    _hover={{ bgColor: 'background', color: 'buttonText' }}
    _active={{ bgColor: 'teal.700', color: 'cardBackground', borderColor: 'cardBackground' }}
    gap={2}
  >
    {icon}
    <Flex w='100%' justifyContent='start'>
      {text}
    </Flex>
  </Button>
);

const Sidebar = ({ user }: SidebarProps): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Flex as='nav' pos='fixed' top='0' left='0' h='100vh' w={{ base: 'full', md: '15%' }} alignItems='center' justifyContent='center'>
      <Box bg='cardBackground' w='95%' h='98%' borderRadius={10} border='2px solid' borderColor='button' p={4}>
        <Flex direction='column' h='100%'>
          <Flex alignItems='center' justifyContent='start' borderBottom='2px solid' borderColor='button' height='10%'>
            <Image src={logo} alt='TaskTracker Logo' h='100%' />
            <Text fontSize='large' fontWeight={700} color='teal.800'>
              TaskTracker
            </Text>
          </Flex>
          <Divider />
          <VStack direction='column' mt={4} gap={4} height='70%'>
            <CustomButton icon={<MdDashboard />} text='Dashboard' onClick={() => navigate('/')} />
            <CustomButton icon={<DragHandleIcon />} text='All Tasks' onClick={() => navigate('/projects')} />
            <CustomButton icon={<IoIosStats />} text='Stats' onClick={() => navigate('/stats')} />
          </VStack>
          {user && (
            <Flex direction='column' alignItems='center' gap={1} height='20%'>
              <Box onClick={() => navigate('/me')} border='1px solid' borderColor='button' borderRadius='50%' cursor='pointer' mb={4}>
                <Avvvatars value={user.username} size={60} />
              </Box>
              <Text fontSize={20} fontWeight={600}>
                {user.username}
              </Text>
              <Text color='gray.500'>{user.email}</Text>
            </Flex>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default Sidebar;
