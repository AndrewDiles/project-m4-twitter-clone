import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

import { COLORS } from '../constants';
import { Icon } from 'react-icons-kit';
import { mapPin } from 'react-icons-kit/feather/mapPin';
import { calendar } from 'react-icons-kit/feather/calendar';
import {format} from 'date-fns';

import { formatDateMedium } from '../constants';

import Button from '../Button';
import NewTweet from '../NewTweet';

const Profile = ({ userViewed, currentUser, setCurrentUser }) => {
  if (currentUser === undefined) return(
    <Route exact path='/'/>
  )
  else if (userViewed === null) {
    userViewed = currentUser;
  }
  
  // // "bannerSrc": "/assets/treasurymog-banner.jpeg",
  // console.log('currentUser in profile page',currentUser);
  // console.log(currentUser.bannerSrc);

  const toggleFollow = () => {
    console.log('Changed following status');
    setCurrentUser(
      ...currentUser,
      currentUser.isBeingFollowedByYou = !currentUser.isBeingFollowedByYou 
    )
  }

  return (
    <Wrapper>
      <Banner src = {userViewed.bannerSrc} alt = "user's background banner image.  Contents will vary"/>
      <AvatarImg src = {userViewed.avatarSrc} />
      {userViewed.handle === currentUser.handle ? (null) : (
        <FollowWrapper>
          {userViewed.isBeingFollowedByYou ? (
              <Button
              onClick = {toggleFollow}
              >
                Following
              </Button>
          ) : (
            <Button
            onClick = {toggleFollow}
            >
              Follow
            </Button>
          )}
        </FollowWrapper>
      )}
      <Info>
        <Name>
          {userViewed.displayName}
        </Name>
        <HandleWrapper>
          <Handle>
          @{userViewed.handle}
          </Handle>
          {userViewed.isFollowingYou ? (
            <Follows>
              'Follows you'
            </Follows>
          ): (null)
          }
        </HandleWrapper>
        <div>
          <Location> 
            <Icon icon={mapPin}/>
            {userViewed.location}
          </Location>
          <DateJoined> 
            <Icon icon={calendar}/>
            {/* {format(userViewed.joined.slice(0, 10), 'MM/dd/yyyy')} */}
            {formatDateMedium(userViewed.joined)}
          </DateJoined>
        </div>
        <div>
          <span>
          {userViewed.numFollowing} Following
          </span>
          <span>
          {userViewed.numFollowers} Followers
          </span>
        </div>

      </Info>
    </Wrapper>
  )
};
// "avatarSrc": "/assets/treasurymog-avatar.jpg",
const DateJoined = styled.span`
`
const Location = styled.span`
`
const Follows = styled.span`
  color: gray;
  background-color: lightgray;
`
const Name = styled.div`
  font-weight: bold;
  font-size: 1.5em;
  @media (max-width: 1000px) {
    font-size: 1.1em
  }
  @media (max-width: 600px) {
    font-size: 0.75em
  }
`
const HandleWrapper = styled.div`
  display: flex;
  flex-direction: row;
`
const Handle = styled.span`
font-size: 1.3em;
  @media (max-width: 1000px) {
    font-size: 0.9em
  }
  @media (max-width: 600px) {
    font-size: 0.55em
  }
`
const Info = styled.div`
  position: relative;
  margin-left: 20px;
  top: -50px;
`
const AvatarImg = styled.img`
  width: 150px;
  height: 150px;
  position: relative;
  top: -75px;
  left: 25px;
  border-radius: 50%;
  border: white solid;
  @media (max-width: 1000px) {
    left: 15px;
    width: 100px;
    height: 100px;
    top: -50px;
  }
  @media (max-width: 600px) {
    left: 10px;
    width: 50px;
    height: 50px;
    top: -25px;
  }
`
const FollowWrapper = styled.div`
  display: flex;
  flex-flow: row-reverse;
  /* right: 25px; */
  margin: 25px;
  position: relative;
  bottom: 150px;
  @media (max-width: 1000px) {
    margin: 15px;
    bottom: 110px;
  }
  @media (max-width: 600px) {
    margin: 10px;
    bottom: 60px;
  }
`
const Banner = styled.img`
  width: 100%;
  /* position: fixed; */
`
const Wrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  border: lightgray solid;
`

export default Profile;