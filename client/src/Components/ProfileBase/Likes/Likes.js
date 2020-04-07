// YOUR FEED DOES NOT INCLUDE TWEETS THAT YOU HAVE LIKED

import React from 'react';
import styled from 'styled-components';

import TweetDetails from '../../TweetDetails';

const Likes = ({ feedViewed, children }) => {
  if (!feedViewed) return (<></>)
  if (feedViewed.tweetsById) console.log(feedViewed.tweetsById)
  return (
    <Wrapper>
      {feedViewed.tweetIds.map(tweetId => {
        if (feedViewed.tweetsById[tweetId].isLiked)
          return (
          <TweetDetails
          key = {tweetId}
          tweet = {feedViewed.tweetsById[tweetId]}
          width = '100%'
          // tweetId = {tweetId}
          // feed = {feed}
          // id = {feed.tweetsById[tweetId].id}
          />
          )
        })}
      {children}
    </Wrapper>
  )
};

export default Likes;
const Wrapper = styled.div`
  width:100%
`