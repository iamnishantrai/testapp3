import React, { useEffect, useState } from 'react';
import { Link } from '@reach/router';
import logo from '../logo.svg';

const PopularDomainsData = () => {
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
            </header>
        </div>
    </div>
  );
  
};

export default PopularDomainsData;