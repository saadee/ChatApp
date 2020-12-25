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
      localStorage.setItem('user', payload.user)
      // console.log(payload.user.photoURL,'----------------------------------');
      return {
        ...state,
        user: payload.user,
      };
    case "SIGN_OUT":
      // console.log(payload);
      localStorage.removeItem('user')
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}
