import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast, Flex, Box, FormControl, FormLabel, Input, Button, Heading, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useLoginMutation } from "../store/userSlice";

export const Login = (): JSX.Element => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [show, setShow] = useState<boolean>(false);

  const navigate = useNavigate();
  const toast = useToast();
  const [login, { isLoading }] = useLoginMutation();

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
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "data" in error) {
        const fetchError = error as { data?: { message?: string } };
        toast({
          title: "Login Failed",
          description: fetchError.data?.message || "Login failed. Please check your credentials.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "Unexpected Error",
          description: "An unexpected error occurred.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };

  const toggleShow = () => setShow(!show);

  return (
    <Flex align="center" justify="center" height="80vh">
      <Box width="full" maxW="md" p={8} borderRadius={8}>
        <Heading as="h2" size="xl" textAlign="center" mb={6}>
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="email" isRequired mb={4}>
            <FormLabel>Email</FormLabel>
            <Input name="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
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
              />
              <InputRightElement>
                <IconButton
                  aria-label={show ? "Hide password" : "Show password"}
                  icon={show ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={toggleShow}
                  size="sm"
                  variant="unstyled"
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button colorScheme="teal" width="full" type="submit" isLoading={isLoading} loadingText="Logging In...">
            Login
          </Button>
        </form>
      </Box>
    </Flex>
  );
};
