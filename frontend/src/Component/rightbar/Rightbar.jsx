import  'react'
/* import Message from '../message/Message' */
import FriendReq from '../friendReq/FriendReq'

export default function rightbar() {
  return (
    <div className='right-3 top-3 z-30 w-80 h-100vh transition-transform -translate-x-full sm:translate-x-0 px-8 overfolw-auto sticky '>
      <div className=''>
        {/* <Message/> */}
        <FriendReq/>
      </div>
    </div>
  )
}
