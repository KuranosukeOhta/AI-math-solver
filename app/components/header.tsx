import type { FC } from 'react'
import React from 'react'
import {
  Bars3Icon,
  PencilSquareIcon,
} from '@heroicons/react/24/solid'
import AppIcon from '@/app/components/base/app-icon'
import { useSession } from 'next-auth/react'

export type IHeaderProps = {
  title: string
  isMobile?: boolean
  onShowSideBar?: () => void
  onCreateNewChat?: () => void
}

const Header: FC<IHeaderProps> = ({
  title,
  isMobile,
  onShowSideBar,
  onCreateNewChat,
}) => {
  const { data: session } = useSession()

  // 残り時間を計算
  const getRemainingTime = () => {
    const subscriptionEnd = session?.user?.subscriptionEnd
      ? new Date(session.user.subscriptionEnd as string)
      : null

    const isSubscriptionActive = subscriptionEnd && subscriptionEnd > new Date()

    if (!subscriptionEnd || !isSubscriptionActive) return null

    const now = new Date()
    const diffMs = subscriptionEnd.getTime() - now.getTime()

    // 5分未満の場合は分と秒で表示
    if (diffMs < 5 * 60 * 1000) {
      const diffMins = Math.floor(diffMs / (1000 * 60))
      const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000)
      return `${diffMins}分${diffSecs}秒`
    }

    // それ以外は時間と分で表示
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    return `${diffHrs}時間${diffMins}分`
  }

  const remainingTime = getRemainingTime()

  return (
    <div className="shrink-0 flex items-center justify-between h-12 px-3 bg-gray-100">
      {isMobile
        ? (
          <div
            className='flex items-center justify-center h-8 w-8 cursor-pointer'
            onClick={() => onShowSideBar?.()}
          >
            <Bars3Icon className="h-4 w-4 text-gray-500" />
          </div>
        )
        : <div></div>}
      <div className='flex items-center space-x-2'>
        <AppIcon size="small" />
        <div className=" text-sm text-gray-800 font-bold">{title}</div>
      </div>
      <div className='flex items-center'>
        {remainingTime && (
          <div className="mr-3 text-xs text-gray-600">
            残り時間: <span className="font-medium text-primary-600">{remainingTime}</span>
          </div>
        )}
        {isMobile && (
          <div className='flex items-center justify-center h-8 w-8 cursor-pointer'
            onClick={() => onCreateNewChat?.()}
          >
            <PencilSquareIcon className="h-4 w-4 text-gray-500" />
          </div>
        )}
      </div>
    </div>
  )
}

export default React.memo(Header)
