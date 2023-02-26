import { Flex, Grid, GridItem, Image } from '@chakra-ui/react';
import { useState } from 'react';

import { categoryList } from '@/src/utils/constants/place';

const PlaceCategoryStep = () => {
  const [value, setValue] = useState('');

  return (
    <Grid templateColumns='repeat(3, 1fr)' templateRows='repeat(3, 1fr)' gap='3'>
      {categoryList.map(({ name, text, imageUrl }) => (
        <GridItem
          key={name}
          cursor='pointer'
          borderRadius='2xl'
          paddingTop='3.5'
          paddingBottom='3.5'
          fontWeight={value === text ? 'bold' : 'initial'}
          backgroundColor={value === text ? 'gray.100' : 'gray.50'}
          _hover={{ backgroundColor: 'gray.100', fontWeight: 'bold' }}
          onClick={() => setValue(text)}>
          <Flex direction='column' align='center' justify='center' gap='4'>
            <Image src={imageUrl} alt={text} width='2rem' />
            {text}
          </Flex>
        </GridItem>
      ))}
    </Grid>
  );
};

export default PlaceCategoryStep;
