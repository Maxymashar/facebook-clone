import React, { useContext, useRef, useState, useEffect } from 'react';
import { ThemeContext } from '../theme';
import { makeStyles } from '@material-ui/core';
import { Search as SearchIcon, ArrowBack } from '@material-ui/icons';
import { Transition } from 'react-transition-group';
import clsx from 'clsx';
import fbLogo from '../assets/images/fb-logo.png';

const Icon = ({
  Image,
  cWidth,
  cHeight,
  iWidth,
  iHeight,
  iconProps,
  src,
  ...props
}) => {
  const { root, icon } = makeStyles({
    root: {
      width: cWidth,
      height: cHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      width: iWidth,
      height: iHeight,
      objectFit: 'cover',
    },
  })();

  return (
    <div className={root} {...props}>
      {Image && <Image className={icon} {...iconProps} />}
      {src && <img src={src} alt='' className={icon} />}
    </div>
  );
};

const Search = () => {
  const theme = useContext(ThemeContext);
  const [hasFocus, setHasFocus] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const element = inputRef.current;
    const focusListener = element.addEventListener('focus', () => {
      setHasFocus(true);
    });
    const blurListener = element.addEventListener('blur', () => {
      setHasFocus(false);
    });

    return () => {
      element.removeEventListener('focus', focusListener);
      element.removeEventListener('blur', blurListener);
    };
  });

  const {
    root,
    iconHolder,
    input,
    icon,
    logoIcon,
    arrowIcon,
    dropdown,
  } = makeStyles({
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      height: '100%',
      position: 'relative',
      zIndex: 100,
      // backgroundColor: 'red',
    },
    iconHolder: {
      width: 50,
      height: 50,
      position: 'relative',
    },
    input: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: '0.5rem',
      borderRadius: '50px',
      marginLeft: '4px',
      '& input': {
        fontSize: '16px',
        border: 'none',
        outline: 'none',
        marginLeft: '4px',
      },
    },
    icon: {
      position: 'absolute',
    },
    logoIcon: {
      top: 0,
      left: 0,
      '& svg': {
        borderRadius: '50%',
      },
    },
    arrowIcon: {
      top: 12.5,
      left: 12.5,
      color: '#fff',
    },
    dropdown: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 'calc(100% + 16px)',
      height: 400,
      backgroundColor: theme.navBackground,
      boxShadow: `2px 2px 4px ${theme.navBackground}, -2px -2px 4px ${theme.navBackground}`,
      zIndex: -10,
    },
  })();

  const logoTransitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1, transition: 'opacity 500ms ease' },
    exiting: {},
    exited: {
      opacity: 0,
      transition: 'opacity 500ms ease',
    },
  };

  const arrowTransitionStyles = {
    entering: { transform: 'translateX(10px)' },
    entered: {
      transform: 'translateX(0px)',
      transition: 'transform 500ms ease',
    },
    exiting: {},
    exited: {},
  };

  /**
   * TODO:
   * - The animation does not work as well as the facebook animation
   * - Animate the 🔍 icon as facebook does it
   */

  const searchIconTransitionStyles = {
    entering: { transform: 'translateX(-28px)' },
    entered: {
      transform: 'translateX(0px)',
      transition: 'transform 500ms ease',
    },
    exiting: {},
    exited: {
      transform: 'translateX(-28px)',
      transition: 'transform 500ms ease',
    },
  };

  return (
    <div className={root}>
      {hasFocus && <div className={dropdown}></div>}
      <div className={iconHolder}>
        <Transition in={!hasFocus} timeout={0} unmountOnExit>
          {(state) => (
            <Icon
              src={fbLogo}
              cWidth={50}
              cHeight={50}
              iWidth={50}
              iHeight={50}
              style={{
                ...logoTransitionStyles[state],
              }}
              className={clsx(icon, logoIcon)}
            />
          )}
        </Transition>
        <Transition in={hasFocus} timeout={0} unmountOnExit>
          {(state) => (
            <Icon
              Image={ArrowBack}
              cWidth={35}
              cHeight={35}
              iWidth={25}
              iHeight={25}
              style={{ ...arrowTransitionStyles[state] }}
              className={clsx(icon, arrowIcon)}
            />
          )}
        </Transition>
      </div>
      <div className={input}>
        <Transition in={!hasFocus} timeout={0}>
          {(state) => (
            <>
              <SearchIcon />
              <input
                type='text'
                placeholder='Search Facebook'
                ref={inputRef}
                style={{ ...searchIconTransitionStyles[state] }}
              />
            </>
          )}
        </Transition>
      </div>
    </div>
  );
};

export { Search };

/**
 * TODO :
 * - Change the facebook logo to an svg with a blue and white color
 * - Look for a way to animate the Search icon well
 * - Stop the animation from happening every time the input has focus eg When you leave the tab then come back
 * - Start working on drop down items
 * - Rename the transition-style-names and add more comments
 * - Make the width of the <input/> to animate just like facebook's
 */
