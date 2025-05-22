import type { FC } from 'react'
import React from 'react'
import {
  Bars3Icon,
  PencilSquareIcon,
} from '@heroicons/react/24/solid'
import { useStudent } from '@/app/context/student-context'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

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
  const { isRegistered, clearStudentInfo } = useStudent()

  return (
    <div className="shrink-0 flex items-center justify-between h-12 px-3 bg-muted/50">
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
        <Avatar className="h-8 w-8 bg-primary/10">
          <AvatarFallback>🤖</AvatarFallback>
        </Avatar>
        <div className="text-sm font-bold">{title}</div>
      </div>
      <div className='flex items-center'>
        {isMobile && (
          <div className='flex items-center justify-center h-8 w-8 cursor-pointer'
            onClick={() => onCreateNewChat?.()}
          >
            <PencilSquareIcon className="h-4 w-4 text-gray-500" />
          </div>
        )}
      </div>
      {isRegistered && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearStudentInfo}
          className="ml-4"
        >
          ログアウト
        </Button>
      )}
    </div>
  )
}

export default React.memo(Header)
