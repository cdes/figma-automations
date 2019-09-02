import * as React from "react";

interface IContext {
  store: object;
  dispatch: Function;
}

export const Context = React.createContext(<IContext>{});

export function reducer(state: any, action) : any {  
  switch (action.type) {
    case "random-number": {
      const oldState = state[action.id] || {};
      return {
        ...state,
        [action.id]: {
          ...oldState,
          ...action.state,
        }
      };
    }
    default: {
      return state;
    }
  }
}