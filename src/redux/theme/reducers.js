import { changeTheme } from './actions';
// state for isDarkTheme
const initialState = true;

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case changeTheme().type:
      return !state;
    default:
      return state;
  }
};

export { themeReducer };
