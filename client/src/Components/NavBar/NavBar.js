import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { BrowserRouter as Router, NavLink, Switch, Route, Link } from 'react-router-dom';
import { Icon } from 'react-icons-kit'
import { home } from 'react-icons-kit/icomoon/home'
import { user } from 'react-icons-kit/feather/user'
import { bellO } from 'react-icons-kit/fa/bellO'
import { bookmark } from 'react-icons-kit/feather/bookmark'

import { COLORS } from '../constants';

import Logo from '../Logo'

const NavBar = ({ children }) => {

  const [activePage, setActivePage] = useState('Home');

  const setNotifications = () => {
    setActivePage('Notifications');
    console.log('set to nots');
  }

  // let textSize = 2;
  // function setTextSize() {
  //   if (window.matchMedia('(max-width: 900px)').matches) {
  //     textSize = 1.5;
  //   }
  //   else if (window.matchMedia('(max-width: 600px)').matches) {
  //     textSize = 1.2;
  //   }
  // };

  return (
    <Wrapper>  
      <Logo/>
      <Router>
        <NavigationLink to='/'>
          <IconElement size={32} icon={home}/>
            Home
        </NavigationLink>
        <NavigationLink to='/profile' onClick = {setNotifications}>
          <IconElement size={32} icon={user}/>
          Profile
        </NavigationLink>
        <NavigationLink to='/notifications'>
          <IconElement size={32} icon={bellO}/>
          Notifications
        </NavigationLink>
        <NavigationLink to='/bookmarks' icon = {bookmark}>
          <IconElement size={32} icon={bookmark}/>
          Bookmarks
        </NavigationLink>
        <NavigationLink to='/bookmarks' icon = {bookmark}>
          <MeowButton>
            Meow
          </MeowButton>
        </NavigationLink>
      </Router>
    </Wrapper>
  )
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  text-align: left;
  background-color: rgb(255,240,240);
  width: 30%;
  height: 100vh;
  padding: 10% 0 0 5%;
  @media (max-width: 900px) {
    padding: 10% 0 0 25px;
  }
  @media (max-width: 600px) {
    padding: 10% 0 0 10px;
  }
`
const IconElement = styled(Icon)`
  margin-right: 10px;
`
const NavigationLink = styled(NavLink)`
  padding: 20px;
  margin: 10px 10px 10px 0;
  font-size: 2em;
  text-decoration: none;
  border-radius: 25px;
  display: flex;
  flex-direction: row;
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
  }
`;
const MeowButton = styled.button`
  color: white;
  border-radius: 25px;
  background-color: ${COLORS.primary};
  font-size: 2em;
  @media (max-width: 1000px) {
    font-size: 1.5em;
  }
  @media (max-width: 600px) {
    font-size: 1.2em;
  }
`

export default NavBar;
