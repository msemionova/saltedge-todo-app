import React from 'react';
import classes from './Navbar.module.scss';
import Logo from '../Logo/Logo';

const navbar = () => (
  <nav className={classes.Navbar} data-testid='navbar'>
    <Logo />
  </nav>
);

export default navbar;
