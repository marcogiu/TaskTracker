import { Flex, Grid } from '@chakra-ui/react';
import { TaskCard } from './TaskCard';
import * as Model from '../models';
import { motion } from 'framer-motion';

interface ITaskSectionProps {
  tasks: Model.Task[];
}

export const TaskSection = (props: ITaskSectionProps): JSX.Element => {
  const { tasks } = props;
  return (
    <Flex as={motion.div} w='100%' h='100%' ml='1%' borderWidth={2} borderColor='button' borderRadius='md' bgColor='cardBackground' p={5}>
      <Grid templateColumns='1fr' gridColumnGap={10} gridRowGap={10} w='100%'>
        {tasks.map((task, index) => (
          <TaskCard task={task} key={index} />
        ))}
      </Grid>
    </Flex>
  );
};
