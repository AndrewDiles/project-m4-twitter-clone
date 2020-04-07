import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';

const Button = ({ onClick, notAllow, disabled, children }) => {
  let cursor = '';
  if (notAllow === undefined) cursor = 'pointer';
  else if (notAllow) cursor = 'not-allowed';
  else cursor = 'pointer';
  let disable = false;
  if (disabled) disable = true;
  // console.log('disabled', disable);

  return (
    <StyledButton
    onClick = {onClick && onClick}
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
  padding: 10px 0;
  background-color: ${COLORS.primary};
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  /* display: flex;
  justify-content: center; */
  @media (max-width: 1000px) {
    font-size: 1em;
    width: 100px;
    padding: 15px 0;
  }
  @media (max-width: 600px) {
    font-size: 0.5em;
    width: 55px;
    padding: 10px 0;
  }
`
export default Button;
