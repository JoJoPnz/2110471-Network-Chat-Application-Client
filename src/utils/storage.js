const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

const setAccessToken = (access_token) => {
  localStorage.setItem("access_token", access_token);
};

const clearAccessToken = () => {
  localStorage.removeItem("access_token");
};

export const storage = {
  getAccessToken,
  setAccessToken,
  clearAccessToken,
};
