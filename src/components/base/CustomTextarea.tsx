import { Textarea } from '@chakra-ui/react';

const CustomTextarea = () => {
  return (
    <Textarea
      resize='none'
      w='99%'
      border='1px solid lightgray'
      rows={10}
      borderRadius='0.625rem'
    />
  );
};

export default CustomTextarea;
