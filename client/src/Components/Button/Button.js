import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';

const Button = ({ notAllow, disabled, children }) => {
  let cursor = '';
  if (notAllow === undefined) cursor = 'pointer';
  else if (notAllow) cursor = 'not-allowed';
  else cursor = 'pointer';
  let disable = false;
  if (disabled) disable = true;
  // console.log('disabled', disable);

  return (
    <StyledButton
    cursor = {cursor}
    disabled = {disable}
    >
      {children}
    </StyledButton>
  )
};

const StyledButton = styled.button`
  cursor: ${props => props.cursor};
  margin-left: 25px;
  width: 150px;
  color: white;
  border-radius: 40px;
  padding: 10px 25px;
  background-color: ${COLORS.primary};
  font-size: 1.5em;
  font-weight: bold;
  @media (max-width: 1000px) {
    font-size: 1em;
    width: 100px;
    padding: 15px;
  }
  @media (max-width: 600px) {
    font-size: 0.8em;
    width: 75px;
    padding: 10px;
  }
`
export default Button;
