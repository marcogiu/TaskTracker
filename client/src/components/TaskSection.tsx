import { Text, Flex, Grid } from '@chakra-ui/react';
import { TaskCard } from './TaskCard';
import * as Model from '../models';

interface ITaskSectionProps {
  tasks: Model.Task[];
}

export const TaskSection = (props: ITaskSectionProps): JSX.Element => {
  const { tasks } = props;
  return (
    <Flex>
      <Text fontSize='2xl' fontWeight='bold' color='teal.700' mb={4}>
        Total Task: 23
      </Text>
      <Grid templateColumns='repeat(3, 1fr)' gridColumnGap={10} gridRowGap={10}>
        {tasks.map((task, index) => (
          <TaskCard task={task} key={index} />
        ))}
      </Grid>
    </Flex>
  );
};
