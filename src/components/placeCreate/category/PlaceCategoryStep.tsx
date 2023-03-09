import { Flex, Grid, GridItem, Image } from '@chakra-ui/react';
import { useState } from 'react';

import { getGitEmoji } from '@/utils/constants/emoji';
import { categoryInfo, selectedCategoryStyle } from '@/utils/constants/place';

const PlaceCategoryStep = () => {
  const [value, setValue] = useState('');

  return (
    <Grid templateColumns='repeat(3, 1fr)' templateRows='repeat(3, 1fr)' gap='3'>
      {Object.entries(categoryInfo).map(
        ([name, info]) =>
          'text' in info &&
          'imageID' in info && (
            <GridItem
              key={info.imageID}
              cursor='pointer'
              borderRadius='2xl'
              paddingTop='3.5'
              paddingBottom='3.5'
              backgroundColor='gray.50'
              _hover={{ backgroundColor: 'gray.100', fontWeight: 'bold' }}
              onClick={() => setValue(name)}
              {...(value === name && selectedCategoryStyle)}>
              <Flex direction='column' align='center' justify='center' gap='4'>
                <Image src={getGitEmoji(info.imageID)} alt={info.text} width='2rem' />
                {info.text}
              </Flex>
            </GridItem>
          )
      )}
    </Grid>
  );
};

export default PlaceCategoryStep;
