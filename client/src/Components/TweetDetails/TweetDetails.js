import React from 'react';
import styled from 'styled-components';
import { formatDateLong } from '../constants';
import NameModal from '../NameModal';
import TweetBase from '../TweetBase';

const TweetDetails = ({ tweet }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  
  const handleModalVisibility = function() {
    setModalVisible(!modalVisible);
    // console.log('modal visibility set to: ', JSON.stringify(modalVisible));
  }

  return (
    <Wrapper>
      <AvavtarInfo>
        <AvatarImg src = {tweet.author.avatarSrc}/>
        <AvatarDetails>
          <AvatarName
          onMouseEnter = {handleModalVisibility}
          onMouseLeave = {handleModalVisibility}
          >
            {tweet.author.displayName}
          </AvatarName>
          <AvatarHandle>
            @{tweet.author.handle}
          </AvatarHandle>
        </AvatarDetails>
      </AvavtarInfo>
      {modalVisible ? (
          <NameModal
          profile = {tweet.author}
          />
        ) : (null)
      }
      <TweetMessage>
        {tweet.status}
      </TweetMessage>
      {tweet.media[0] === undefined ? (null) : (
      <TweetImage src = {tweet.media[0].url}/>
      )}
      <TweetDeets>
        {formatDateLong(tweet.timestamp)} · Critter web app
      </TweetDeets>
      <TweetBase/>
    </Wrapper>
  )
};

export default TweetDetails;
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
const TweetMessage = styled.div`
  font-size: 1.5em;
  margin: 10px 0;
`

const AvatarHandle = styled.p`
  color: grey;
  margin: 10px 0;
`

const AvatarDetails = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`
const AvavtarInfo = styled.div`
  display: flex;
  flex-direction: row;
`
const AvatarImg = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50%;
`
const AvatarName = styled.span`
  font-weight: bold;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`
const Wrapper = styled.div`
  width: 70%;
  padding: 10px;
  border: solid lightgrey;
  border-top: none;
  position: relative;
`


// Back when I used : , tweetId, feed   in props
// return (
//   <Wrapper>
//     <AvavtarInfo>
//       <AvatarImg src = {feed.tweetsById[tweetId].author.avatarSrc}/>
//       <AvatarDetails>
//         <AvatarName
//         onMouseEnter = {handleModalVisibility}
//         onMouseLeave = {handleModalVisibility}
//         >
//           {feed.tweetsById[tweetId].author.displayName}
//         </AvatarName>
//         <AvatarHandle>
//           @{feed.tweetsById[tweetId].author.handle}
//         </AvatarHandle>
//       </AvatarDetails>
//     </AvavtarInfo>
//     {modalVisible ? (
//         <NameModal
//         profile = {feed.tweetsById[tweetId].author}
//         />
//       ) : (null)
//     }
//     <TweetMessage>
//       {feed.tweetsById[tweetId].status}
//     </TweetMessage>
//     {feed.tweetsById[tweetId].media[0] === undefined ? (null) : (
//     <TweetImage src = {feed.tweetsById[tweetId].media[0].url}/>
//     )}
//     <TweetDeets>
//       {formatDateLong(feed.tweetsById[tweetId].timestamp)} · Critter web app
//     </TweetDeets>
//     <TweetBase/>
//   </Wrapper>
// )