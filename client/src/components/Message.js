import React from 'react'

export const Message = ({name, message, username}) => {
  return (
    <div className={username === name ? ' message m-2 w-3/4 p-2 rounded bg-gray-200' : 'message bg-white m-2 w-3/4 p-2 rounded'}>
      <p><strong>{name ? name : 'Anon'}:</strong> {message}</p>
    </div>
  )
}
