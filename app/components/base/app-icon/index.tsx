'use client'

import { type FC } from 'react'
import classNames from 'classnames'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export type AppIconProps = {
  size?: 'xs' | 'tiny' | 'small' | 'medium' | 'large'
  rounded?: boolean
  icon?: string
  background?: string
  className?: string
}

const sizeMap = {
  xs: 'h-3 w-3 text-xs',
  tiny: 'h-6 w-6 text-sm',
  small: 'h-8 w-8',
  medium: 'h-9 w-9 text-lg',
  large: 'h-10 w-10'
}

const AppIcon: FC<AppIconProps> = ({
  size = 'medium',
  rounded = true,
  background = 'rgb(204, 251, 241)',
  className,
}) => {
  return (
    <Avatar
      className={classNames(
        sizeMap[size],
        className
      )}
      style={{ background }}
    >
      <AvatarFallback>🤖</AvatarFallback>
    </Avatar>
  )
}

export default AppIcon
