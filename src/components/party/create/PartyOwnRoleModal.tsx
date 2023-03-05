import { Flex, Grid, GridItem, Image, ModalBody, ModalFooter } from '@chakra-ui/react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import ModalButton from '@/components/base/ModalButton';
import { createPartyState } from '@/store/recoilPartyState';
import { PartyCreateBody } from '@/types/party';
import { partyCategoryList } from '@/utils/constants/party';
import { getCategoryImageURL } from '@/utils/constants/place';

const PartyOwnRoleModal = () => {
  const selected = {
    color: 'primary.red',
    fontWeight: 'bold',
    backgroundColor: 'gray.100',
    boxShadow: '0 0 0 2px #ea5148 inset',
  };
  const createPartyBody = useRecoilValue<PartyCreateBody>(createPartyState);
  const [apiBody, setApiBody] = useState(() => createPartyBody);
  const [value, setValue] = useState('');

  const onClickRole = (text: string) => {
    setValue(text);
    setApiBody({
      ...createPartyBody,
      password: '1234',
      role: text,
    });
  };

  const handleCreateParty = async () => {
    console.log(apiBody);
  };

  return (
    <>
      <ModalBody>
        <Grid templateColumns='repeat(3, 1fr)' templateRows='repeat(3, 1fr)' gap='3'>
          {partyCategoryList.map(({ text, imageID }) => (
            <GridItem
              key={imageID}
              cursor='pointer'
              borderRadius='2xl'
              paddingTop='3.5'
              paddingBottom='3.5'
              backgroundColor='gray.50'
              _hover={{
                backgroundColor: 'gray.100',
                fontWeight: 'bold',
              }}
              onClick={() => onClickRole(text)}
              {...(value === text && selected)}>
              <Flex direction='column' align='center' justify='center' gap='4'>
                <Image src={getCategoryImageURL(imageID)} alt={text} width='2rem' />
                {text}
              </Flex>
            </GridItem>
          ))}
        </Grid>
      </ModalBody>
      <ModalFooter>
        <ModalButton text='파티 생성' clickButtonHandler={handleCreateParty} />
      </ModalFooter>
    </>
  );
};
export default PartyOwnRoleModal;
