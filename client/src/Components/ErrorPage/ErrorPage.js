import React from 'react';
import styled from 'styled-components';

import { Icon } from 'react-icons-kit';
import {refresh} from 'react-icons-kit/fa/refresh'
import {androidSad} from 'react-icons-kit/ionicons/androidSad'

import { u1F4A3 as bomb } from 'react-icons-kit/noto_emoji_regular/u1F4A3';

const ErrorPage = ({ children }) => {

  const reloadPage = function () {
    window.location.reload(false);
  }

  return (
    <Wrapper>
      <Icon size={32} icon={bomb}/>
      <Icon size={32} icon={androidSad}/>
      Server Error
      <Refresh onClick = {reloadPage} size={32} icon={refresh}/>
    </Wrapper>
  )
};
const Refresh = styled(Icon)`
  &:hover {
    color: lime;
    cursor: pointer;
  }

`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  /* background-color: rgb(255,240,240); */
  height: 100vh;
`

export default ErrorPage;
