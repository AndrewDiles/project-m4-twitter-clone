import React, { useReducer, useState} from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {format} from 'date-fns';

import { StateContext } from './Components/StateContext';

import GlobalStyles from './Components/GlobalStyles';
import NavBar from './Components/NavBar'
import Bookmarks from './Components/Bookmarks'
import HomeFeed from './Components/HomeFeed'
import Notifications from './Components/Notifications'
import Profile from './Components/Profile'
import TweetDetails from './Components/TweetDetails'


const App = () => {
  // const setActivePage = React.useContext(StateContext);
  //   console.log(setActivePage);
  //   setActivePage('home');

    const [activePage, setActivePage] = useState('Home');
    const setNotifications = () => {
      setActivePage('Notifications');
      console.log('set to nots');
    }
  return (
    <>
      <GlobalStyles/>
      <Router>
        <Wrapper>
          <NavBar />
          <ActiveDisplay>
            <Switch>
              <Route exact path='/'>
                <HomeFeed/>
              </Route>
              <Route exact path='/notifications'>
                <Notifications
                // onClick = {setNotifications}
                />
              </Route>
              <Route exact path='/bookmarks'>
                <Bookmarks/>
              </Route>
              <Route exact path='/tweet/:tweetId'>
                <TweetDetails/>
              </Route>
              <Route exact path='/:profileId'>
                <Profile/>
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
