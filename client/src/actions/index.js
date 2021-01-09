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