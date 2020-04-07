import React, { useContext } from 'react';
import styled from 'styled-components';
import { Route, useParams } from 'react-router-dom';

import { COLORS } from '../constants';
import { Icon } from 'react-icons-kit';
import { mapPin } from 'react-icons-kit/feather/mapPin';
import { calendar } from 'react-icons-kit/feather/calendar';
import {format} from 'date-fns';

import { formatDateSmall } from '../constants';

import CircularProgress from '@material-ui/core/CircularProgress';

import { handleFetch } from '../constants';
import { Context } from '../Context';
import Button from '../Button';
import NewTweet from '../NewTweet';
import ProfileBase from '../ProfileBase';

const Profile = ({ viewingCurrentUser }) => {
  const {
    currentUser,
    userViewed,
    setUserViewed,
    status,
    setStatus,
    setError,
    followStatus,
    setFollowStatus,
    followNum,
    setFollowNum
  } = useContext(Context);
  // const [followStatus, setFollowStatus] = React.useState(null);
  // const [followNum, setFollowNum] = React.useState(null);
  // console.log('viewingCurrentUser: ', viewingCurrentUser);

  const [disabled, setDisabled] = React.useState(false);

  let { handle } = useParams();

  // console.log('handle: ', handle);
  
  // if (viewingCurrentUser) handle = undefined;

  // console.log('profile handle name from params: ',handle);
  // console.log('userViewed: ', userViewed);
  React.useEffect(() => {
    if (viewingCurrentUser && handle === undefined) {
      // handle = undefined;
      setUserViewed(currentUser);
    }
    else if (handle !== undefined && !viewingCurrentUser){
      setStatus('loading');
      fetch(`/api/${handle}/profile`)  
        .then(res => handleFetch(res, setError))
        .then(data => {
          setUserViewed(data)
          console.log('Updated userViewed to: ', data)
        })
        // .then(console.log('followStatus PRE CHANGE: ', followStatus))
        .then(setFollowStatus(!userViewed.profile.isBeingFollowedByYou))
        // .then(console.log('followStatus POST CHANGE: ', followStatus))
        .then(setFollowNum(userViewed.profile.numFollowers))
        .then(setStatus('idle'))
    }
  }, [handle]);

  console.log('followStatus: ', followStatus);

  if (currentUser === null) return(
    <Route exact path='/'/>
  )
  else if (userViewed === null) {
    setUserViewed(currentUser);
    return (
      <CircularProgress />
    )
  }
  
  // // "bannerSrc": "/assets/treasurymog-banner.jpeg",
  // console.log('currentUser in profile page',currentUser);
  // console.log(currentUser.bannerSrc);

  const toggleFollow = () => {
    console.log('Changing following status to Follow');
    if (!followStatus) {
      setStatus('sending');
      setDisabled(true);
      fetch(`/api/${userViewed.profile.handle}/follow`, {
        method: "PUT",
        body: JSON.stringify(),
        headers: {
          "Accept": 'application/json',
          "Content-Type": 'application/json'
        }
      })
      .then(res => handleFetch(res, setError))
      .then(data => console.log(data))
      .then(setFollowStatus(!followStatus))
      .then(setFollowNum(followNum+1))
      // .then(
      //   setCurrentUser(
      //     ...currentUser,
      //     currentUser.profile.isBeingFollowedByYou = !currentUser.profile.isBeingFollowedByYou 
      //   )
      // )
      .then(setDisabled(false))
      .then(setStatus('idle'))
    }
  }
  const toggleUnFollow = () => {
    console.log('Changig following status to not followed');
    if (followStatus) {
      setStatus('sending');
      setDisabled(true);
      fetch(`/api/${userViewed.profile.handle}/unfollow`, {
        method: "PUT",
        body: JSON.stringify(),
        headers: {
          "Accept": 'application/json',
          "Content-Type": 'application/json'
        }
      })
      .then(res => handleFetch(res, setError))
      .then(data => console.log(data))
      .then(setFollowStatus(!followStatus))
      .then(setFollowNum(followNum-1))
      // .then(
      //   setCurrentUser(
      //     ...currentUser,
      //     currentUser.profile.isBeingFollowedByYou = !currentUser.profile.isBeingFollowedByYou 
      //   )
      // )
      .then(setDisabled(false))
      .then(setStatus('idle'))
    }
  }
  // console.log('follownum: ', followNum);
  return (
    <Wrapper>
      <Banner src = {userViewed.profile.bannerSrc} alt = "user's background banner image.  Contents will vary"/>
      <AvImgFollowRow>
        <AvatarImg src = {userViewed.profile.avatarSrc} />
        {userViewed.profile.handle === currentUser.profile.handle ? (null) : (
          <FollowWrapper>
            {followStatus ? (
                <Button
                disabled = {disabled}
                onClick = {toggleUnFollow}
                >
                  {status === 'sending' ? (
                    <CircularProgress/>
                  ) : (
                    'Following'
                  )}
                </Button>
            ) : (
              <Button
              disabled = {disabled}
              onClick = {toggleFollow}
              >
                {status === 'sending' ? (
                    <CircularProgress/>
                  ) : (
                    'Follow'
                  )}
              </Button>
            )}
          </FollowWrapper>
        )}
      </AvImgFollowRow>
      <Info>
        <Name>
          {userViewed.profile.displayName}
        </Name>
        <FlexRowWrapper>
          <Handle>
          @{userViewed.profile.handle}
          </Handle>
          {userViewed.profile.isFollowingYou ? (
            <Follows>
              Follows you
            </Follows>
          ): (null)
          }
        </FlexRowWrapper>
        <Bio>
          {userViewed.profile.bio}
        </Bio>
        <LocationDateDiv>
          {userViewed.profile.location ? (
            <>
              <Icon icon={mapPin}/>
              <Location> 
                {userViewed.profile.location}
              </Location>
            </>
          ) : (
            null
          )}
          {userViewed.profile.joined ? (
            <>
              <Icon icon={calendar}/>
              <DateJoined> 
                {/* {format(userViewed.joined.slice(0, 10), 'MM/dd/yyyy')} */}
                Joined {formatDateSmall(userViewed.profile.joined)}
              </DateJoined>
            </>
          ) : (
            null
          )}
        </LocationDateDiv>
        <FlexRowWrapper>
          <FlexRowWrapper>
          <Bold>
            {userViewed.profile.numFollowing}
          </Bold>
          Following
          </FlexRowWrapper>
          <span>
            {followNum === 1? (
              <FlexRowWrapper>
                <Bold>
                  {followNum}
                </Bold>
                Follower
              </FlexRowWrapper>
              ) : (
              <FlexRowWrapper>
                <Bold>
                  {followNum}
                </Bold>
                Followers
              </FlexRowWrapper>
            )}
          </span>
        </FlexRowWrapper>
      </Info>
      <ProfileBase/>
    </Wrapper>
  )
};
// "avatarSrc": "/assets/treasurymog-avatar.jpg",
const LocationDateDiv = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
`
const DateJoined = styled.span`
margin: 0 3px;
font-size: 1.3em;
  @media (max-width: 1000px) {
    font-size: 0.9em
  }
  @media (max-width: 600px) {
    font-size: 0.55em
  }
