import { useEffect, useState } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { Calendar } from '../components';
import * as Model from '../models';
import * as Utilities from '../utils/Utilities';
import data from '../../dataTest.json';
import { TaskSection } from '../components/TaskSection';

export const Dashboard = () => {
  const [tasks, setTasks] = useState<Model.Task[]>([]);

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
    <Grid templateRows='auto 1fr' h='90vh' p={5} overflow='hidden'>
      <Grid templateColumns='repeat(2, 1fr)' templateRows='repeat(2, 1fr)' gap={6} h='full'>
        <GridItem colSpan={1} rowSpan={2}>
          <TaskSection tasks={tasks} />
        </GridItem>
        <GridItem colSpan={1} rowSpan={1}>
          <Calendar />
        </GridItem>
        <GridItem colSpan={1} rowSpan={1} borderWidth={2} borderColor='teal.800'>
          cia
        </GridItem>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
