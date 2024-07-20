import { Grid } from '@chakra-ui/react';
import * as Model from '../models';

interface IStatsCardProps {
  tasks: Model.Task[];
}

export const StatsCard = (props: IStatsCardProps): JSX.Element => {
  const { tasks } = props;
  return (
    <Grid bg='cardBackground' w='95%' m='0 auto' borderWidth={2} borderColor='button' borderRadius='md'>
      {tasks.length}
    </Grid>
  );
};
