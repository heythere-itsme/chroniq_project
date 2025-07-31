import React from 'react'
import FriendRow from './FriendRow'

const Request = ({data: Friends} : {data: FriendInfo[]}) => {
  return (
    <div>
        {Friends.map((f, key) => (
          <FriendRow
          key={key}
          url={f.avatar_url}
          name={f.name}
          lastMsg="This is supposed to be the last msg here"
          time="16:30"
        />
        ))}
    </div>
  )
}

export default Request