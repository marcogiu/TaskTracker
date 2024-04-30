import { useState } from "react";
import { VStack, Text, Grid, Flex } from "@chakra-ui/react";
import { FormNewTask, TaskCard } from "../components";
import { Task } from "../models";

export const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  return (
    <VStack spacing={4} align="stretch" p={4}>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="2xl" fontWeight="bold">
          Your Tasks
        </Text>
        <FormNewTask onAddTask={addTask} />
      </Flex>
      <Grid templateColumns="repeat(auto-fill, minmax(240px, 1fr))" gap={6}>
        <TaskCard tasks={tasks} />
      </Grid>
    </VStack>
  );
};
