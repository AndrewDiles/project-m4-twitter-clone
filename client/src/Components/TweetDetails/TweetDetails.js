import React from 'react';
import { NavLink, Redirect, useHistory } from 'react-router-dom';

import styled from 'styled-components';
import { formatDateLong } from '../constants';
import NameModal from '../NameModal';
import TweetBase from '../TweetBase';
import BigTweet from '../BigTweet';

import CircularProgress from '@material-ui/core/CircularProgress';


const TweetDetails = ({ tweet, width }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  
  let history = useHistory();

  // console.log('tweet from details ', tweet);

  // const stopBubbling = function (event) {
  //   event.stopPropagation();
  // }
  
  const handleModalVisibility = function() {
    setModalVisible(!modalVisible);
    // console.log('modal visibility set to: ', JSON.stringify(modalVisible));
  }
  let linkPath ='';

  const handleTweetClick = function (event) {
    // console.log('click');
    // console.log(event.target);  // will be 'name' or undefined
    // console.log(event.target.classList);  // will be 'name' or undefined
    let testString = event.target.classList.value;
    console.log(testString.search('name'))
    // console.log(testArray.find(e => e === 'image'))
    if (testString.search('name') === -1) { // go on to link
      if (tweet && tweet.id) {
        let link = `/tweet/${tweet.id}`;
        console.log('link: ', link);
        history.push(link);
      }
      // console.log('tweetid: ', tweet.id)
      // if (tweet.id !== undefined) linkPath = `/tweet/${tweet.id}`;
      // /tweet/:tweetId
    }
    else {
      if (tweet && tweet.author && tweet.author.handle) {
        let link = `/${tweet.author.handle}`;
        console.log('link: ', link);
        history.push(link);
      }
      // if (tweet.author.handle !== undefined) linkPath = `/${tweet.author.handle}`;
    }
  }


  // I used the event.stopPropagation function inside my name onClick event
  // and it works perfectly

  if (tweet === undefined || tweet === null) {
    return (
      <CircularProgress/>
    )
  }
  // console.log('tweet: ', tweet);
  let tweetLinkPath = '';
  if (tweet.id !== undefined) tweetLinkPath = `/tweet/${tweet.id}`;
  let profileLinkPath = '';
  if (tweet.author !== undefined && tweet.author.handle !== undefined) profileLinkPath = `/${tweet.author.handle}`;
  return (
    <Wrapper
    width = {width}
    onClick = {handleTweetClick}  //Gave up on trying this method
    >
      {/* <StyledNavLink to = {linkPath}> */}
      {/* <StyledNavLink to = {tweetLinkPath}> */}
        <AvavtarInfo>
          <AvatarImg src = {tweet.author && tweet.author.avatarSrc}/>
          <AvatarDetails>
            {/* <StyledNavLink to = {profileLinkPath} onClick = {stopBubbling}> */}
              <AvatarName
              className = 'name'
              onMouseEnter = {handleModalVisibility}
              onMouseLeave = {handleModalVisibility}
              >
                {tweet.author && tweet.author.displayName}
              </AvatarName>
            {/* </StyledNavLink> */}
            <AvatarHandle>
              @{tweet.author && tweet.author.handle}
            </AvatarHandle>
          </AvatarDetails>
        </AvavtarInfo>
        {modalVisible ? (
            <NameModal
            profile = {tweet.author && tweet.author}
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
      {/* // </StyledNavLink> */}
      {/* </StyledNavLink> */}
      <TweetBase
      tweet = {tweet}
      />
    </Wrapper>
  )
};

export default TweetDetails;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
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
const TweetMessage = styled.div`
  font-size: 1.5em;
  margin: 10px 0;
  /* width: 100%; */
  /* white-space: pre-wrap; */
  word-wrap: break-word;
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
  color: black;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`
const Wrapper = styled.div`
  width: ${props => props.width && props.width || '70%'};
  padding: 10px;
  border: solid lightgrey;
  border-top: none;
  position: relative;
  cursor: pointer;
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