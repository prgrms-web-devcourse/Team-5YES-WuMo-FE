import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { MdMoreVert } from 'react-icons/md';

import { menuListEventProps } from '@/types/moreMenu';

const MoreMenu = ({ editEvent, removeEvent }: menuListEventProps) => {
  return (
    <Menu>
      <MenuButton>
        <MdMoreVert />
      </MenuButton>
      <MenuList pos='absolute' right='-8' minW='160px' zIndex='30'>
        <MenuItem
          fontSize='lg'
          onClick={editEvent}
          _focus={{ backgroundColor: 'none' }}
          _hover={{ backgroundColor: 'gray.100' }}>
          수정하기
        </MenuItem>
        <MenuItem
          fontSize='lg'
          color='red'
          onClick={removeEvent}
          _hover={{ backgroundColor: 'gray.100' }}>
          삭제하기
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MoreMenu;
