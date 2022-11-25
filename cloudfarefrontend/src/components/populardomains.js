import React, { useEffect, useState } from 'react';
import { Link } from '@reach/router';
import logo from '../logo.svg';

const PopularDomainsData = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const resp = await fetch('https://worker-typescript-template.nishant-2010rai.workers.dev/popular-domains');
      const postsResp = await resp.json();
      setPosts(postsResp.rankingEntries);
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
                See the Popular Domains Data
                </h1>
                <tbody>
                  <tr>
                    <th>Rank</th>
                    <th>Rank Change</th>
                    <th>Domain</th>
                    <th>Category</th>
                  </tr>
                  {posts.map((item, index) => (
                    <tr key={index}>
                      <td>{item.rank}</td>
                      <td>{item.rankChange}</td>
                      <td>{item.domain}</td>
                      <td>{item.category}</td>
                    </tr>
                  ))}
                </tbody>
            </header>
        </div>
    </div>
  );
  
};

export default PopularDomainsData;