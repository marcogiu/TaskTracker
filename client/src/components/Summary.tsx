import { Flex, Heading, Box, Text, Input, IconButton, Menu, MenuList, MenuItem } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { BellIcon, SearchIcon, StarIcon } from '@chakra-ui/icons';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineLogout } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import * as Model from '../models';

interface ISummaryProps {
  user: Model.User | undefined;
}

export const Summary = (props: ISummaryProps): JSX.Element => {
  const { user } = props;
  const navigate = useNavigate();

  return (
    <Flex justifyContent='space-between' h='10vh' alignItems='center' boxShadow='md'>
      <Box>
        <Heading as='h2' size='lg'>
          <Text>Ciao {user?.username}</Text>
        </Heading>
        <Text fontSize='md' color='gray.600'>
          {dayjs().format('DD MMMM YYYY')}
        </Text>
      </Box>
      <Flex alignItems='center' gap={4}>
        <Input placeholder='Cerca...' />
        <IconButton title='Cerca' aria-label='Search' icon={<SearchIcon />} />
        <IconButton title='Statistiche' aria-label='Stats' icon={<StarIcon />} onClick={() => navigate('/stats')} />
        <IconButton title='Notifiche' aria-label='Notifications' icon={<BellIcon />} />
        <Menu>
          <MenuList>
            <MenuItem icon={<CgProfile />} onClick={() => navigate('/me')}>
              Profilo
            </MenuItem>
            <MenuItem icon={<FiSettings />} onClick={() => navigate('/settings')}>
              Impostazioni
            </MenuItem>
            <MenuItem icon={<AiOutlineLogout />} onClick={() => {}}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};
