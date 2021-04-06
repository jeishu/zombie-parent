import React, { createContext, useReducer, useContext } from "react";

const StoreContext = createContext({
  user: {},
  child: {},
  sleep: {},
  feeding: {},
  diaper: {},
  loading: false,
});
const { Provider } = StoreContext;

function reducer(state, action) {
  switch (action.type) {
    case "setUser":
      return {
        ...state,
        user: action.user,
        loading: false,
      };
    case "setChild":
      return {
        ...state,
        child: action.child,
        loading: false,
      };
    case "setSleep":
      return {
        ...state,
        sleep: action.sleep,
        loading: false,
      };
    case "setFeeding":
      return {
        ...state,
        feeding: action.feeding,
        loading: false,
      };
    case "setDiaper":
      return {
        ...state,
        diaper: action.diaper,
        loading: false,
      };
    case "loading":
      return {
        ...state,
        loading: true,
      };
    case "shutdown":
      return {
        user: {},
        child: {},
        sleep: {},
        feeding: {},
        diaper: {},
        loading: false,
      };
    default:
      return state;
  }
}

function StoreProvider({ value = [], ...props }) {
  const [state, dispatch] = useReducer(reducer, []);

  return <Provider value={[state, dispatch]} {...props} />;
}

function useStoreContext() {
  return useContext(StoreContext);
}

export { StoreProvider, useStoreContext };
