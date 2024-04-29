import { Flex, Heading, Text, Image, useBreakpointValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import hero from "../assets/heroImg.png";

const MotionFlex = motion(Flex);

// Animation variants defined outside the component
const mainCardVariants = {
  hidden: { opacity: 0, x: 1000 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 400, damping: 100, delay: 0.5 },
  },
};

export const Home = (): JSX.Element => {
  // Responsive design adjustments
  const imageBoxSize = useBreakpointValue({ base: "300px", md: "500px" });

  return (
    <MotionFlex direction={{ base: "row", xs: "column" }} alignItems="center" justifyContent="center" h="90vh" overflow="hidden">
      <MotionFlex
        gap={5}
        width={["95%", "70%"]} // Responsive width
        borderRadius="lg"
        variants={mainCardVariants}
        initial="hidden"
        animate="visible"
      >
        <Image src={hero} alt="Hero Image" boxSize={imageBoxSize} objectFit="cover" borderRadius="lg" onError={(e) => (e.currentTarget.src = "path_to_fallback_image.png")} />
        <MotionFlex direction="column" justifyContent="center">
          <Heading as="h1" size="2xl" color="teal.600" mb={4}>
            Task Tracker
          </Heading>
          <Text fontSize="xl" color="teal.900">
            Gestisci i tuoi compiti efficacemente e migliora la tua produttività con Task Tracker.
          </Text>
          <Text fontSize="md" color="teal.800" mt={3}>
            Unisciti a migliaia di utenti che utilizzano Task Tracker per rimanere organizzati e focalizzati.
          </Text>
          <Text fontSize="small" color="teal.700" mt={2}>
            Esplora le funzionalità, personalizza il tuo ambiente di lavoro, e raggiungi i tuoi obiettivi!
          </Text>
        </MotionFlex>
      </MotionFlex>
    </MotionFlex>
  );
};
