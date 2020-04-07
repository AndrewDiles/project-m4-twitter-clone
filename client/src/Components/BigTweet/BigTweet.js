import React, { useContext } from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Context } from '../Context';
import TweetDetails from '../TweetDetails'

import { Route, useParams } from 'react-router-dom';

import { handleFetch } from '../constants';

const BigTweet = ({ children }) => {
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
  const [singleTweet, setSingleTweet] = React.useState(null);
  const [tweetIdState, setTweetIdState] = React.useState(null);

  let { tweetId } = useParams();

  if (tweetId !== tweetIdState) {
    setTweetIdState(tweetId);
  }

  console.log(tweetId);
  React.useEffect(() => {
    setStatus('sending');
    fetch(`/api/me/home-feed`)
      .then(res => handleFetch(res, setError))
      .then(data => {
        setSingleTweet(data)
      })
      .then(setStatus('idle'))
  }, [tweetIdState])

  // console.log('singleTweet: ', singleTweet);
  // if (singleTweet) console.log('singleTweet.tweetsById: ', singleTweet.tweetsById);

  if (singleTweet === null) return (<CircularProgress />)

  return (
    <TweetDetails
      tweet = {singleTweet.tweetsById[tweetId]}
      width = '100%'
    >
      {children}
    </TweetDetails>
  )
};

export default BigTweet;

// router.get('/api/tweet/:tweetId', (req, res) => {
//   let tweet = data.tweets[req.params.tweetId];

//   tweet = resolveRetweet(tweet);
//   tweet = denormalizeTweet(tweet);

//   return simulateProblems(res, { tweet });
// });