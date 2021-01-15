const initialState = {
  isLoggedIn: window.document.cookie.includes('isLoggedIn=') || false,
  user: {
    chats: {}
  },
  profiles: [],
  loginError: null,
  registerError: null,
  chatInfo: {},
  chatMessages: [],
  newMessageError: null,
  getChatInfoError: null,
  changeNameError: null,
  getProfilesError: null
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
    case 'GET_CHAT_ERROR':
      return {
        ...state,
        getChatInfoError: action.payload
      }
    case 'GET_CHAT_INFO':
      return {
        ...state,
        chatInfo: action.payload
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
    case 'NEW_FRIEND_MESSAGE':
      return {
        ...state,
        chatMessages: [...state.chatMessages, {id: action.payload.id, content: action.payload.content, createdAt: action.payload.createdAt, user: {id: action.payload.user.id, name: action.payload.user.name, username: action.payload.user.username}}]
      }
    case 'CHANGE_NAME_ERROR':
      return {
        ...state,
        changeNameError: action.payload
      }
    case 'CHANGE_NAME':
      return {
        ...state,
        chatInfo: {...state.chatInfo, name: action.payload}
      }
    case 'GET_PROFILES_ERROR':
      return {
        ...state,
        getProfilesError: action.payload
      }
    case 'GET_PROFILES':
      return {
        ...state,
        profiles: action.payload
      }
    default: 
      return state
  }
};

export default reducer;