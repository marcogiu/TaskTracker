import { SearchIcon, AddIcon } from '@chakra-ui/icons';
import { Flex, Button, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';

export const Summary = (): JSX.Element => {
  const handleSearch = () => {
    console.log('Search triggered');
  };

  const handleClickCreateTask = () => {
    console.log('Search triggered');
  };

  return (
    <Flex as='nav' pos='fixed' alignItems='center' justifyContent='center' top='0' h='10vh' w='85%' left='15%' color='white' zIndex='overlay'>
      <Flex
        h='8vh'
        w='98%'
        bg='cardBackground'
        alignItems='center'
        justifyContent='space-between'
        boxShadow='md'
        zIndex='10'
        borderRadius='10px'
        border='2px solid'
        borderColor='button'
        px={5}
      >
        <InputGroup w='30%'>
          <InputLeftElement pointerEvents='none'>
            <SearchIcon color='button' />
          </InputLeftElement>
          <Input
            type='text'
            placeholder='Search task'
            color='buttonText'
            borderColor='button'
            _hover={{ bgColor: 'cardBackground', color: 'buttonText' }}
            _focus={{ color: 'buttonText', bgColor: 'cardBackground', borderColor: 'button', borderWidth: 2 }}
          />
          <Button
            onClick={handleSearch}
            bgColor='button'
            color='cardBackground'
            borderWidth={2}
            borderColor='button'
            ml={2}
            _hover={{ bgColor: 'background', color: 'buttonText' }}
            _active={{ bgColor: 'teal.700', color: 'cardBackground', borderColor: 'cardBackground' }}
          >
            Search
          </Button>
        </InputGroup>
        <Button
          leftIcon={<AddIcon />}
          onClick={handleClickCreateTask}
          bgColor='button'
          color='cardBackground'
          borderWidth={2}
          borderColor='button'
          _hover={{ bgColor: 'background', color: 'buttonText' }}
          _active={{ bgColor: 'teal.700', color: 'cardBackground', borderColor: 'cardBackground' }}
          gap={2}
        >
          Create New Task
        </Button>
      </Flex>
    </Flex>
  );
};
