import React from 'react';
import classes from './Navbar.module.scss';
import Logo from '../Logo/Logo';

const navbar = () => (
  <nav className={classes.Navbar}>
    <Logo />
  </nav>
);

export default navbar;
