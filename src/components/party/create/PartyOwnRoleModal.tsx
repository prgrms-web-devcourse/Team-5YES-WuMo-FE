import {
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { createPartyState } from '@/store/recoilPartyState';
import { PartyCreateBody } from '@/types/party';
import { partyCategoryList } from '@/utils/constants/party';
import { getImageURL } from '@/utils/constants/place';

const PartyOwnRoleModal = () => {
  const selected = {
    color: 'primary.red',
    fontWeight: 'bold',
    backgroundColor: 'gray.100',
    boxShadow: '0 0 0 2px #ea5148 inset',
  };
  const createPartyBody = useRecoilValue<PartyCreateBody>(createPartyState);
  const [body, setBody] = useState(() => createPartyBody);
  const [value, setValue] = useState('');

  const onClickRole = (text: string) => {
    setValue(text);
    setBody({
      ...createPartyBody,
      memberId: 1,
      password: '1234',
      role: text,
    });
  };

  const onClickNextStep = async () => {
    console.log(body);
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
                <Image src={getImageURL(imageID)} alt={text} width='2rem' />
                {text}
              </Flex>
            </GridItem>
          ))}
        </Grid>
      </ModalBody>
      <ModalFooter>
        <Button
          bg='primary.red'
          color='#ffffff'
          _hover={{
            bg: 'primary.redHover',
          }}
          w='full'
          onClick={onClickNextStep}>
          파티 생성
        </Button>
      </ModalFooter>
    </>
  );
};
export default PartyOwnRoleModal;