import type { FC } from 'react';
import {
  Stepper as StepperMUI,
  Step,
  StepButton,
  StepConnector,
  StepLabel,
  Typography,
  type StepIconProps,
  type SxProps,
  type Theme,
} from '@mui/material';
import { useNavigate } from 'react-router';

import { CustomStepIcon } from './CustomStepIcon';

type StepperMode = 'default' | 'navigation';

interface IProps {
  mode: StepperMode;
  showStepConnector: boolean;
  steps: { label: string; href?: string }[];
  activeStep?: number;
  sx?: SxProps<Theme>;
}

export const Stepper: FC<IProps> = ({ mode, showStepConnector, steps, activeStep, sx }) => {
  const navigate = useNavigate();

  return (
    <StepperMUI
      activeStep={activeStep}
      connector={
        showStepConnector ? (
          <StepConnector
            sx={{
              '&': {
                maxWidth: '29px',
              },
              '& .MuiStepConnector-line': {
                borderTopWidth: 2,
                borderColor: 'var(--very-light-violet)',
                borderRadius: '4px',
                transition: '0.3s',
              },

              '&.Mui-completed .MuiStepConnector-line, &.Mui-active .MuiStepConnector-line': {
                borderColor: 'var(--blue-violet)',
              },
            }}
          />
        ) : null
      }
      sx={sx}
    >
      {steps.map((step, idx) => {
        return (
          <Step key={step.label}>
            {mode === 'navigation' ? (
              <StepButton
                sx={{ boxSizing: 'border-box' }}
                onClick={() => {
                  if (step.href) navigate(step.href);
                }}
              >
                <StepLabel
                  slots={{
                    stepIcon: (props: StepIconProps) => (
                      <CustomStepIcon
                        {...props}
                        width={14}
                        height={10}
                        customColor="var(--black)"
                        sx={{ fontWeight: 600, color: 'var(--black)' }}
                      />
                    ),
                  }}
                  sx={{
                    '& .MuiStepLabel-iconContainer': {
                      width: '27px',
                      height: '27px',
                    },
                    '& .MuiStepLabel-iconContainer.Mui-active': {
                      marginRight: '12px',
                    },
                  }}
                >
                  <Typography sx={{ fontWeight: 600, color: 'var(--black)' }}>
                    {activeStep === idx ? step.label : null}
                  </Typography>
                </StepLabel>
              </StepButton>
            ) : (
              <StepLabel
                slots={{
                  stepIcon: (props: StepIconProps) => (
                    <CustomStepIcon
                      {...props}
                      width={11}
                      height={8}
                      customColor="var(--blue-violet)"
                      sx={{ fontWeight: 600, color: 'var(--gray-violet)', fontSize: '11px' }}
                    />
                  ),
                }}
                sx={{
                  '& .MuiStepLabel-iconContainer ': {
                    width: '20px',
                    height: '20px',
                    marginRight: '4px',
                  },
                  '& .MuiStepLabel-iconContainer.Mui-disabled': {
                    background: 'var(--very-light-violet)',
                    border: 'none',
                  },
                  '&.Mui-disabled .MuiStepLabel-labelContainer p': {
                    color: 'var(--gray-violet)',
                  },
                }}
              >
                <Typography sx={{ fontWeight: 500, color: 'var(--blue-violet)', fontSize: '12px' }}>
                  {step.label}
                </Typography>
              </StepLabel>
            )}
          </Step>
        );
      })}
    </StepperMUI>
  );
};
