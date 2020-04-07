import React, { useContext } from 'react';
import styled from 'styled-components';

import IconButton from '../IconButton';

import { Icon } from 'react-icons-kit';
import {messageCircle} from 'react-icons-kit/feather/messageCircle';
import {repeat} from 'react-icons-kit/feather/repeat';
import {heart} from 'react-icons-kit/feather/heart';
import {share} from 'react-icons-kit/feather/share';

import { Context } from '../Context';

import { setTwo, handleFetch } from '../constants';

const TweetBase = ( { tweet }) => {

  const {
    setError,
    setStatus
  } = useContext(Context);
  const [disabled, toggleDisabled] = React.useState(false);
  const [liked, toggleLiked] = React.useState(false);
  const [reTweeted, toggleReTweeted] = React.useState(false);
  // let likeMod = 0;
  // let reTweetMod = 0;
  React.useEffect(() => {
    toggleLiked(tweet.isLiked);
    toggleReTweeted(tweet.isRetweeted);
    // reTweetStart = tweet.isRetweeted;
  }, []);

  const stopBubbling = function (event) {
    event.stopPropagation();
  }

  const toggleLikeMod = function () {
    // if (tweet.isLiked && !liked) {tweet.numLikes ++; tweet.isLiked = !tweet.isLiked; console.log('1');}
    if (!tweet.isLiked && !liked) {tweet.numLikes ++; tweet.isLiked = !tweet.isLiked;}
    else if (tweet.isLiked && liked) {tweet.numLikes --; tweet.isLiked = !tweet.isLiked;}
    // else if (!tweet.isLiked && liked) {tweet.numLikes ++; tweet.isLiked = !tweet.isLiked; console.log('4');}
  }
  const toggleReTweetMod = function () {
    // if (tweet.isLiked && !liked) {tweet.numLikes ++; tweet.isLiked = !tweet.isLiked; console.log('1');}
    if (!tweet.isRetweeted && !reTweeted) {tweet.numRetweets ++; tweet.isRetweeted = !tweet.isRetweeted;}
    else if (tweet.isRetweeted && reTweeted) {tweet.numRetweets --; tweet.isRetweeted = !tweet.isRetweeted;}
    // else if (!tweet.isLiked && liked) {tweet.numLikes ++; tweet.isLiked = !tweet.isLiked; console.log('4');}
  }

  const handleClickLike = function (event) {
    stopBubbling(event);
    toggleDisabled(true);
    setStatus('sending');
    fetch(`/api/tweet/${tweet.id}/like`, {
      method: "PUT",
      body: JSON.stringify({like: !liked}),
      headers: {
          "Accept": 'application/json',
          "Content-Type": 'application/json'
      }
    })
    .then(res => handleFetch(res, setError))
    // .then(data => console.log(data))
    // .then(setLike())
    .then(toggleLiked(!liked))
    .then(toggleLikeMod())
    .then(setStatus('idle'))
    .then(toggleDisabled(false))
  }
  // console.log('tweet: ', tweet);
  
  const handleClickReTweet = function (event) {
    stopBubbling(event);
    toggleDisabled(true);
    setStatus('sending');
    fetch(`/api/tweet/${tweet.id}/retweet`, {
      method: "PUT",
      body: JSON.stringify({retweet: !tweet.isRetweeted}),
      headers: {
          "Accept": 'application/json',
          "Content-Type": 'application/json'
      }
    })
    .then(res => handleFetch(res, setError))
    .then(data => console.log(data))
    .then(toggleReTweeted(!reTweeted))
    .then(toggleReTweetMod())
    .then(setStatus('idle'))
    .then(toggleDisabled(false))
  }

  return (
    <Wrapper>


      <IconButton
      primary = 'blue'
      secondary = 'lightblue'
      >
        <Icon size={32} icon={messageCircle}/>
      </IconButton>

      <IconAndNum
      primary = 'lime'
      active = {tweet.isRetweeted}
      >
        <IconButton
        disabled = {disabled}
        handleClick = {handleClickReTweet}
        active = {tweet.isRetweeted}
        primary = 'lime'
        secondary = 'limegreen'
        >
          <Icon size={32} icon={repeat}/>
        </IconButton>
        <Num>
          {tweet.numRetweets}
        </Num>
      </IconAndNum>


      <IconAndNum
      primary = 'red'
      active = {tweet.isLiked}
      >
        <IconButton
        disabled = {disabled}
        handleClick = {handleClickLike}
        active = {tweet.isLiked}
        primary = 'red'
        secondary = 'pink'
        >
          <Icon size={32} icon={heart}/>
        </IconButton>
        <Num>
          {tweet.numLikes}
        </Num>
      </IconAndNum>
      



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

const Num = styled.p`
  margin-left: 10px;
  font-size: 1.5em;
`

const IconAndNum = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  flex-direction: row;
  color: ${props => props.primary && props.active && props.primary};
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`