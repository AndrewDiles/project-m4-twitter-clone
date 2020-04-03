import React, { useReducer, useState} from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import {format} from 'date-fns';

// import { ProfileContext } from './Components/ProfileContext';

import GlobalStyles from './Components/GlobalStyles';
import NavBar from './Components/NavBar'
import Bookmarks from './Components/Bookmarks'
import HomeFeed from './Components/HomeFeed'
import Notifications from './Components/Notifications'
import Profile from './Components/Profile'
import TweetDetails from './Components/TweetDetails'
// import Button from './Components/Button';

import CircularProgress from '@material-ui/core/CircularProgress';

const initialProfile = {handle: null};

const App = () => {
  const [status, setStatus] = React.useState('idle');
  const [currentUser, setCurrentUser] = React.useState(initialProfile);
  
  // console.log(toString(currentUser));
  // console.log(currentUser);

  React.useEffect(() => {
    setStatus('loading');
    fetch('/api/treasurymog/profile')
      .then(res => res.json())
      // .then(data => console.log(data.success))
      .then(data => setCurrentUser(data))
      .then(setStatus('idle'))
      // .then(console.log('updated current user'))
  }, []);
  // console.log(toString(currentUser));

  return (
    <>
      <GlobalStyles/>
      <Router>
        <Wrapper>
          {status === 'loading' ? (
            <LeftWrapper>
              <CircularProgress />
            </LeftWrapper>
          ):(
            <NavBar />
          )}
          <ActiveDisplay>
            <Switch>
              <Route exact path='/'>
                  <HomeFeed
                  currentUser = {currentUser.profile}
                  status = {status}
                  setStatus = {setStatus}
                  />
              </Route>
              <Route exact path='/notifications'>
                <Notifications/>
              </Route>
              <Route exact path='/bookmarks'>
                <Bookmarks/>
              </Route>
              <Route exact path='/tweet/:tweetId'>
                <TweetDetails/>
              </Route>
              <Route exact path='/:profileId'>
                <Profile
                userViewed = {currentUser.profile}
                currentUser = {currentUser.profile}
                setCurrentUser = {setCurrentUser}
                />
              </Route>
            </Switch>
          </ActiveDisplay>
        </Wrapper>
      </Router>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  /* background-color: rgb(255,240,240); */
  width: 30%;
  height: 100vh;
`
const ActiveDisplay = styled.div`
  /* background-color: red; */
  width: 70%;
  height: 100vh;
`
export default App;






// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
