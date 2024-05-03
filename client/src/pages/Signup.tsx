import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast, Flex, Box, FormControl, FormLabel, Input, Button, Heading, InputGroup, InputRightElement, IconButton, useColorModeValue } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { useRegisterMutation } from "../store/userSlice";
import { User } from "../models";
import { v4 as uuidv4 } from "uuid";

const MotionBox = motion(Box);

export const Signup = (): JSX.Element => {
  const [formData, setFormData] = useState<User>({
    id: uuidv4(),
    username: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassoword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const toast = useToast();
  const [register, { isLoading }] = useRegisterMutation();
  const bg = useColorModeValue("white", "gray.700");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      await register(formData).unwrap();
      toast({
        title: "Registration Successful",
        description: "You have successfully registered.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      navigate("/dashboard");
    } catch (error) {
      const regError = error as Error<{message: string}>;
      toast({
        title: "Registration Failed",
        description: regError.data?.message || "Registration failed. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Flex align="center" justify="center" minHeight="90vh" bg={bg}>
      <MotionBox width="full" maxW="md" p={8} borderRadius="lg" boxShadow="dark-lg" bg="white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Heading as="h2" size="xl" textAlign="center" mb={6} color="teal.600">
          Registration
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="username" isRequired mb={4}>
            <FormLabel>Username</FormLabel>
            <Input name="username" type="text" placeholder="Username" value={formData.username} onChange={handleChange} />
          </FormControl>
          <FormControl id="email" isRequired mb={4}>
            <FormLabel>Email</FormLabel>
            <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          </FormControl>
          <FormControl id="password" isRequired mb={4}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input name="password" type={showPassword ? "text" : "password"} placeholder="Password" value={formData.password} onChange={handleChange} />
              <InputRightElement>
                <IconButton
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  size="sm"
                  variant="unstyled"
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id="confirmPassword" isRequired mb={6}>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <Input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassoword(e.target.value)} />
              <InputRightElement>
                <IconButton
                  icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  size="sm"
                  variant="unstyled"
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button colorScheme="teal" width="full" type="submit" isLoading={isLoading} loadingText="Registering..." _hover={{ transform: "scale(1.05)" }} _active={{ transform: "scale(0.95)" }}>
            Register
          </Button>
        </form>
      </MotionBox>
    </Flex>
  );
};
