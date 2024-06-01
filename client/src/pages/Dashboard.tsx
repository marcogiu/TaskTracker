import { useEffect, useState } from 'react';
import { Grid, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { Calendar } from '../components';
import * as Model from '../models';
import * as Utilities from '../utils/Utilities';
import data from '../../dataTest.json';
import { TaskSection } from '../components/TaskSection';
import { Summary } from '../components/Summary';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useGetUserFromIdQuery } from '../features/user/userSlice';

export const Dashboard = () => {
  const [tasks, setTasks] = useState<Model.Task[]>([]);

  const user = useSelector((state: RootState) => state.auth.userInfo);

  const {
    data: userData,
    error,
    isLoading
  } = useGetUserFromIdQuery(user._id, {
    skip: !user
  });

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

  if (isLoading) {
    return <Spinner size='xl' />;
  }

  if (error) {
    return (
      <Alert status='error'>
        <AlertIcon />
        There was an error processing your request
      </Alert>
    );
  }

  return (
    <Grid templateRows='auto 1fr' h='100vh' p={5} overflow='hidden'>
      <Summary addTask={addTask} user={userData} />
      <Grid templateColumns='repeat(2, 1fr)' gap={6} h='full'>
        <TaskSection tasks={tasks} />
        <Calendar />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
