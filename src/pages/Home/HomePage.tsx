import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

import { VideosListContainer } from '../../components/Videos/VideosListContainer';
import { WatchVideo } from '../../components/Videos/WatchVideo';

const HomePage = () => {
 
  return (
    <>
      <h1>this is Home page</h1>
      <WatchVideo></WatchVideo>
    </>
  );
};
export default HomePage;
