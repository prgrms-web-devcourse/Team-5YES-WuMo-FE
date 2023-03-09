import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  ModalBody,
  ModalFooter,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { createParty } from '@/api/party';
import ModalButton from '@/components/base/ModalButton';
import { createPartyState } from '@/store/recoilPartyState';
import { PartyCreateBody } from '@/types/party';
import { getGitEmoji } from '@/utils/constants/emoji';
import { partyRoleList } from '@/utils/constants/party';
import ROUTES from '@/utils/constants/routes';

const PartyOwnRoleModal = () => {
  const selected = {
    color: 'primary.red',
    fontWeight: 'bold',
    backgroundColor: 'gray.100',
    boxShadow: '0 0 0 2px #ea5148 inset',
  };

  const navigate = useNavigate();
  const prevCreatePartyBody = useRecoilValue<PartyCreateBody>(createPartyState);
  const [partyAPIBody, setPartyAPIBody] = useState(() => prevCreatePartyBody);
  const [role, setRole] = useState('');

  const onClickRole = (role: string) => {
    setRole(role);
    setPartyAPIBody({
      ...prevCreatePartyBody,
      role,
    });
  };

  const handleCreateParty = async () => {
    const data = await createParty(partyAPIBody);
    if (data) {
      // 파티 생성 완료 toast 추가예정
      navigate(ROUTES.PARTY_LIST);
    }
  };

  return (
    <>
      <ModalBody>
        <Box mb='8'>
          <Grid templateColumns='repeat(3, 1fr)' templateRows='repeat(3, 1fr)' gap='3'>
            {partyRoleList.map(({ text, imageID }) => (
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
                {...(role === text && selected)}>
                <Flex direction='column' align='center' justify='center' gap='4'>
                  <Image src={getGitEmoji(imageID)} alt={text} width='2rem' />
                  {text}
                </Flex>
              </GridItem>
            ))}
          </Grid>
        </Box>
        <Text fontSize='0.875rem' mb='2' color='#808080'>
          내 역할 설정
        </Text>
        <Input
          p='3'
          size='xl'
          border='0.0625rem solid #cfcfcf'
          focusBorderColor='primary.red'
          borderRadius='8'
          placeholder='직접 입력하기'
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </ModalBody>
      <ModalFooter>
        <ModalButton text='파티 생성' clickButtonHandler={handleCreateParty} />
      </ModalFooter>
    </>
  );
};
export default PartyOwnRoleModal;
