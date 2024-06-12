import React from 'react'

const MainTitleIndex = ({text, size, children }) => {
  const sizeVarient = {
    small : 'text-title-small',
    medium : 'text-title-medium',
    large : 'text-title-large'
  }

  return (
    <div className='relative flex flex-col w-full gap-4'>
      <span className={`${sizeVarient[size]}`}>{text}</span>
      {children}
    </div>
  )
}

export default MainTitleIndex
