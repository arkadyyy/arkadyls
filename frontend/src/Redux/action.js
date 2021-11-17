export const getAllUsers = (data) => {
  return {
    type: "GET_ALL_USERS",
    payload: data,
  };
};
export const languageChange = (data) => {
  return {
    type: "LANGUAGE_CHANGE",
    payload: data,
  };
};
