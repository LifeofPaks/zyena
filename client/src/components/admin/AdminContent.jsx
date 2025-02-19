import React from 'react'
import NavBar from './NavBar'

const AdminContent = () => {
  return (
    <div className='w-full h-screen flex flex-col'>
      <NavBar />

      <div className='bg-gray-50 flex-grow'>
        content
      </div>
    </div>
  )
}

export default AdminContent
