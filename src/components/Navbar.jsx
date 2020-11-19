import React, { useContext } from 'react';
import { ThemeContext } from '../theme';
import { makeStyles } from '@material-ui/core';
import { Search } from './Search';

const Navbar = () => {
  const themePalette = useContext(ThemeContext);
  const { root } = makeStyles({
    root: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '56px',
      backgroundColor: themePalette.navBackground,
    },
  })();
  return (
    <div className={root}>
      <Search />
    </div>
  );
};

export { Navbar };
