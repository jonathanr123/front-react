export function setAuthAction(auth) {
  console.log("setAuthAction ===>", auth);
  return (dispatch) => {
    dispatch(setAuthUser(auth));
  };
}

export const setAuthUser = (auth) => ({
  type: "SET_AUTH_USER",
  payload: { user: auth.user, token: auth.access_token },
});
