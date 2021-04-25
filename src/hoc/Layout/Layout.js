import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import classes from './Layout.module.scss';

const layout = (props) => {
  return <>
    <Navbar />
    <main className={classes.Content}>
      {props.children}
    </main>
  </>
}

export default layout;
