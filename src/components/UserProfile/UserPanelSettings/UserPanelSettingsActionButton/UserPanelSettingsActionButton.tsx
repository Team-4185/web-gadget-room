import type { FC } from 'react';

import { Save } from '@/assets';
import { Button } from '@/components';

interface UserPanelSettingsActionButtonProps {
  text: string;
  maxWidth: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const UserPanelSettingsActionButton: FC<UserPanelSettingsActionButtonProps> = ({
  text,
  maxWidth,
  disabled,
  onClick,
}) => {
  return (
    <Button
      maxWidth={maxWidth}
      height="41px"
      fontSize="20px"
      fontWeight={400}
      disabled={disabled}
      onClick={onClick}
      sx={{
        gap: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
      }}
    >
      <Save width={25} height={25} />
      {text}
    </Button>
  );
};
