import { Flex, Grid, GridItem, Image } from '@chakra-ui/react';
import { useState } from 'react';

import {
  categoryList,
  getImageURL,
  selectedCategoryStyle,
} from '@/utils/constants/place';

const PlaceCategoryStep = () => {
  const [value, setValue] = useState('');

  return (
    <Grid templateColumns='repeat(3, 1fr)' templateRows='repeat(3, 1fr)' gap='3'>
      {Object.entries(categoryList).map(([name, { text, imageID }]) => (
        <GridItem
          key={imageID}
          cursor='pointer'
          borderRadius='2xl'
          paddingTop='3.5'
          paddingBottom='3.5'
          backgroundColor='gray.50'
          _hover={{ backgroundColor: 'gray.100', fontWeight: 'bold' }}
          onClick={() => setValue(name)}
          {...(value === name && selectedCategoryStyle)}>
          <Flex direction='column' align='center' justify='center' gap='4'>
            <Image src={getImageURL(imageID)} alt={text} width='2rem' />
            {text}
          </Flex>
        </GridItem>
      ))}
    </Grid>
  );
};

export default PlaceCategoryStep;
