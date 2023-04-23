import {
  Button,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useRecoilState, useResetRecoilState } from 'recoil';

import { recoilBestRouteListParams } from '@/store/recoilRouteListState';
import { BestRouteListParamsType } from '@/types/routeList';
import { Search } from '@/types/search';
import { BACKNAVIGATION_OPTIONS } from '@/utils/constants/navigationItem';

const SearchInput = () => {
  const { SEARCH } = BACKNAVIGATION_OPTIONS;
  const [sortType, setSortType] = useState('최신순');

  const [bestRouteParams, setBestRouteParams] = useRecoilState<BestRouteListParamsType>(
    recoilBestRouteListParams
  );

  const resetSearchParams = useResetRecoilState(recoilBestRouteListParams);

  const { register, getValues, handleSubmit, resetField } = useForm<Search>({
    defaultValues: {
      searchWord: '',
    },
  });

  const onSubmitSearch = () => {
    const searchWord = getValues('searchWord');
    setBestRouteParams({
      ...bestRouteParams,
      searchWord,
    });
  };

  const onClickResetSearchWord = () => {
    resetSearchParams();
    resetField('searchWord');
  };

  const onClickHandleSortType = (sortType: string) => {
    if (sortType === 'NEWEST') setSortType('최신순');
    else setSortType('좋아요순');
    setBestRouteParams({
      ...bestRouteParams,
      sortType,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitSearch)}>
      {bestRouteParams.searchWord && (
        <Flex bg='white' alignItems='center' justify='space-between' mx='0.5rem'>
          <Text>
            <strong>&quot;{bestRouteParams.searchWord}&quot;</strong>의 검색결과
          </Text>
          <Button fontSize='0.8rem' p='2' onClick={onClickResetSearchWord}>
            검색 초기화
          </Button>
        </Flex>
      )}
      <Flex gap='0.5rem' py='1rem' bg='white' justifyContent='space-between'>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<MdKeyboardArrowDown />}
            fontSize='0.75rem'
            padding='0.5rem'>
            {sortType}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => onClickHandleSortType('NEWEST')}>최신순</MenuItem>
            <MenuItem onClick={() => onClickHandleSortType('LIKES')}>좋아요순</MenuItem>
          </MenuList>
        </Menu>
        <Input
          placeholder='지역명 검색 ex) 서울, 경기, 인천'
          w='70%'
          fontSize='0.875rem'
          padding='0.5rem'
          {...register('searchWord')}
        />
        <Button fontSize='0.875rem' onClick={onSubmitSearch}>
          {SEARCH}
        </Button>
      </Flex>
    </form>
  );
};

export default SearchInput;
