import React from 'react';
import styled from 'styled-components';

const NameModal = ({ profile }) => {
  // console.log('profile', profile);
  // sample profile: 
  // "profile": {
  //   "handle": "treasurymog",
  //   "displayName": "Gladstone, Esq.",
  //   "avatarSrc": "/assets/treasurymog-avatar.jpg",
  //   "bannerSrc": "/assets/treasurymog-banner.jpeg",
  //   "location": "Whitehall, London",
  //   "joined": "2016-10-12T12:00",
  //   "bio": "I live and work at the Treasury as a mouser but I also have a paw in the finances. Here to help lighten up the political world. Unofficial.",
  //   "numFollowing": 2,
  //   "numFollowers": 2,
  //   "numLikes": 1,
  //   "isFollowingYou": false,
  //   "isBeingFollowedByYou": false
  // }

  return (
    <Wrapper>
      <AvavtarInfo>
        <AvatarImg src = {profile.avatarSrc}/>
        <AvatarName>
          {profile.displayName}
        </AvatarName>
        <AvatarHandle>
          @{profile.handle}
        </AvatarHandle>
      </AvavtarInfo>
      <AvatarBio>
        {profile.bio}
      </AvatarBio>
      <FollowInfo>
        <BoldP>
          {profile.numFollowing}
        </BoldP>
        <TextP>
          Following
          </TextP>
        <BoldP>
        {profile.numFollowers}
        </BoldP>
        <TextP>
          Followers
        </TextP>
      </FollowInfo>
    </Wrapper>
  )
};

export default NameModal;
const TextP = styled.p`
  margin-right: 25px;
`
const BoldP = styled.p`
  font-weight: bold;
  margin-right: 5px;
`
const FollowInfo = styled.div`
  display: flex;
  flex-direction: row;
`
const TweetDeets = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: row;
  color: grey;
`
const TweetImage = styled.img`
  border-radius: 25px;
  width: 100%;
`
const AvatarBio = styled.div`
  font-size: 1.2em;
  margin: 10px 0;
`

const AvatarHandle = styled.p`
  color: grey;
  margin: 5px 0;
`
const AvavtarInfo = styled.div`
  display: flex;
  flex-direction: column;
`
const AvatarImg = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50%;
`
const AvatarName = styled.span`
  font-weight: bold;
  margin-top: 10px;
`
const Wrapper = styled.div`
  cursor: pointer;
  width: 50%;
  padding: 10px;
  z-index: 10;
  position: absolute;
  background-color: white;
  border-radius: 15px;
  box-shadow: 5px 5px 30px 5px grey;
  left: 120px;
  top: 40px;
  
`
