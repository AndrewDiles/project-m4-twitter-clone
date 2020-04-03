import React, { useContext } from 'react';
import styled from 'styled-components';

import CircularProgress from '@material-ui/core/CircularProgress';

import TweetDetails from '../TweetDetails';
import NewTweet from '../NewTweet';

import { Context } from '../Context';

// const initialFeed = {};
// const initialTweetedIds = [];

const HomeFeed = ({ currentUser, status, setStatus }) => {
  const {
    feed,
    setFeed,
    tweetedIds,
    setTweetedIds
  } = useContext(Context);

  // const [feed, setFeed] = React.useState(initialFeed);
  // const [tweetedIds, setTweetedIds] = React.useState(initialTweetedIds);

  // console.log('currentUser', currentUser);
  
  const dispatch = function(input, set1, set2) {
    set1(input);
    set2(input.tweetIds);
  }
  // ‘/api/me/home-feed’
  // fetch(`/api/${currentUser.handle}/feed`)
  React.useEffect(() => {
    if (currentUser === undefined) return;
    setStatus('loading');
    fetch(`/api/me/home-feed`)
      .then(res => res.json())
      .then(data => dispatch(data, setFeed, setTweetedIds))
      .then(setStatus('idle'))
  }, [currentUser]);

  if (status === 'loading' || currentUser === undefined || tweetedIds === undefined) {
    // console.log('status:' , status);
    // console.log('tweetedIds', tweetedIds);
    return (
      <CircularProgress />
    )
  }
  
  return (
    <>
      <HomeTweet>
        <HomeTweetText>
          Home
        </HomeTweetText>
        <NewTweet
        currentUser = {currentUser}
        feed = {feed}
        setFeed = {setFeed}
        tweetedIds = {tweetedIds}
        setTweetedIds = {setTweetedIds}
        />
      </HomeTweet>
      
      <Tweets>
        {tweetedIds.map(tweetId => {
          return (
          <TweetDetails
          key = {tweetId}
          tweet = {feed.tweetsById[tweetId]}
          // tweetId = {tweetId}
          // feed = {feed}
          // id = {feed.tweetsById[tweetId].id}
          />
          )
        })}
      </Tweets>
    </>
  )
};
// {props.messages.map(message => (

export default HomeFeed;
const HomeTweetText = styled.div`
  padding: 25px;
  font-weight: bold;
  font-size: 2em;
  border: solid lightgrey;
  border-top: none;
`
const HomeTweet = styled.div`
  width: 70%;
  border-bottom: solid lightgrey;
  /* border-top: none; */
`
const Tweets = styled.div`

`

// Sample of feed from fetch:
// {
//   "tweetsById": {
//     "1209791721099411456r1": {
//       "id": "1209791721099411456r1",
//       "timestamp": "2019-12-26T14:38:00+00:00",
//       "status": "If you're a 🇬🇧 diplomat abroad today, let me know where you are and what you're up to!",
//       "media": [],
//       "retweetFrom": {
//         "handle": "treasurymog",
//         "displayName": "Gladstone, Esq.",
//         "avatarSrc": "/assets/treasurymog-avatar.jpg",
//         "bannerSrc": "/assets/treasurymog-banner.jpeg",
//         "location": "Whitehall, London",
//         "joined": "2016-10-12T12:00",
//         "bio": "I live and work at the Treasury as a mouser but I also have a paw in the finances. Here to help lighten up the political world. Unofficial.",
//         "numFollowing": 2,
//         "numFollowers": 2,
//         "numLikes": 1,
//         "isFollowingYou": false,
//         "isBeingFollowedByYou": false
//       },
//       "author": {
//         "handle": "diplomog",
//         "displayName": "Palmerston",
//         "avatarSrc": "/assets/diplomog-avatar.jpg",
//         "bannerSrc": "/assets/diplomog-banner.jpeg",
//         "location": "Whitehall",
//         "url": "http://fco.gov.uk",
//         "joined": "2016-02-02T12:00",
//         "bio": "Best friends with @treasurymog.",
//         "numFollowing": 1,
//         "numFollowers": 1,
//         "numLikes": 1,
//         "isFollowingYou": true,
//         "isBeingFollowedByYou": true
//       },
//       "isLiked": false,
//       "isRetweeted": false,
//       "numLikes": 0,
//       "numRetweets": 0
//     },
//     "1212689921057665024": {
//       "id": "1212689921057665024",
//       "timestamp": "2020-01-12T09:14:00+00:00",
//       "status": "Ok people #backtowork you go. Cats...just carry on lounging around as usual.",
//       "media": [
//         {
//           "type": "img",
//           "url": "/assets/ENRXDPKWwAEJqFu.jpeg"
//         }
//       ],
//       "author": {
//         "handle": "treasurymog",
//         "displayName": "Gladstone, Esq.",
//         "avatarSrc": "/assets/treasurymog-avatar.jpg",
//         "bannerSrc": "/assets/treasurymog-banner.jpeg",
//         "location": "Whitehall, London",
//         "joined": "2016-10-12T12:00",
//         "bio": "I live and work at the Treasury as a mouser but I also have a paw in the finances. Here to help lighten up the political world. Unofficial.",
//         "numFollowing": 2,
//         "numFollowers": 2,
//         "numLikes": 1,
//         "isFollowingYou": false,
//         "isBeingFollowedByYou": false
//       },
//       "isLiked": false,
//       "isRetweeted": false,
//       "numLikes": 0,
//       "numRetweets": 0
//     }
//   },
//   "tweetIds": [
//     "1209791721099411456r1",
//     "1212689921057665024"
//   ]
// }