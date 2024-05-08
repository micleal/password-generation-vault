import React from 'react'
import { Typography } from '../Typography'
import { APP_NAME } from '@/utils/constants'

export function AppHeader() {
  return (
    <header className='flex titlebar py-2 sticky'>
      <div className='flex-0'></div>
      <div className='flex-1 flex h-8 justify-center'>
        <Typography.H6 className='text-center text-primary'>
          {APP_NAME}
        </Typography.H6>
      </div>
      <div className='flex-0'></div>
    </header>
  )
}
