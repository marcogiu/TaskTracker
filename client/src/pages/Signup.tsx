import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast, Flex, Box, FormControl, FormLabel, Input, Button, Heading, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRegisterMutation } from "../store/userSlice";
import { User } from "../store/types";
import { v4 as uuidv4 } from "uuid";

export const Signup = (): JSX.Element => {
  const [formData, setFormData] = useState<User>({
    id: uuidv4(),
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const navigate = useNavigate();
  const toast = useToast();
  const [register, { isLoading }] = useRegisterMutation();
  const [confirmPass, setConfirmPass] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== confirmPass) {
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
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "data" in error) {
        const fetchError = error as { data?: { message?: string } };
        toast({
          title: "Registration Failed",
          description: fetchError.data?.message || "Registration failed. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "Unexpected Error",
          description: "An unexpected error occurred. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };

  return (
    <Flex align="center" justify="center" minHeight="80vh">
      <Box width="full" maxW="md" p={8} borderWidth={1} borderRadius="lg" boxShadow="lg" bg="white">
        <Heading as="h2" size="xl" textAlign="center" mb={6}>
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
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
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
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
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
          <Button colorScheme="blue" width="full" type="submit" isLoading={isLoading} loadingText="Registering...">
            Register
          </Button>
        </form>
      </Box>
    </Flex>
  );
};
