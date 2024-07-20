import { useEffect, useState } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import * as Model from '../models';
import * as Utilities from '../utils/Utilities';
import data from '../../dataTest.json';
import { TaskSection } from '../components/TaskSection';
import { StatsCard } from '../components/StatsCard';
import { Calendar } from '../components/Calendar';

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
    <Grid templateColumns='2fr 1fr' flex='1' width='100%' h='89vh' m='0 auto' gap={2}>
      <GridItem colSpan={1}>
        <TaskSection tasks={tasks} />
      </GridItem>
      <GridItem colSpan={1} display='grid' gridTemplateRows='1fr 1fr' gap={2}>
        <StatsCard tasks={tasks} />
        <Calendar />
      </GridItem>
    </Grid>
  );
};
