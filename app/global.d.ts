declare module 'dify-client';
declare module 'uuid';

// JSX型定義の追加
import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// chatコンポーネントで使用する型の拡張
import { ChatItem } from '@/types/app';

interface IAnswerProps {
  item: ChatItem;
  feedbackDisabled: boolean;
  onFeedback?: any;
  isResponding?: boolean;
}

interface IChatItem {
  id: string;
  content: string;
  useCurrentUserAvatar?: boolean;
  imgSrcs?: string[];
}
