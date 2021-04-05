import React, { createContext, useReducer, useContext } from "react";

const UserContext = createContext({
  user: {},
  child: {},
  sleep: {},
  feeding: {},
  diaper: {},
});
const { Provider } = UserContext;

async function reducer(state, action) {
  switch (action.type) {
    case "setUser":
      let result = await [...state, { user: action.user }];
      return result;
    case "setChild":
      return [
        ...state,
        {
          child: action.child,
        },
      ];
    case "setSleep":
      return [
        ...state,
        {
          sleep: action.sleep,
        },
      ];
    case "setFeeding":
      return [
        ...state,
        {
          feeding: action.feeding,
        },
      ];
    case "setDiaper":
      return [
        ...state,
        {
          diaper: action.diaper,
        },
      ];
    default:
      return state;
  }
}

function UserProvider({ value = [], ...props }) {
  const [state, dispatch] = useReducer(reducer, []);

  return <Provider value={[state, dispatch]} {...props} />;
}

function useUserContext() {
  return useContext(UserContext);
}

export { UserProvider, useUserContext };
