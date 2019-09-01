export default function reducer(state: any, action) : any {  
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