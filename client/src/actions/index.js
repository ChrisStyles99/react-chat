import axios from 'axios';
axios.defaults.withCredentials = true;

const baseURL = 'http://localhost:3001/api'

export const login = user => {
  return async(dispatch) => {
    const res = await axios.post(`${baseURL}/users/login`, user);

    if(res.data.error === true) {
      return dispatch({
        type: 'LOGIN_ERROR',
        payload: res.data.msg
      });
    }

    dispatch({
      type: 'LOGIN',
      payload: true
    });

    dispatch({
      type: 'LOGIN_ERROR',
      payload: null
    });
  }
}

export const register = user => {
  return async(dispatch) => {
    const res = await axios.post(`${baseURL}/users/register`, user);

    if(res.data.error === true) {
      return dispatch({
        type: 'REGISTER_ERROR',
        payload: res.data.msg
      });
    }

    dispatch({
      type: 'REGISTER',
      payload: null
    });
  }
}

export const logout = async(dispatch) => {
  await axios.delete(`${baseURL}/users/logout`);

  dispatch({
    type: 'LOGOUT'
  });
}

export const getUserChats = async(dispatch) => {
  const res = await axios.get(`${baseURL}/chats/user-chats`);

  dispatch({
    type: 'GET_USER_CHATS',
    payload: res.data
  });
}

export const getChatMessages = id => {
  return async(dispatch) => {
    const res = await axios.get(`${baseURL}/chats/chat-messages/${id}`);

    dispatch({
      type: 'GET_CHAT_MESSAGES',
      payload: res.data
    });
  }
}

export const createMessage = (content, id) => {
  return async(dispatch) => {
    const res = await axios.post(`${baseURL}/chats/new-message/${id}`, {content});

    if(res.data.error === true) {
      return dispatch({
        type: 'NEW_MESSAGE_ERROR',
        payload: res.data.msg
      });
    }

    dispatch({
      type: 'NEW_MESSAGE',
      payload: res.data.newMessage
    });

    return res.data.newMessage;
  }
}

export const friendMessage = ({id, content, createdAt, user}) => {
  return dispatch => {
    dispatch({
      type: 'NEW_FRIEND_MESSAGE',
      payload: {id, content, createdAt, user}
    })
  }
}