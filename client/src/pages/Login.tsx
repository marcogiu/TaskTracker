import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast, Flex, Box, FormControl, FormLabel, Input, Button, Heading, InputGroup, InputRightElement, IconButton, useColorModeValue } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { useLoginMutation } from "../store/userSlice";

const MotionBox = motion(Box);

export const Login = (): JSX.Element => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [show, setShow] = useState<boolean>(false);

  const navigate = useNavigate();
  const toast = useToast();
  const [login, { isLoading }] = useLoginMutation();

  const bg = useColorModeValue("white", "gray.700");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      await login(formData).unwrap();
      toast({
        title: "Login Successful",
        description: "You have successfully logged in.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Login failed. Please check your credentials.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const toggleShow = () => setShow(!show);

  const inputVariants = {
    hover: { scale: 1.02 },
    focus: { borderColor: "teal.300", boxShadow: "0 0 0 1px #319795" },
  };

  return (
    <Flex align="center" justify="center" height="90vh" bg={bg}>
      <MotionBox width="full" maxW="md" p={8} borderRadius={8} bg="white" boxShadow="xl">
        <Heading as="h2" size="xl" textAlign="center" mb={6} color="teal.600">
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="email" isRequired mb={4}>
            <FormLabel>Email</FormLabel>
            <Input name="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} variants={inputVariants} whileHover="hover" whileFocus="focus" />
          </FormControl>
          <FormControl id="password" isRequired mb={6}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                name="password"
                type={show ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                variants={inputVariants}
                whileHover="hover"
                whileFocus="focus"
              />
              <InputRightElement>
                <IconButton aria-label={show ? "Hide password" : "Show password"} icon={show ? <ViewOffIcon /> : <ViewIcon />} onClick={toggleShow} size="sm" variant="ghost" />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button colorScheme="teal" width="full" type="submit" isLoading={isLoading} loadingText="Logging In..." _hover={{ transform: "scale(1.05)" }} _active={{ transform: "scale(0.95)" }}>
            Login
          </Button>
        </form>
      </MotionBox>
    </Flex>
  );
};
