import { Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import * as Model from '../models';

interface ITaskCardProps {
  task: Model.Task;
  key: number;
}

const MotionBox = motion(Box);

export const TaskCard = (props: ITaskCardProps): JSX.Element => {
  const { task } = props;

  return (
    <MotionBox
      h={100}
      w={200}
      shadow='md'
      borderWidth='1px'
      borderRadius='md'
      // initial={{ opacity: 0, scale: 0.95 }}
      // animate={{ opacity: 1, scale: 1 }}
      // transition={{ duration: 0.5 }}
      // whileHover={{ scale: 1.5, boxShadow: 'lg' }}
    >
      <Text fontSize='20px' fontWeight='semibold'>
        {task.title}
      </Text>
    </MotionBox>
  );
};
