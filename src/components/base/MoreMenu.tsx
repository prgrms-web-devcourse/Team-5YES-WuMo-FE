import { Flex, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { MdMoreVert } from 'react-icons/md';

import { MoreMenuListEventProps } from '@/types/moreMenu';

const MoreMenu = ({ onEditEvent, onRemoveEvent }: MoreMenuListEventProps) => {
  return (
    <Menu>
      <MenuButton as={Flex} alignContent='center'>
        <MdMoreVert />
      </MenuButton>
      <MenuList pos='absolute' right='-16' minW='160px' zIndex='30'>
        <MenuItem
          css={css`
            direction: ltr;
          `}
          fontSize='lg'
          onClick={onEditEvent}
          _focus={{ backgroundColor: 'none' }}
          _hover={{ backgroundColor: 'gray.100' }}>
          수정하기
        </MenuItem>
        <MenuItem
          css={css`
            direction: ltr;
          `}
          fontSize='lg'
          color='red'
          onClick={onRemoveEvent}
          _hover={{ backgroundColor: 'gray.100' }}>
          삭제하기
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MoreMenu;
