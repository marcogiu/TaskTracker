import { Box, Text } from "@chakra-ui/react";
import * as Model from "../models";

interface ITaskCardProps {
  tasks: Model.Task[];
}

export const TaskCard = (props: ITaskCardProps): JSX.Element => {
  const { tasks } = props;
  return (
    <>
      {tasks.map((task, index) => (
        <Box key={index} p={6} shadow="md" borderWidth="1px" rounded="md">
          <Text fontSize="xl" fontWeight="semibold">
            {task.title}
          </Text>
          <Text mt={2}>{task.description}</Text>
        </Box>
      ))}
    </>
  );
};
