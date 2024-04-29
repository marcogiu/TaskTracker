import { Outlet } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";
import { Navbar } from ".";

export const Layout = () => {
  return (
    <Flex direction="column" minHeight="100vh" bg="white">
      <Navbar />
      <Box flex="1">
        <Outlet />
      </Box>
    </Flex>
  );
};