`
const Location = styled.span`
  margin: 0 10px 0 3px;
  font-size: 1.3em;
  @media (max-width: 1000px) {
    font-size: 0.9em
  }
  @media (max-width: 600px) {
    font-size: 0.55em
  }
`
const Follows = styled.span`
  color: gray;
  background-color: lightgray;
  border-radius: 3px;
  padding: 3px;
  margin-left: 5px;
  font-size: 1.3em;
  @media (max-width: 1000px) {
    font-size: 0.9em
  }
  @media (max-width: 600px) {
    font-size: 0.55em
  }
`
const Name = styled.div`
  margin-bottom: 3px;
  font-weight: bold;
  font-size: 1.5em;
  @media (max-width: 1000px) {
    font-size: 1.1em
  }
  @media (max-width: 600px) {
    font-size: 0.75em
  }
`
const Bio = styled.div`
  margin-top: 15px;
`
const FlexRowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 10px;
`
const Handle = styled.span`
padding: 3px;
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
  @media (max-width: 600px) {
    margin-top: 25px;
  }
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
const AvImgFollowRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right: 10px;
`
const Bold = styled.div`
  font-weight: bold;
  margin-right: 10px;
`
const FollowWrapper = styled.div`
  margin-top: 25px;
  /* display: flex;
  flex-flow: row-reverse;
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
  } */
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