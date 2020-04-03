import React from 'react';
import styled from 'styled-components';

const IconButton = ({ primary, secondary, children }) => {

  return (
    // <Wrapper>
      <Aura
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
const Aura = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  &:hover{
    background-color: ${props => props.secondary && props.secondary};
    color: ${props => props.primary && props.primary};
  }
`