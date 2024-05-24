import { useEffect, useState } from 'react';
import { VStack, Text, Grid, Flex, Box, Avatar, Heading } from '@chakra-ui/react';
import { Calendar, FormNewTask, TaskCard } from '../components';
import * as Model from '../models';
import * as Utilities from '../utils/Utilities';
import data from '../../dataTest.json';
import dayjs from 'dayjs';

// Mock user data
const user = {
  name: 'John Doe',
  avatar: 'https://via.placeholder.com/150',
  isFirstLogin: false
};

export const Dashboard = () => {
  const [tasks, setTasks] = useState<Model.Task[]>([]);
  // const [date, setDate] = useState(new Date());

  const addTask = (task: Model.Task) => {
    setTasks([...tasks, task]);
  };

  useEffect(() => {
    const tasksWithDates = data.tasks.map((task) => ({
      ...task,
      dueDate: task.dueDate ? new Date(task.dueDate) : null,
      createdAt: new Date(task.createdAt),
      updatedAt: task.updatedAt ? new Date(task.updatedAt) : null,
      size: Utilities.getTaskSize(task.size),
      status: Utilities.getTaskStatus(task.status),
      priority: Utilities.getTaskPriority(task.priority)
    }));
    setTasks(tasksWithDates);
  }, []);

  return (
    <Grid templateRows='auto 1fr' h='100vh' p={5} overflow='hidden'>
      <Flex justifyContent='space-between' alignItems='center' mb={5}>
        <Flex alignItems='center'>
          <Avatar src={user.avatar} size='lg' mr={4} />
          <Box>
            <Heading as='h2' size='lg'>
              {user.isFirstLogin ? 'Benvenuto' : 'Bentornato'}, {user.name}!
            </Heading>
            <Text fontSize='md' color='gray.600'>
              {dayjs().format('DD MMMM YYYY')}
            </Text>
          </Box>
        </Flex>
        <FormNewTask onAddTask={addTask} />
      </Flex>
      <Grid templateColumns='1fr 1fr' gap={6} h='full'>
        <Box overflow='auto' h='full' pr={4}>
          <Text fontSize='2xl' fontWeight='bold' color='teal.700' mb={4}>
            Eventi del giorno
          </Text>
          <VStack spacing={4} align='stretch'>
            {tasks.map((task, index) => (
              <TaskCard task={task} key={index} />
            ))}
          </VStack>
        </Box>
        <Box>
          <Calendar />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
