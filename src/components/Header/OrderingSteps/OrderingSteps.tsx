import { Stepper, Step, StepButton } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import { STEPS } from '@/core/constants';

export const OrderingSteps = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const activeStep = STEPS.findIndex((step) => location.pathname === step.href) ?? 0;

  return (
    <Stepper activeStep={activeStep}>
      {STEPS.map((step, idx) => {
        return (
          <Step key={step.label}>
            <StepButton onClick={() => navigate(step.href)}>
              {activeStep === idx ? step.label : null}
            </StepButton>
          </Step>
        );
      })}
    </Stepper>
  );
};
