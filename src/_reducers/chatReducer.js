const initialState = {
  roomId: "",
  user: null,
};
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "CHNAGE_ROOM":
      // console.log(payload);
      return {
        ...state,
        roomId: payload,
      };
    case "SET_USER":
      // console.log(payload);
      return {
        ...state,
        user: payload,
      };
    case "SIGN_OUT":
      // console.log(payload);
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}
