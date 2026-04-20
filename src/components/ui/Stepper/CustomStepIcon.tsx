import { type FC } from 'react';
import { Typography, type StepIconProps } from '@mui/material';

import { Check } from '@/assets';

interface IProps extends StepIconProps {
  customColor: string;
  width: number;
  height: number;
}

export const CustomStepIcon: FC<IProps> = ({ completed, icon, width, height, customColor, sx }) => {
  if (completed) {
    return <Check width={width} height={height} style={{ color: customColor }} />;
  }

  return <Typography sx={sx}>{icon}</Typography>;
};
