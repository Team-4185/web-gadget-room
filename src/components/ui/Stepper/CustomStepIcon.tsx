import { type FC } from 'react';
import { Typography, type StepIconProps, type SxProps, type Theme } from '@mui/material';

import { Check } from '@/assets';

interface IProps extends Omit<StepIconProps, 'sx'> {
  customColor: string;
  width: number;
  height: number;
  sx?: SxProps<Theme>;
}

export const CustomStepIcon: FC<IProps> = ({ completed, icon, width, height, customColor, sx }) => {
  if (completed) {
    return <Check width={width} height={height} style={{ color: customColor }} />;
  }

  return <Typography sx={sx as never}>{icon}</Typography>;
};
