import React from 'react';
import { Route } from 'react-router';

export default (
  <Route>
    <Route path="/">
      <Route index />
      <Route path="channel/:id">
        <Route index></Route>
        <Route path="home" />
        <Route path="videos" />
        <Route path="live" />
        <Route path="community" />
        <Route path="playlists" />
      </Route>
      <Route path="profile">
        <Route index></Route>
        <Route path="info" />
        <Route path="videos" />
        <Route path="videos/addVideo" />
        <Route path="videos/editVideo/:id" />
        <Route path="playlists" />
        <Route path="playlists/addPlaylist" />
      </Route>
    </Route>

    <Route path={'/auth'}>
      <Route path="signin" />
      <Route path="signup" />
      <Route path="signout" />
      <Route path="verifymail" />
      <Route path="recover" />
    </Route>

    <Route path={'/video'}>
      <Route path={'watch'}>
        <Route path={':videoId'}>
          <Route path="playlist">
            <Route path={':playlistId'}></Route>
          </Route>
        </Route>
        <Route path="playlist">
          <Route path={':playlistId'}></Route>
        </Route>
      </Route>
      <Route path={'search'}>
        <Route index path={':name'} />
      </Route>
    </Route>

    <Route path={'/playlists'}>
      <Route index path={':id'} />
    </Route>

    <Route path={'/history'}>
      <Route index />
    </Route>
  </Route>
);
