export default(state = [], action) => {
  console.log("airports payload",action.payload)
  switch (action.type) {
    case 'GET_AIRPORTS_FULFILLED':
      return [...action.payload.data]
    default:
      return state;
  }
}
