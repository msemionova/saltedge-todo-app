import React from 'react';
import saltedgeLogo from '../../assets/images/logo.svg';
import classes from './Logo.module.css';

const logo = () => (
  <div className={classes.Logo} data-testid='saltedge-logo'>
    <img src={saltedgeLogo} alt='SaltEdge Logo'/>
  </div>
);

export default logo;
