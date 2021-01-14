import React from 'react'
import moment from 'moment';

export const Message = ({name, message, currentUser, createdAt}) => {

  const formattedDate = moment(createdAt).calendar();

  return (
    <div className={name === currentUser ? 'message m-2 w-4/4 p-2 flex flex-col items-end text-right' : 'message m-2 w-4/4 p-2 flex flex-col'}>
      <p className="px-2"><strong>{name}</strong></p>
      <p className={name === currentUser ? 'rounded bg-blue-700 p-2 text-white w-2/4 break-all' : 'rounded bg-white p-2 w-2/4 break-all'}>{message}</p>
      <small className="text-gray-500">{formattedDate}</small>
    </div>
  )
}
