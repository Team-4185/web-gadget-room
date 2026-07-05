import { type FC } from 'react';
import { Typography, type StepIconProps } from '@mui/material';

import { Check } from '@/assets';

interface IProps extends Omit<StepIconProps, 'sx'> {
  customColor: string;
  width: number;
  height: number;
  fontWeight?: number;
  textColor?: string;
  textFontSize?: string;
}

export const CustomStepIcon: FC<IProps> = ({
  completed,
  icon,
  width,
  height,
  customColor,
  fontWeight,
  textColor,
  textFontSize,
}) => {
  if (completed) {
    return <Check width={width} height={height} style={{ color: customColor }} />;
  }

  return (
    <Typography sx={{ fontWeight, color: textColor, fontSize: textFontSize }}>{icon}</Typography>
  );
};
