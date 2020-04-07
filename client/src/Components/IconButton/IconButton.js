import React from 'react';
import styled from 'styled-components';

const IconButton = ({ handleClick, primary, secondary, active, children }) => {

  return (
    // <Wrapper>
      <Aura
      active = {active}
      onClick = {handleClick}
      primary = {primary}
      secondary = {secondary}
      >
        {children}
      </Aura>
    // {/* </Wrapper> */}
  )
}
export default IconButton;

// const Wrapper = styled.div`
//   height: 50px;
//   width: 50px;
// `
const Aura = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  color: ${props => props.active && props.active};
  background-color: ${props => props.active && props.secondary && props.secondary};
  &:hover{
    background-color: ${props => props.secondary && props.secondary};
    color: ${props => props.primary && props.primary};
  }
`