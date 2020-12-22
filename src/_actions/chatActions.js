export const ChangeChat = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "CHNAGE_ROOM",
      payload: id,
    });
  } catch (error) {
    if (error)
      dispatch({
        type: "ERROR",
      });
  }
};
export const setUser = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "SET_USER",
      payload: data,
    });
  } catch (error) {
    if (error)
      dispatch({
        type: "ERROR",
      });
  }
};
export const logOut = () => async (dispatch) => {
  try {
    
    dispatch({
      type: "SIGN_OUT",
    });
  } catch (error) {
    if (error)
      dispatch({
        type: "ERROR",
      });
  }
};
