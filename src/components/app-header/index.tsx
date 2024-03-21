import React from 'react'
import { Typography } from '../Typography'

export function AppHeader() {
  return (
    <header className='flex titlebar py-2 sticky'>
      <div className='flex-0'></div>
      <div className='flex-1 flex h-8 justify-center'>
        <Typography.H6 className='text-center text-primary'>
          Password Generator By Callica
        </Typography.H6>
      </div>
      <div className='flex-0'></div>
    </header>
  )
}
