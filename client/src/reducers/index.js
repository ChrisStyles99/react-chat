const initialState = {
  isLoggedIn: window.document.cookie.includes('isLoggedIn=') || false,
  user: {
    chats: {}
  },
  loginError: null,
  registerError: null,
  chatMessages: [],
  newMessageError: null
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
    case 'NEW_MESSAGE_ERROR':
      return {
        ...state,
        newMessageError: action.payload
      }
    case 'NEW_MESSAGE':
      return {
        ...state,
        chatMessages: [...state.chatMessages, {id: action.payload.id, content: action.payload.content, createdAt: action.payload.createdAt, user: {id: state.user.id, name: state.user.name, username: state.user.username}}]
      }
    default: 
      return state
  }
};

export default reducer;