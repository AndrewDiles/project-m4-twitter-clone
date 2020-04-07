import React, { useContext } from 'react';
import styled from 'styled-components';

import { Context } from '../Context';
import Tweets from '../ProfileBase/Tweets';
import Media from '../ProfileBase/Media';
import Likes from './Likes';

import { COLORS } from '../constants'

import { handleFetch } from '../constants';

const ProfileBase = ( { tweet }) => {
  const {
    currentUser,
    userViewed,
    setUserViewed,
    status,
    setStatus,
    setError
  } = useContext(Context);

  const [active, setActive] = React.useState('Tweets');
  const [feedViewed, setFeedViewed] = React.useState(null);

  // console.log('userViewed.profile.handle: ', userViewed.profile.handle);

  React.useEffect(() => {
    if (!userViewed.profile) return;
    // else if (userViewed.profile.handle === 'treasurymog') {
    //   return;
    // }
    else {
      setStatus('loading');
      fetch(`/api/${userViewed.profile.handle}/feed`)  
        .then(res => handleFetch(res, setError))
        // .then(data => console.log(data))
        // .then(res => res.json())
        // .then(data => console.log(data.status))

        .then(data => {
          setFeedViewed(data);
          // console.log('feed of viewed user: ', data)
        })
        .then(setStatus('idle'))
    }
  }, [userViewed]);

  const handleClick = function (ev) {
    setActive(ev.target.innerText);
  }
  return (
    <Wrapper>
      <Options>
        <Option
          onClick = {handleClick}
          active = {active === 'Tweets'}
          value = 'Tweets'
        >
          Tweets
        </Option>
        <Option
          onClick = {handleClick}
          active = {active === 'Media'}
          value = 'Media'
        >
          Media
        </Option>
        <Option
          onClick = {handleClick}
          active = {active === 'Likes'}
          value = 'Likes'
        >
          Likes
        </Option>
      </Options>

      <Wrapper>
        {active === 'Media' ? (
          <Media
          feedViewed = {feedViewed}>

          </Media>
        ) : (
          <>
          {active === 'Likes' ? (
            <Likes
            feedViewed = {feedViewed}>

            </Likes>
          ) : (
            <Tweets
            feedViewed = {feedViewed}
            >

            </Tweets>
          )}
          </>
        )}
      </Wrapper>
    </Wrapper>
  )
}
export default ProfileBase;
const Option = styled.div`
  cursor: pointer;
  width: 33%;
  padding-bottom: 25px;
  border-bottom: solid;
  color: ${props => props.active ? COLORS.primary : 'black'};
  border-color: ${props => props.active ? COLORS.primary : 'grey'};
  &:hover{
    color: ${COLORS.highlighted};
    border-bottom: ${COLORS.highlighted} solid;
  }
`

const Options = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  font-weight: bold;
  

`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

