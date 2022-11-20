import React, { useEffect, useState } from 'react';
import { Link } from '@reach/router';
import logo from '../logo.svg';

const AttackLayerData = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const resp = await fetch('https://worker-typescript-template.nishant-2010rai.workers.dev/attack-layer3');
      const postsResp = await resp.json();
      setPosts(postsResp);
    };

    getPosts();
  }, []);

  return (
    <div>
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                Welcome to Amogha Bhardwaj's cloudfare internship project.
                </p>
                <h1>
                See the Attack Layer Data
                </h1>
                <pre>{ JSON.stringify(posts, null, 2) }</pre>
            </header>
        </div>
    </div>
  );
  
};

export default AttackLayerData;