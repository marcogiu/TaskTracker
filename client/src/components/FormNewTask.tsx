import { useState, FormEvent, ChangeEvent } from "react";
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Select, useDisclosure, Stack } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Model from "../models";
import * as Constants from "../utils/Constants";

interface IFormNewTaskProps {
  onAddTask: (task: Model.Task) => void;
}

export const FormNewTask = ({ onAddTask }: IFormNewTaskProps): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [task, setTask] = useState<Model.Task>(Constants.EmptyTask);

  console.log(task);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date, field: string) => {
    setTask((prev) => ({ ...prev, [field]: date }));
  };

  const handleCreateTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddTask(task);
    setTask(Constants.EmptyTask); // Reset task after submission
    onClose(); // Close modal
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal">
        Create New Task
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Task</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleCreateTask}>
            <ModalBody>
              <Stack spacing={3}>
                <FormControl isRequired>
                  <FormLabel>Title</FormLabel>
                  <Input name="title" value={task.title} onChange={handleChange} placeholder="Enter task title" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Description</FormLabel>
                  <Input name="description" value={task.description} onChange={handleChange} placeholder="Enter task description" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>User ID</FormLabel>
                  <Input name="userId" value={task.userId} onChange={handleChange} placeholder="Enter user ID" />
                </FormControl>
                <FormControl>
                  <FormLabel>Image URL</FormLabel>
                  <Input name="imageUrl" value={task.imageUrl || ""} onChange={handleChange} placeholder="Enter image URL" />
                </FormControl>
                <FormControl>
                  <FormLabel>Due Date</FormLabel>
                  <DatePicker showIcon selected={task.dueDate ? new Date(task.dueDate) : null} onChange={(date: Date) => handleDateChange(date, "dueDate")} className="chakra-input css-1m5ycgz" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Priority</FormLabel>
                  <Select name="priority" value={task.priority} onChange={handleChange}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Status</FormLabel>
                  <Select name="status" value={task.status} onChange={handleChange}>
                    <option value="pending">Pending</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Size</FormLabel>
                  <Select name="size" value={task.size} onChange={handleChange}>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </Select>
                </FormControl>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
