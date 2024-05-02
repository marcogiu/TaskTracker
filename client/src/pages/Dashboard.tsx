import { useEffect, useState } from "react";
import { VStack, Text, Grid, Flex } from "@chakra-ui/react";
import { FormNewTask, TaskCard } from "../components";
import * as Model from "../models";
import * as Utilities from "../utils/Utilities";
import data from "../../dataTest.json"; // I dati sono già importati qui

export const Dashboard = () => {
  const [tasks, setTasks] = useState<Model.Task[]>([]);

  const addTask = (task: Model.Task) => {
    setTasks([...tasks, task]);
  };

  console.log(tasks);

  useEffect(() => {
    const tasksWithDates = data.tasks.map((task) => ({
      ...task,
      dueDate: task.dueDate ? new Date(task.dueDate) : null,
      createdAt: new Date(task.createdAt),
      updatedAt: task.updatedAt ? new Date(task.updatedAt) : null,
      size: Utilities.getTaskSize(task.size),
      status: Utilities.getTaskStatus(task.status),
      priority: Utilities.getTaskPriority(task.priority),
    }));
    setTasks(tasksWithDates);
  }, []);

  return (
    <VStack spacing={4} align="stretch" w="90%" margin="auto">
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="2xl" fontWeight="bold" color="teal.700">
          Your Tasks
        </Text>
        <FormNewTask onAddTask={addTask} />
      </Flex>
      <Grid templateColumns="repeat(10, 1fr)" gap={6}>
        {tasks.map((task, index) => (
          <TaskCard task={task} key={index} />
        ))}
      </Grid>
    </VStack>
  );
};
