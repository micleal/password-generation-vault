import { cn } from '@/lib/utils'
import React from 'react'

type TypographyProps = {
  children?: React.ReactNode
  className?: string
}

export const Typography = {
  H1: ({ children, className }: TypographyProps) => {
    return (
      <h1
        className={cn(
          'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
          className
        )}
      >
        {children}
      </h1>
    )
  },
  H2: ({ children, className }: TypographyProps) => {
    return (
      <h2
        className={cn(
          'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
          className
        )}
      >
        {children}
      </h2>
    )
  },
  H3: ({ children, className }: TypographyProps) => {
    return (
      <h3
        className={cn(
          'scroll-m-20 text-2xl font-semibold tracking-tight',
          className
        )}
      >
        {children}
      </h3>
    )
  },
  H4: ({ children, className }: TypographyProps) => {
    return (
      <h4
        className={cn(
          'scroll-m-20 text-xl font-semibold tracking-tight',
          className
        )}
      >
        {children}
      </h4>
    )
  },
  H5: ({ children, className }: TypographyProps) => {
    return (
      <h5
        className={cn(
          'scroll-m-20 text-lg font-semibold tracking-tight',
          className
        )}
      >
        {children}
      </h5>
    )
  },
  H6: ({ children, className }: TypographyProps) => {
    return (
      <h6 className={cn('scroll-m-20 font-semibold tracking-tight', className)}>
        {children}
      </h6>
    )
  },
  P: ({ children, className }: TypographyProps) => {
    return (
      <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}>
        {children}
      </p>
    )
  },
  Blockquote: ({ children, className }: TypographyProps) => {
    return (
      <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)}>
        {children}
      </blockquote>
    )
  },
}
