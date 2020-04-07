import React, {useContext} from 'react';
import styled, { keyframes } from 'styled-components';

import { Context } from '../Context';

import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { home } from 'react-icons-kit/icomoon/home';
import { user } from 'react-icons-kit/feather/user';
import { bellO } from 'react-icons-kit/fa/bellO';
import { bookmark } from 'react-icons-kit/feather/bookmark';
import { feather } from 'react-icons-kit/feather/feather'

import { COLORS } from '../constants';

import Logo from '../Logo';
import Button from '../Button';

const NavBar = ({ children }) => {
  const {
    currentUser,
    setUserViewed
  } = useContext(Context);

  return (
    <Wrapper>  
      <Logo/>
        <NavigationLink exact to='/'>
          <IconElement size={32} icon={home}/>
          <p>
            Home
          </p>
        </NavigationLink>
        <NavigationLink exact to='/profile'>
          <IconElement size={32} icon={user}/>
          <p>
            Profile
          </p>
        </NavigationLink>
        <NavigationLink to='/notifications'>
          <IconElement size={32} icon={bellO}/>
          <p>
            Notifications
          </p>
        </NavigationLink>
        <NavigationLink to='/bookmarks'>
          <IconElement size={32} icon={bookmark}/>
          <p>
            Bookmarks
          </p>
        </NavigationLink>
        <Button>
          <ParentDiv>
            <ButtonText>
              Meow
            </ButtonText>
            <IconElement size={32} icon={feather}/>
          </ParentDiv>
        </Button>
    </Wrapper>
  )
};
const ParentDiv = styled.div`
  @media (min-width: 600px) {
    i {
      display: none !important;
    }
  }
  @media (max-width: 600px) {
    padding-left: 8px;
  }
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  text-align: left;
  /* background-color: rgb(255,240,240); */
  width: 30%;
  height: 100vh;
  padding: 5% 0 0 5%;
  @media (max-width: 900px) {
    padding: 5% 0 0 25px;
  }
  @media (max-width: 600px) {
    padding: 5% 0 0 10px;
  }
`
const ButtonText = styled.p`
  /* & ~ i > svg {
    display: none;
  } */
@media (max-width: 600px) {
    display: none;
  }
`
const IconElement = styled(Icon)`
  margin-right: 10px;
  @media (max-width: 600px) {
    & ~ p {
      display: none;
    }
  }
`
const NavigationLink = styled(NavLink)`
  /* align-items: center; */
  text-align: center;
  padding: 20px;
  margin: 10px 10px 10px 0;
  font-size: 2em;
  text-decoration: none;
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  color: black;
  &:hover {
    background-color: ${COLORS.highlighted};
  }
  &.active {
    color: ${COLORS.primary};
  }
  @media (max-width: 1000px) {
    font-size: 1.5em;
    display: flex;
    flex-direction: column;
  }
  @media (max-width: 600px) {
    font-size: 1.2em;
    display: flex;
    flex-direction: column;
    text-align: left;
  }
`;

export default NavBar;
