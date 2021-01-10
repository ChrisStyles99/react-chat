const initialState = {
  isLoggedIn: window.document.cookie.includes('isLoggedIn=') || false,
  user: {
    chats: {}
  },
  loginError: null,
  registerError: null,
  chatMessages: []
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LOGIN_ERROR':
      return {
        ...state,
        loginError: action.payload
      }
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: action.payload
      }
    case 'REGISTER_ERROR':
      return {
        ...state,
        registerError: action.payload
      }
    case 'REGISTER':
      return {
        ...state,
        registerError: action.payload
      }
    case 'LOGOUT': 
      return {
        ...state,
        isLoggedIn: false,
        user: {},
        chatMessages: []
      }
    case 'GET_USER_CHATS':
      return {
        ...state,
        user: action.payload
      }
    case 'GET_CHAT_MESSAGES':
      return {
        ...state,
        chatMessages: action.payload
      }
    default: 
      return state
  }
};

export default reducer;