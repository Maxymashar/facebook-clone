import { createContext } from 'react';
import { useSelector } from 'react-redux';

const ThemeContext = createContext();

const darkThemePalette = {
  mainBackground: '#18191A',
  navBackground: '#242526',
};

const lightThemePalette = {
  mainBackground: '#f2f2f2',
};

const ThemeProvider = ({ children }) => {
  const theme = useSelector((store) => store.theme);
  const palette = theme ? { ...darkThemePalette } : { ...lightThemePalette };
  return (
    <ThemeContext.Provider value={palette}>{children}</ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
