import React from 'react';
import { Box, Stepper, Step, StepLabel } from '@mui/material';
const StepperCpm = ({ stepLevel, steps }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper
        activeStep={stepLevel}
        alternativeLabel
        sx={{ margin: '50px auto' }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default StepperCpm;
