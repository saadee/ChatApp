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
