import { Flex, Grid, GridItem, Image } from '@chakra-ui/react';

import { getGitEmoji } from '@/utils/constants/emoji';
import { categoryInfo, selectedCategoryStyle } from '@/utils/constants/place';

type CategoryGridProps = {
  value: string;
  setValueHandler: (name: string) => void;
};

const CategoryGrid = ({ value, setValueHandler }: CategoryGridProps) => {
  return (
    <Grid templateColumns='repeat(3, 1fr)' templateRows='repeat(3, 1fr)' gap='3'>
      {Object.entries(categoryInfo).map(
        ([name, information]) =>
          'text' in information &&
          'imageID' in information && (
            <GridItem
              key={information.imageID}
              cursor='pointer'
              borderRadius='2xl'
              paddingTop='3.5'
              paddingBottom='3.5'
              backgroundColor='gray.50'
              _hover={{ backgroundColor: 'gray.100', fontWeight: 'bold' }}
              onClick={() => setValueHandler(name)}
              {...(value === name && selectedCategoryStyle)}>
              <Flex direction='column' align='center' justify='center' gap='4'>
                <Image
                  src={getGitEmoji(information.imageID)}
                  alt={information.text}
                  width='2rem'
                />
                {information.text}
              </Flex>
            </GridItem>
          )
      )}
    </Grid>
  );
};

export default CategoryGrid;
