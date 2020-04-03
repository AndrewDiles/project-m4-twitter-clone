import React from 'react';
import styled from 'styled-components';

import IconButton from '../IconButton';

import { Icon } from 'react-icons-kit';
import {messageCircle} from 'react-icons-kit/feather/messageCircle';
import {repeat} from 'react-icons-kit/feather/repeat'
import {heart} from 'react-icons-kit/feather/heart';
import {share} from 'react-icons-kit/feather/share'

const TweetBase = () => {

  return (
    <Wrapper>
      <IconButton
      primary = 'blue'
      secondary = 'lightblue'
      >
        <Icon size={32} icon={messageCircle}/>
      </IconButton>
      <IconButton
      primary = 'lime'
      secondary = 'limegreen'
      >
        <Icon size={32} icon={repeat}/>
      </IconButton>
      <IconButton
      primary = 'red'
      secondary = 'pink'
      >
        <Icon size={32} icon={heart}/>
      </IconButton>
      <IconButton
      primary = 'purple'
      secondary = 'violet'
      >
        <Icon size={32} icon={share}/>
      </IconButton>
    </Wrapper>
  )

}

export default TweetBase;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`