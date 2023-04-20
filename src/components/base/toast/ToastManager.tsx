import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';

import { CreateToastParams, ToastCreateType, ToastManagerProps } from '@/types/toast';

import ToastItem from './ToastItem';

const Container = styled.div`
  position: fixed;
  top: 16px;
  right: calc(50% - 175px);
  z-index: 1500;
`;

const ToastManager = ({ bind }: ToastManagerProps) => {
  const [toasts, setToasts] = useState<ToastCreateType[]>([]);

  const createToast = useCallback(
    ({
      message,
      duration,
      type,
      backgroundColor,
      icon,
      iconColor,
      fontColor,
      title,
      titleColor,
      authError,
    }: CreateToastParams) => {
      const newToast: ToastCreateType = {
        id: Math.random(),
        message,
        duration,
        type,
        backgroundColor,
        icon,
        iconColor,
        fontColor,
        title,
        titleColor,
        authError,
      };
      setToasts((oldToasts) => [...oldToasts, newToast]);
    },
    []
  );

  const removeToast = useCallback((id: number) => {
    setToasts((oldToasts) =>
      oldToasts.filter((toast: ToastCreateType) => toast.id !== id)
    );
  }, []);

  useEffect(() => {
    bind(createToast);
  }, [bind, createToast]);

  return (
    <Container>
      {toasts.map(
        ({
          id,
          message,
          duration,
          type,
          backgroundColor,
          icon,
          iconColor,
          fontColor,
          title,
          titleColor,
          authError,
        }) => (
          <ToastItem
            key={id}
            message={message}
            type={type}
            duration={duration || 2000}
            onDone={() => removeToast(id)}
            backgroundColor={backgroundColor}
            icon={icon}
            iconColor={iconColor}
            fontColor={fontColor}
            title={title}
            titleColor={titleColor}
            authError={authError}
          />
        )
      )}
    </Container>
  );
};

export default ToastManager;
