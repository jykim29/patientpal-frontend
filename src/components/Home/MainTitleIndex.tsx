import React from 'react'

const MainTitleIndex = ({text, children }) => {
  return (
    <div className='relative flex flex-col w-full gap-4'>
      <span className='text-title-medium'>{text}</span>
      {children}
    </div>
  )
}

export default MainTitleIndex
