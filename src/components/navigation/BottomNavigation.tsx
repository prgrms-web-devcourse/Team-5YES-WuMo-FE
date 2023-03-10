import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { NAVIGATION_ITEM } from '@/utils/constants/navigationItem';

const BottomNavigation = () => {
  const { pathname } = useLocation();
  return (
    <>
      <Navigation maxW='maxWidth.mobile' bg='white' zIndex='50'>
        <Flex justify='space-between'>
          {NAVIGATION_ITEM.map((item) => (
            <Link to={item.link} key={item.id}>
              <GridItem display='flex' alignItems='center' flexDirection='column' gap='2'>
                <Box>
                  {pathname === item.link ? (
                    <item.activeIcon style={{ width: '1.75rem', height: '1.75rem' }} />
                  ) : (
                    <item.icon style={{ width: '1.75rem', height: '1.75rem' }} />
                  )}
                </Box>
                <Text fontSize='sm'>{item.name}</Text>
              </GridItem>
            </Link>
          ))}
        </Flex>
      </Navigation>
      <Box mb='5.625rem'>
        <Outlet />
      </Box>
    </>
  );
};

export const Navigation = styled(Grid)`
  position: fixed;
  width: 100%;
  bottom: 0;
  padding: 1rem;
  border-top: 0.0625rem solid #e8e8e8;
`;

export default BottomNavigation;
