import React, { useState } from 'react';

export const Context = React.createContext(null);


export const Provider = ({ children }) => {
  // HomeFeed
  const initialFeed = {};
  const [feed, setFeed] = React.useState(initialFeed);
  const initialTweetedIds = [];
  const [tweetedIds, setTweetedIds] = React.useState(initialTweetedIds);

  return (
    <Context.Provider
      value={{
        feed,
        setFeed,
        tweetedIds,
        setTweetedIds,
      }}
    >
      {children}
    </Context.Provider>
  );
}




// function reducer(profile, action) {
//   switch (action.type) {
//     case 'receive-profile-info-from-server': {
//       return {
//         ...profile,
//         hasLoaded: true,
//         handle: action.handle,
//         displayName: action.displayName,


      //     "handle": "treasurymog",
      // "displayName": "Gladstone, Esq.",
      // "avatarSrc": "/assets/treasurymog-avatar.jpg",
      // "bannerSrc": "/assets/treasurymog-banner.jpeg",
      // "location": "Whitehall, London",
      // "joined": "2016-10-12T12:00",
      // "bio": "I live and work at the Treasury as a mouser but I also have a paw in the finances. Here to help lighten up the political world. Unofficial.",
      // "numFollowing": 2,
      // "numFollowers": 2,
      // "numLikes": 1,
      // "isFollowingYou": false,
      // "isBeingFollowedByYou": false


//       };
//     }
//     default:
//       throw new Error(`Unrecognized action: ${action.type}`);
//   }
// }

// export const Provider = ({ children }) => {
//   const [profile, dispatch] = React.useReducer(reducer, initialProfile);

//   const receiveProfileInfoFromServer = React.useCallback(
//     data =>
//       dispatch({
//         type: 'receive-profile-info-from-server',
//         ...data,
//       }),
//     [dispatch]
//   );

//   return (
//     <Context.Provider
//     value={{
//       profile,
//       actions: {
//         receiveProfileInfoFromServer,
//       },
//     }}
//     >
//       {children}
//     </Context.Provider>
//   )
// }