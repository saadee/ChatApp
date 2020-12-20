const initialState = {
  roomId: "",
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

    default:
      return state;
  }
}
