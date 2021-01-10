import React from 'react'

export const Message = ({name, message, currentUser}) => {
  return (
    <div className={name === currentUser ? 'message m-2 w-4/4 p-2 flex flex-col items-end text-right' : 'message m-2 w-4/4 p-2 flex flex-col'}>
      <p className={name === 'ChatBot' ? 'px-2 text-blue-700' : 'px-2'}><strong>{name ? name : 'Anon'}</strong></p>
      <p className={name === currentUser ? 'rounded bg-blue-700 p-2 text-white w-2/4 break-all' : 'rounded bg-white p-2 w-2/4 break-all'}>{message}</p>
    </div>
  )
}
