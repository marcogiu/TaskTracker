import { Flex, Avatar, Heading, Box, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { FormNewTask } from './FormNewTask';
import * as Model from '../models';
import { useNavigate } from 'react-router-dom';

interface ISummaryProps {
  user: Model.User;
  addTask: (task: Model.Task) => void;
}

export const Summary = (props: ISummaryProps): JSX.Element => {
  const { user, addTask } = props;

  const navigate = useNavigate();

  return (
    <Flex justifyContent='space-between' alignItems='center' mb={5}>
      <Flex alignItems='center'>
        <Avatar src={user.avatar} size='lg' mr={4} cursor='pointer' onClick={() => navigate('/me')} />
        <Box>
          <Heading as='h2' size='lg'>
            {user.isFirstLogin ? 'Benvenuto' : 'Bentornato'}, {user.username}!
          </Heading>
          <Text fontSize='md' color='gray.600'>
            {dayjs().format('DD MMMM YYYY')}
          </Text>
        </Box>
      </Flex>
      <FormNewTask onAddTask={addTask} />
    </Flex>
  );
};
