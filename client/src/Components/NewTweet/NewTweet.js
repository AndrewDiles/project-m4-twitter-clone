import React, { useContext } from 'react';
import styled from 'styled-components';

import CircularProgress from '@material-ui/core/CircularProgress';

import Button from '../Button';
import { setTwo, handleFetch } from '../constants';
import { Context } from '../Context';

const NewTweet = () => {
  const {
    setError,
    status,
    setStatus,
    currentUser,
    setFeed,
    setTweetedIds
  } = useContext(Context);
  
  const [charactersRemaining, setCharactersRemaining] = React.useState(280);
  const [tweetText, setTweetText] = React.useState('');
  
  if (currentUser === null) {
    return <CircularProgress />
  }
  const handleKeyPress = function(ev) {
    let length = ev.target.value.length;
    if (length > 280) return;
    setTweetText(ev.target.value);
    setCharactersRemaining(280-length);
  };
  const tweetArea = document.getElementById('tweetTextId');

  // tweetArea ? console.log('tweetArea: ', tweetArea.childNodes[0]) : console.log('not a thing');
  // tweetArea ? console.log('tweetArea: ', tweetArea.value) : console.log('not a thing');

  return (
    <Wrapper>  
      <form
        onSubmit={(event) => {
            event.preventDefault();
            setStatus('sending');
            const tweetArea = document.getElementById('tweetTextId');
            console.log('tweetText: ',tweetText);
            fetch("/api/tweet", {
                method: "POST",
                body: JSON.stringify({status: tweetText}),
                headers: {
                    "Accept": 'application/json',
                    "Content-Type": 'application/json'
                }
            })
            .then(res => handleFetch(res, setError))
            // .then(data => console.log(data))
            // .then(setCurrentUser(currentUser))
            // .then(tweetArea.childNodes[0] = '')
            .then(tweetArea.value = '')
            .then(setTweetText(''))
            .then(setCharactersRemaining(280))

            fetch(`/api/me/home-feed`)
            .then(res => handleFetch(res, setError))
            .then(data => setTwo(data, setFeed, setTweetedIds))
            .then(setStatus('idle'))
        }}
      >
        <AvatarImg src = {currentUser.profile.avatarSrc}/>
        <TweetInput
        id = 'tweetTextId'
        type = 'text'
        placeholder = "What's happening?"
        onChange = {handleKeyPress}
        value = {tweetText}
        >
        </TweetInput>
        <TweetBottom>
          <Button
          notAllow = {charactersRemaining === 280}
          disabled = {charactersRemaining === 280}
          type = 'submit'
          style={{
            cursor: 'not-allowed'
            // cursor: charactersRemaining === 280 ? 'not-allowed' : 'pointer'
          }}
          // style="color:blue;font-size:46px;">
          >
            {status === 'sending' ? (
              <CircularProgress/>
            ) : (
              'Meow'
            )}
          </Button>
          <Counter
          charactersRemaining = {charactersRemaining}
          >
            {charactersRemaining}
          </Counter>
        </TweetBottom>
      </form>
    </Wrapper>
  )
};
const Counter = styled.p`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  /* text-align: center; */
  font-size: 1.5em;
  color: ${props => props.charactersRemaining > 50 ? 'grey' : props.charactersRemaining > 20 ? 'gold' : props.charactersRemaining > 0 ? 'orange' : 'red'};
`
const AvatarImg = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  position: absolute;
  margin: 10px;
`

const TweetBottom = styled.div`
position: relative;
display: flex;
flex-direction: row-reverse;
justify-content: right;
align-items: right;
text-align: right;
padding: 10px;
top: -70px;
`
const TweetInput = styled.textarea`
  padding: 15px;
  padding-top: 70px;
  text-indent:100px;
  width: 100%;
  height: 320px;
  font-size: 1.8em;
  resize: none;
  border: solid lightgrey;
  border-top: none;
  &:focus {
    outline: none;
}
`

const Wrapper = styled.div`
  width: 100%;
  height: 320px;
  /* background-color: paleturquoise; */
`

export default NewTweet;
