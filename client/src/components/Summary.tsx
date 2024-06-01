import { Flex, Heading, Box, Text, Button } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { FormNewTask } from './FormNewTask';
import * as Model from '../models';
import { useNavigate } from 'react-router-dom';

interface ISummaryProps {
  user: Model.User | undefined;
  addTask: (task: Model.Task) => void;
}

export const Summary = (props: ISummaryProps): JSX.Element => {
  const { user, addTask } = props;
  const navigate = useNavigate();

  return (
    <Flex justifyContent='space-between' alignItems='center' mb={5}>
      <Flex alignItems='center'>
        <Button onClick={() => navigate('/me')} mr={4}>
          Vai al Profilo
        </Button>
        <Box>
          <Heading as='h2' size='lg'>
            <Text>Bentornato {user?.username}</Text>
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
