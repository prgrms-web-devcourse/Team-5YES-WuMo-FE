import { BiError } from 'react-icons/bi';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { MdCheck, MdOutlineErrorOutline } from 'react-icons/md';

export const toastType = {
  error: {
    backgroundColor: '#fa5252',
    fontColor: 'white',
    titleColor: 'white',
    iconColor: 'white',
    icon: <MdOutlineErrorOutline />,
  },

  success: {
    backgroundColor: '#40c057',
    fontColor: 'white',
    titleColor: 'white',
    iconColor: 'white',
    icon: <MdCheck />,
  },

  warning: {
    backgroundColor: '#fab005',
    fontColor: 'white',
    titleColor: 'white',
    iconColor: 'white',
    icon: <BiError />,
  },

  info: {
    backgroundColor: '#1c7ed6',
    fontColor: 'white',
    titleColor: 'white',
    iconColor: 'white',
    icon: <IoMdInformationCircleOutline />,
  },
};
