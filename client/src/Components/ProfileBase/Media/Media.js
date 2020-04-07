import React from 'react';
import styled from 'styled-components';

import TweetDetails from '../../TweetDetails';

const Media = ({ feedViewed, children }) => {
  if (!feedViewed) return (<></>)
  return (
    <Wrapper>
      {feedViewed.tweetIds.map(tweetId => {
        if (feedViewed.tweetsById[tweetId].media.length > 0)
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

export default Media;
const Wrapper = styled.div`
  width:100%
`