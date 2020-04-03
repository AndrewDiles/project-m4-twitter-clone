import React from 'react';
import styled from 'styled-components';

import Button from '../Button';

const NewTweet = ({ currentUser }) => {
  const [charactersRemaining, setCharactersRemaining] = React.useState(280);
  const [tweetText, setTweetText] = React.useState('');

  const handleKeyPress = function(ev) {
    let length = ev.target.value.length;
    if (length > 280) return;
    setTweetText(ev.target.value);
    setCharactersRemaining(280-length);
  };

  return (
    <Wrapper>  
      <form
        onSubmit={(event) => {
            event.preventDefault();
            console.log(tweetText);
            fetch("/api/tweet", {
                method: "POST",
                body: JSON.stringify({tweet: tweetText}),
                headers: {
                    "Accept": 'application/json',
                    "Content-Type": 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => console.log(data))
        }}
      >
        <AvatarImg src = {currentUser.avatarSrc}/>
        <TweetInput type = 'text'
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
            Meow
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
