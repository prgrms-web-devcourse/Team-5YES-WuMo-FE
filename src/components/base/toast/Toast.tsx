import ReactDOM from 'react-dom/client';

import { CreateToastFn, CreateToastParams } from '@/types/toast';

import ToastManager from './ToastManager';

class Toast {
  portal: null | HTMLElement = null;
  createToast!: CreateToastFn;

  constructor() {
    const portalId = 'toast-portal';
    const portalElement = document.getElementById(portalId);

    if (portalElement) {
      this.portal = portalElement;
      return;
    } else {
      this.portal = document.createElement('div');
      this.portal.id = portalId;
      document.body.appendChild(this.portal);
    }

    ReactDOM.createRoot(this.portal).render(
      <ToastManager
        bind={(createToast) => {
          this.createToast = createToast;
        }}
      />
    );
  }

  show({
    message,
    duration = 2000,
    type,
    backgroundColor,
    icon,
    iconColor,
    fontColor,
    title,
    titleColor,
  }: CreateToastParams) {
    this.createToast({
      message,
      duration,
      type,
      backgroundColor,
      icon,
      iconColor,
      fontColor,
      title,
      titleColor,
    });
  }
}

export default new Toast();
