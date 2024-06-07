// src/components/CustomCalendar.tsx
import { useState } from 'react';
import { Box, Grid, Text, IconButton, Button } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import dayjs from 'dayjs';

export const Calendar = (): JSX.Element => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [view, setView] = useState<'monthly' | 'daily'>('monthly');

  const startOfMonth = currentDate.startOf('month').day();
  const daysInMonth = currentDate.daysInMonth();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  const handlePrevDay = () => {
    setCurrentDate(currentDate.subtract(1, 'day'));
  };

  const handleNextDay = () => {
    setCurrentDate(currentDate.add(1, 'day'));
  };

  const toggleView = () => {
    setView(view === 'monthly' ? 'daily' : 'monthly');
  };

  return (
    <Box>
      <Button onClick={toggleView} mb={4}>
        Switch to {view === 'monthly' ? 'Daily' : 'Monthly'} View
      </Button>
      {view === 'monthly' ? (
        <>
          <Grid templateColumns='repeat(7, 1fr)' gap={1} textAlign='center'>
            <IconButton aria-label='Previous month' icon={<ChevronLeftIcon />} onClick={handlePrevMonth} />
            <Text fontSize='lg' fontWeight='bold' gridColumn='span 5'>
              {currentDate.format('MMMM YYYY')}
            </Text>
            <IconButton aria-label='Next month' icon={<ChevronRightIcon />} onClick={handleNextMonth} />
          </Grid>
          <Grid templateColumns='repeat(7, 1fr)' gap={1} mt={2} textAlign='center'>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <Text key={day} fontWeight='bold'>
                {day}
              </Text>
            ))}
          </Grid>
          <Grid templateColumns='repeat(7, 1fr)' gap={1} mt={2}>
            {Array.from({ length: startOfMonth }).map((_, i) => (
              <Box key={i} />
            ))}
            {days.map((day) => (
              <Box key={day} border='1px solid' textAlign='center' borderColor='gray.200' borderRadius='md' p={2} _hover={{ bg: 'gray.100', cursor: 'pointer' }}>
                {day}
              </Box>
            ))}
          </Grid>
        </>
      ) : (
        <>
          <Grid templateColumns='repeat(3, 1fr)' gap={1} textAlign='center'>
            <IconButton aria-label='Previous day' icon={<ChevronLeftIcon />} onClick={handlePrevDay} />
            <Text fontSize='lg' fontWeight='bold'>
              {currentDate.format('DD MMMM YYYY')}
            </Text>
            <IconButton aria-label='Next day' icon={<ChevronRightIcon />} onClick={handleNextDay} />
          </Grid>
          <Box mt={4} border='1px solid' textAlign='center' borderColor='gray.200' borderRadius='md' p={4}>
            <Text fontSize='2xl'>{currentDate.format('dddd')}</Text>
          </Box>
        </>
      )}
    </Box>
  );
};
