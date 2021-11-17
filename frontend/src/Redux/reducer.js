const initalState = {
  users: [],
};

export const reducer = (state = initalState, action) => {
  switch (action.type) {
    case "GET_ALL_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "LANGUAGE_CHANGE":
      return {
        ...state,
        dir: action.payload,
      };

    default:
      return state;
  }
};
