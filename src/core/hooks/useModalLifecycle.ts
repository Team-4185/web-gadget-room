import { useEffect } from 'react';

type UseModalLifecycleOptions = {
  isOpen: boolean;
  onClose?: () => void;
  closeOnEscape?: boolean;
  lockBodyScroll?: boolean;
};

export const useModalLifecycle = ({
  isOpen,
  onClose,
  closeOnEscape = true,
  lockBodyScroll = true,
}: UseModalLifecycleOptions) => {
  useEffect(() => {
    if (!isOpen) return;

    const previousBodyOverflow = document.body.style.overflow;

    if (lockBodyScroll) {
      document.body.style.overflow = 'hidden';
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscape) {
        onClose?.();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      if (lockBodyScroll) {
        document.body.style.overflow = previousBodyOverflow;
      }

      window.removeEventListener('keydown', onKeyDown);
    };
  }, [closeOnEscape, isOpen, lockBodyScroll, onClose]);
};
