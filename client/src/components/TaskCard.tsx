import { Box, Text, Image, Stack, Checkbox, Tag } from "@chakra-ui/react";
import { motion } from "framer-motion";
import * as Model from "../models";

interface ITaskCardProps {
  task: Model.Task;
  key: number;
}

const cardStyles: Record<Model.TaskSize, Model.CardStyle> = {
  small: {
    padding: 3,
    textFontSize: "sm",
    tagColorScheme: "green",
    imageBorderRadius: "sm",
  },
  medium: {
    padding: 4,
    textFontSize: "lg",
    tagColorScheme: "blue",
    imageBorderRadius: "md",
  },
  large: {
    padding: 5,
    textFontSize: "xl",
    tagColorScheme: "red",
    imageBorderRadius: "lg",
  },
};

const MotionBox = motion(Box);

export const TaskCard = (props: ITaskCardProps): JSX.Element => {
  const { task } = props;
  const style = cardStyles[task.size] || cardStyles.large;

  return (
    <MotionBox
      p={style.padding}
      h="fit-content"
      shadow="md"
      borderWidth="1px"
      borderRadius="md"
      gridColumn={task.size === "large" ? "span 3" : task.size === "medium" ? "span 2" : "span 1"}
      bgGradient="linear(to-br, teal.400, teal.300, teal.200, teal.100)"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05, boxShadow: "lg" }}
    >
      <Text fontSize={style.textFontSize} fontWeight="bold">
        {task.title}
      </Text>
      <Text mt={2} fontSize={style.textFontSize}>
        {task.description}
      </Text>
      <Text mt={2} color="gray.500" fontSize={style.textFontSize}>
        Due: {task.dueDate?.toLocaleDateString()}
      </Text>
      <Stack direction="row" mt={2}>
        {task.tags?.map((tag, index) => (
          <Tag key={index} colorScheme={style.tagColorScheme} cursor="pointer">
            {tag}
          </Tag>
        ))}
      </Stack>
      {task.imageUrl && <Image src={task.imageUrl} alt="Task image" mt={2} borderRadius={style.imageBorderRadius} />}
      <Stack mt={2}>
        {task.checklist?.map((item, index) => (
          <Checkbox key={index} isChecked={item.isCompleted}>
            {item.text}
          </Checkbox>
        ))}
      </Stack>
    </MotionBox>
  );
};
