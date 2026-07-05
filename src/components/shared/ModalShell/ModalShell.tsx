import type { ElementType, ReactNode } from 'react';

import { useModalLifecycle } from '@/core/hooks';

import './ModalShell.css';

type ModalShellProps = {
  isOpen: boolean;
  children: ReactNode;
  onClose?: () => void;
  closeOnEscape?: boolean;
  lockBodyScroll?: boolean;
  backdropClassName?: string;
  dialogClassName?: string;
  dialogElement?: ElementType;
  labelledBy?: string;
};

export const ModalShell = ({
  isOpen,
  children,
  onClose,
  closeOnEscape = true,
  lockBodyScroll = true,
  backdropClassName = '',
  dialogClassName = '',
  dialogElement: DialogElement = 'section',
  labelledBy,
}: ModalShellProps) => {
  useModalLifecycle({
    isOpen,
    onClose,
    closeOnEscape,
    lockBodyScroll,
  });

  if (!isOpen) return null;

  return (
    <div className={`modal-shell__backdrop ${backdropClassName}`.trim()} role="presentation">
      <DialogElement
        className={dialogClassName}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
      >
        {children}
      </DialogElement>
    </div>
  );
};
