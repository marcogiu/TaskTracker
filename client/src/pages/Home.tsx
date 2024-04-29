import { Flex, Box, Heading, Text, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import hero from "../assets/heroImg.png"; // Ensure the path is correct

const MotionFlex = motion(Flex);
const MotionBox = motion(Box);

export const Home = (): JSX.Element => {
  const boxVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2,
      },
    },
  };

  return (
    <MotionFlex direction="row" alignItems="center" justifyContent="center" borderWidth={4} borderColor="red" h="90vh">
      <MotionFlex direction="row" gap={10} width="75%" boxShadow="lg">
        <Image src={hero} alt="Hero Image" boxSize={500} objectFit="cover" borderRadius="lg" />
        <MotionBox>
          <Heading as="h1" size="2xl" color="teal.600" mb={4}>
            Task Tracker
          </Heading>
          <Text fontSize="xl" color="gray.600">
            Gestisci i tuoi compiti efficacemente e migliora la tua produttività con Task Tracker.
          </Text>
          <Text fontSize="lg" color="gray.500" mt={3}>
            Unisciti a migliaia di utenti che utilizzano Task Tracker per rimanere organizzati e focalizzati.
          </Text>
          <Text fontSize="md" color="gray.500" mt={2}>
            Esplora le funzionalità, personalizza il tuo ambiente di lavoro, e raggiungi i tuoi obiettivi!
          </Text>
        </MotionBox>
      </MotionFlex>
    </MotionFlex>
  );
};

//  <MotionBox
//    height="90vh"
//    align="center"
//    justify="center"
//    // overflow="hidden"
//    direction={["column", "row"]} // Responsive: stack on small screens, row on others
//    p={5}
//    border="2px"
//    borderColor="gray.200"
//    borderRadius="lg"
//    boxShadow="xl"
//  >
//    <MotionBox
//      flex={["none", "1"]}
//      width={["100%", "50%"]}
//      display="flex"
//      justifyContent="center"
//      alignItems="center"
//      mb={[5, 0]} // Margin bottom on mobile only
//      overflow="hidden"
//      borderRadius="lg"
//    >
//      <Image src={hero} alt="Hero Image" boxSize="full" objectFit="cover" />
//    </MotionBox>
//    <MotionBox
//      flex="1"
//      p={8}
//      bg="white"
//      opacity="0.95"
//      borderRadius="lg"
//      shadow="2xl"
//      initial="hidden"
//      animate="visible"
//      variants={boxVariants}
//      ml={[0, 5]} // Margin left on non-mobile views
//    >
//      <Heading as="h1" size="2xl" color="teal.600" mb={4}>
//        Task Tracker
//      </Heading>
//      <Text fontSize="xl" color="gray.600">
//        Gestisci i tuoi compiti efficacemente e migliora la tua produttività con Task Tracker.
//      </Text>
//      <Text fontSize="lg" color="gray.500" mt={3}>
//        Unisciti a migliaia di utenti che utilizzano Task Tracker per rimanere organizzati e focalizzati.
//      </Text>
//      <Text fontSize="md" color="gray.500" mt={2}>
//        Esplora le funzionalità, personalizza il tuo ambiente di lavoro, e raggiungi i tuoi obiettivi!
//      </Text>
//    </MotionBox>
//  </MotionBox>;
