import 'react'
import { Link } from 'react-router-dom'
/* import { Link } from 'react-router-dom' */

export default function leftbar(user) {
  return (
    <div className='  left-0 z-40 w-80 h-full transition-transform -translate-x-full sm:translate-x-0 px-3 bg-white'>     
       <div>
        <div>
          <Link to='/profile/:id'>
              <div className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                <img className="w-8 rounded-full " src={user.profilImage || "avatar.png"}/>
                <h4 className='space-x-2 p-2 font-bold'>{user.name}</h4>
              </div>
          </Link>
          <Link to='/'>
              <div className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                <img className="w-8  rounded-full" src='/src/assets/icons/1.png'/>
                <h4 className='space-x-2 p-2 font-bold'>Friend</h4>
              </div>
          </Link>
          <Link to='/'>
              <div className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                <img className="w-8  rounded-full" src='/src/assets/icons/2.png'/>
                <h4 className='space-x-2 p-2  font-bold'>Groups</h4>
              </div>
          </Link>
        </div>
      </div> 
    </div>
  )
}
